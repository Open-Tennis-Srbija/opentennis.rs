<?php

namespace App\Http\Controllers;

use App\Http\Controllers\TenisMatchController;
use App\Http\Requests\StorePlayerRequest;
use App\Http\Requests\UpdatePlayerRequest;
use App\Models\Court;
use App\Models\League;
use App\Models\Player;
use App\Models\TenisMatch;
use App\Models\TennisMatch;
use DateTime;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PlayerChartData;
use Illuminate\Support\Facades\Storage;

class PlayerController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		//
	}


	public static function getPlayers(){
		return Player::withCount([
			'wins','losses'])
			->select('id', 'first_name', 'last_name','category','uri', 'location','rank','points')
			->withCount([
			'wins','losses'])
			->get()
			->map(function ($player) {
				return [
					'uri' => $player->uri,
					'name' => $player->first_name . ' ' . $player->last_name,
					'location' => $player->location,
					'total_games' => $player->getTotalGames(),
					'wins' => $player->wins_count,
					'category' => $player->category,
					'loses' => $player->losses_count,
					'total_matches' => $player->wins_count + $player->losses_count,
					'win_precentage' => $player->wins_count + $player->losses_count == 0 ? 0 : round($player->wins_count / ($player->wins_count + $player->losses_count) * 100),
				];
			})
			->sortByDesc('total_games')
			->values();

	}

	/**
	 * Players list one page at a time, sorted in the database
	 */
	public function getPlayersApi(Request $request)
	{
		$perPage = min((int) $request->get('per_page', 100), 500);
		$sortBy = $request->get('sort_by', 'total_matches');
		$sortDir = $request->get('sort_dir', 'desc') === 'asc' ? 'asc' : 'desc';

		$allowedSorts = ['total_matches', 'name', 'category', 'wins', 'loses', 'win_precentage'];
		if (!in_array($sortBy, $allowedSorts)) {
			$sortBy = 'total_matches';
		}

		$counts = Player::select('id', 'first_name', 'last_name', 'category', 'uri', 'location')
			->withCount(['wins', 'losses']);

		// Wrapped so the totals below can be sorted on
		$query = DB::query()->fromSub($counts, 'p')->select(
			'p.*',
			DB::raw('wins_count + losses_count as total_matches'),
			DB::raw('case when wins_count + losses_count = 0 then 0 else round(wins_count * 100 / (wins_count + losses_count)) end as win_precentage'),
			DB::raw("case when category regexp '^[0-9]+$' then cast(category as unsigned) else 0 end as category_number")
		);

		$columns = [
			'total_matches' => ['total_matches'],
			'name' => ['first_name', 'last_name'],
			'category' => ['category_number'],
			'wins' => ['wins_count'],
			'loses' => ['losses_count'],
			'win_precentage' => ['win_precentage'],
		];

		foreach ($columns[$sortBy] as $column) {
			$query->orderBy($column, $sortDir);
		}

		// Same tie-breakers the list used when it sorted in the browser
		if ($sortBy !== 'total_matches') $query->orderByDesc('total_matches');
		if ($sortBy !== 'wins') $query->orderByDesc('wins_count');
		if ($sortBy !== 'name') $query->orderBy('first_name')->orderBy('last_name');
		$query->orderBy('id');

		return $query->paginate($perPage)->through(function ($player) {
			return [
				'uri' => $player->uri,
				'name' => $player->first_name . ' ' . $player->last_name,
				'location' => $player->location,
				'category' => $player->category,
				'wins' => $player->wins_count,
				'loses' => $player->losses_count,
				'total_matches' => $player->total_matches,
				'win_precentage' => (int) $player->win_precentage,
			];
		});
	}

	public static function getPlayersOnDate($date)
	{
		$raw_players = Player::all();
		$players = [];

		foreach ($raw_players as $player) {
			// Get the earliest match for this player using the pivot table
			$matchId = DB::table('match_players')
				->where('player_id', $player->id)
				->orderBy('tennis_match_id')
				->pluck('tennis_match_id')
				->first();

			if ($matchId) {
				$match = TennisMatch::find($matchId);
				if ($match) {
					$checkDate = (new DateTime($match->date))->format('Y-m-d');
					if (strtotime($checkDate) <= strtotime($date)) {
						$players[] = [
							'uri' => $player->uri,
							'check' => $match,
							'stats' => $player->getStatsOnDate($date),
						];
					}
				}
			}
		}

		usort($players, function ($a, $b) {
			return $b['stats']['elo'] <=> $a['stats']['elo'];
		});

		return $players;
	}

	public static function getPlayersForDropdown(){
		$raw_players = Player::all()->sortBy('first_name');

		$players = [];
		foreach($raw_players as $player){
			array_push($players, [
				'id' => $player->id,
				'name' => $player->first_name . ' ' . $player->last_name,
			]);
		}

		return $players;
	}

	public static function getPlayerData($uri){
		$player = Player::where('uri', $uri)->first();

		$players = PlayerController::getPlayers();
		$position = 0;

		[$wins,$loses] = $player->getMatches();

		foreach($players as $key => $value){
			if($value['uri'] == $uri){
				$position = $key + 1;
			}
		}

		return [
			'id' => $player->id,
			'name' => $player->first_name . ' ' . $player->last_name,
			'stats' => $player->getStats(),
			'club' => $player->club,
			'position' => $position,
			'category' => $player->category,
			'wins' => $wins,
			'matchups' => $player->getMatchups(),
			'loses' => $loses,
			'location' => $player->location,
		];
	}
	public function deletePlayer(){
		$data = request()->validate([
			'id' => ['required'],
		]);

		$player = Player::find($data['id']);

		$player->delete();

		return redirect('/');
	}
	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StorePlayerRequest $request)
	{
		//
	}

	public function getPlayer($uri){
		return Inertia::render('Auth/admin/players/EditPlayer', [
			'uri' => $uri,
		]);

	}
	public function getPlayerForEdit($uri){
		return Player::where('uri', $uri)->first();
	}

	public function getChart(Request $request){

		$player = Player::find($request->id);

		return  PlayerChartData::get_cached_charts($player->uri);
	}


	public function updatePlayer(Request $request){
		$data = $request->validate([
			'id' => ['required'],
			'first_name' => ['required', 'max:30'],
			'last_name' => ['required', 'max:30'],
			'club' => ['max:30'],
			'location' => ['max:30'],
			'category' => ['required', 'in: 1,2,3,4,5,6,7,8,9,10,?'],
			'uri' => ['required', 'max:50', 'regex:/^[a-zA-Z0-9-]+$/'],
		], [
			'first_name.required' => 'Ovo polje je obavezno.',
			'first_name.max' => 'Maksimalan broj karaktera je 30.',
			'last_name.required' => 'Ovo polje je obavezno.',
			'last_name.max' => 'Maksimalan broj karaktera je 30.',
			'club.max' => 'Maksimalan broj karaktera je 30.',
			'location.max' => 'Maksimalan broj karaktera je 30.',
			'category.required' => 'Ovo polje je obavezno.',
			'category.in' => 'Kategorija mora biti jedna od: 1,2,3,4,5,6,7,8,9,10 ili ?',
		]);

		$player = Player::find($data['id']);


		$regenerate_uri = false;
		$ignore_name_change = false;

		if($player->first_name != $data['first_name'] || $player->last_name != $data['last_name']){ 
			$regenerate_uri = true;
		}
		if($player->uri != $data['uri']){
			$ignore_name_change = true;
		}

		$player->first_name = $data['first_name'];
		$player->last_name = $data['last_name'];
		$player->club = $data['club'];
		$player->location = $data['location'];
		$player->category = $data['category'];

		
		if(!$ignore_name_change){
			if($regenerate_uri){
				$uri_firstname = Helper::formatName($data['first_name']);
				$uri_lastname = Helper::formatName($data['last_name']);
				$uri = $uri_firstname . '-' . $uri_lastname;
				// Check if the URI already exists
				$existingPlayer = Player::where('uri', $uri)->first();
				if ($existingPlayer) {
					// If it exists, append a number to make it unique
					$counter = 1;
					while (Player::where('uri', $uri . '-' . $counter)->exists()) {
						$counter++;
						$uri = $uri_firstname . '-' . $uri_lastname . '-' . $counter;
					}
					$player->uri = $uri_firstname . '-' . $uri_lastname . '-' . $counter;
				} 
				else {
					$player->uri = $uri_firstname . '-' . $uri_lastname;
				}
			}
			else{
				$player->uri = $data['uri'];
			}
		}
		else{
			$player->uri = $data['uri'];
		}


		$uri_firstname = Helper::formatName($data['first_name']);
		$uri_lastname = Helper::formatName($data['last_name']);
		$uri = $uri_firstname . '-' . $uri_lastname;

		$player->save();
		$uri = '/'.$player->uri;
		return redirect($uri);
	}

	/**
	 * Display the specified resource.
	 */
	public function show($uri)
	{
		return Inertia::render('players/Player', [
			'player_uri' => $uri,
		]);
	}

	public static function getPlayersForCategory($category){
		return Player::where('category', $category)
			->orderBy('points', 'desc')
			->limit(5)
			->get()
			->map(function ($player) {
				return [
					'uri' => $player->uri,
					'name' => $player->first_name . ' ' . $player->last_name,
					'points' => $player->points,
				];
			});
	}

	public static function get_player_by_uri($uri){
		$p = Player::where('uri', $uri)
			->withCount(['wins', 'losses'])
			->get()
			->map(
				function ($player) {
					return [
						'id' => $player->id,
						'name' => $player->first_name . ' ' . $player->last_name,
						'uri' => $player->uri,
						'location' => $player->location,
						'club' => $player->club,
						'rank' => $player->rank,
						'category'=> $player->category,
						'points' => $player->points,
						// The match list loads separately from /api/player/{id}/matches
						'matchups' => [
							'won_against' => $player->wonAgainstWithCounts(),
							'lost_against' => $player->lostAgainstWithCounts(),
						],
						'locations' =>[
							'courts' => $player->mostUsedCourts(),
							'leagues' => $player->mostUsedLeagues(),
							'counties' => $player->mostUsedCounties()
						],
						'wins_number' => $player->wins_count,
						'losses_number' => $player->losses_count,
						'total_matches' => $player->wins_count + $player->losses_count,
						'win_precentage' => $player->wins_count + $player->losses_count == 0 ? 0 : round($player->wins_count / ($player->wins_count + $player->losses_count) * 100),
					];
				}
			);

			return $p[0];
	}

	public function getPlayerMatchesApi(Request $request, $id)
	{
		$page = $request->get('page', 1);
		$perPage = $request->get('per_page', 100);
		$sortBy = $request->get('sort_by', 'number');
		$sortDir = $request->get('sort_dir', 'desc');
		$offset = ($page - 1) * $perPage;

		$allowedSorts = ['number', 'date', 'set_score', 'county', 'winner', 'loser', 'league', 'court'];
		if (!in_array($sortBy, $allowedSorts)) {
			$sortBy = 'number';
		}
		$sortDir = $sortDir === 'asc' ? 'asc' : 'desc';

		$player = Player::findOrFail($id);
		$total = $player->matches()->count();

		// Only the requested page is loaded, with its players, court and league in a few queries;
		// reorder() drops the relation's newest-first order so the chosen sort applies,
		// number breaks ties so pages don't overlap
		$matches = $player->matches()
			->reorder()
			->select('tennis_matches.*')
			->applySort($sortBy, $sortDir)
			->orderByDesc('tennis_matches.number')
			->with(['winners', 'losers', 'court', 'league'])
			->skip($offset)
			->take((int) $perPage)
			->get();

		$paginatedMatches = $matches->map(function ($match) {
			$winners = $match->winners->values();
			$losers = $match->losers->values();

			return [
				'winner1_name' => $winners[0]->first_name . ' ' . $winners[0]->last_name,
				'winner1_uri' => $winners[0]->uri,
				'winner1_category' => $winners[0]->category,
				'winner2_name' => isset($winners[1]) ? $winners[1]->first_name . ' ' . $winners[1]->last_name : null,
				'winner2_uri' => $winners[1]->uri ?? null,
				'winner2_category' => $winners[1]->category ?? null,
				'loser1_name' => $losers[0]->first_name . ' ' . $losers[0]->last_name,
				'loser1_uri' => $losers[0]->uri,
				'loser1_category' => $losers[0]->category,
				'loser2_name' => isset($losers[1]) ? $losers[1]->first_name . ' ' . $losers[1]->last_name : null,
				'loser2_uri' => $losers[1]->uri ?? null,
				'loser2_category' => $losers[1]->category ?? null,
				'number' => $match->number,
				'uri' => TenisMatchController::matchUriFromPlayers($match->number, $winners[0], $winners[1] ?? null, $losers[0], $losers[1] ?? null),
				'winner_point_gain' => $match->winner_point_gain,
				'loser_point_gain' => $match->loser_point_gain,
				'set_score' => $match->set_score,
				'game_score' => $match->game_score,
				'county' => $match->county,
				'court' => $match->court,
				'league' => $match->league,
				'date' => $match->date,
			];
		});

		return response()->json([
			'data' => $paginatedMatches,
			'current_page' => (int) $page,
			'per_page' => (int) $perPage,
			'total' => $total,
			'last_page' => ceil($total / $perPage),
			'from' => $offset + 1,
			'to' => min($offset + $perPage, $total),
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Player $player)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdatePlayerRequest $request, Player $player)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Player $player)
	{
		//
	}
}
