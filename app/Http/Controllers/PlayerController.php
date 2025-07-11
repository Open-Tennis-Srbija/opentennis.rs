<?php

namespace App\Http\Controllers;

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
			->select('first_name', 'last_name','category','uri', 'location','rank','points')
			->withCount([
			'wins','losses'])
			->orderBy('rank')
			->get()
			->map(function ($player) {
				return [
					'uri' => $player->uri,
					'name' => $player->first_name . ' ' . $player->last_name,
					'location' => $player->location,
					'rank' => $player->rank,
					'points' => $player->points,
					'wins' => $player->wins_count,
					'category' => $player->category,
					'loses' => $player->losses_count,
					'total_matches' => $player->wins_count + $player->losses_count,
					'win_precentage' => $player->wins_count + $player->losses_count == 0 ? 0 : round($player->wins_count / ($player->wins_count + $player->losses_count) * 100),
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
			'locations' => LeagueController::getLocationsForPlayer($player->id),
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
		return Inertia::render('Auth/EditPlayer', [
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
		return Inertia::render('Player', [
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
			->with('wins','losses')
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
						'wins' => $player->wins->map(
							function ($win) {
								return [
									'winner1_name' => $win->winners()->first()->first_name . ' ' . $win->winners()->first()->last_name,
									'winner1_uri' => $win->winners()->first()->uri,
									'winner1_category' => $win->winners()->first()->category,
									'winner2_name' => $win->winners()->skip(1)->first() ? $win->winners()->skip(1)->first()->first_name . ' ' . $win->winners()->skip(1)->first()->last_name : null,
									'winner2_uri' => $win->winners()->skip(1)->first() ? $win->winners()->skip(1)->first()->uri : null,
									'winner2_category' => $win->winners()->skip(1)->first() ? $win->winners()->skip(1)->first()->category : null,
									'loser1_name' => $win->losers()->first()->first_name . ' ' . $win->losers()->first()->last_name,
									'loser1_uri' => $win->losers()->first()->uri,
									'loser1_category' => $win->losers()->first()->category,
									'loser2_name' => $win->losers()->skip(1)->first() ? $win->losers()->skip(1)->first()->first_name . ' ' . $win->losers()->skip(1)->first()->last_name : null,
									'loser2_uri' => $win->losers()->skip(1)->first() ? $win->losers()->skip(1)->first()->uri : null,
									'loser2_category' => $win->losers()->skip(1)->first() ? $win->losers()->skip(1)->first()->category : null,
									'number' => $win->number,
									'winner_point_gain' => $win->winner_point_gain,
									'loser_point_gain' => $win->loser_point_gain,
									'set_score' => $win->set_score,
									'game_score' => $win->game_score,
									'county' => $win->county,
									'court' => Court::find($win->court_id),
									'league' => League::find($win->league_id),
									'date' => $win->date,
								];
							}
						),
						'losses' => $player->losses->map(
							function ($loss) {
								return [
									'winner1_name' => $loss->winners()->first()->first_name . ' ' . $loss->winners()->first()->last_name,
									'winner1_uri' => $loss->winners()->first()->uri,
									'winner1_category' => $loss->winners()->first()->category,
									'winner2_name' => $loss->winners()->skip(1)->first() ? $loss->winners()->skip(1)->first()->first_name . ' ' . $loss->winners()->skip(1)->first()->last_name : null,
									'winner2_uri' => $loss->winners()->skip(1)->first() ? $loss->winners()->skip(1)->first()->uri : null,
									'winner2_category' => $loss->winners()->skip(1)->first() ? $loss->winners()->skip(1)->first()->category : null,
									'loser1_name' => $loss->losers()->first()->first_name . ' ' . $loss->losers()->first()->last_name,
									'loser1_uri' => $loss->losers()->first()->uri,
									'loser1_category' => $loss->losers()->first()->category,
									'loser2_name' => $loss->losers()->skip(1)->first() ? $loss->losers()->skip(1)->first()->first_name . ' ' . $loss->losers()->skip(1)->first()->last_name : null,
									'loser2_uri' => $loss->losers()->skip(1)->first() ? $loss->losers()->skip(1)->first()->uri : null,
									'loser2_category' => $loss->losers()->skip(1)->first() ? $loss->losers()->skip(1)->first()->category : null,
									'number' => $loss->number,
									'winner_point_gain' => $loss->winner_point_gain,
									'loser_point_gain' => $loss->loser_point_gain,
									'set_score' => $loss->set_score,
									'game_score' => $loss->game_score,
									'county' => $loss->county,
									'court' => Court::find($loss->court_id),
									'league' => League::find($loss->league_id),
									'date' => $loss->date,
								];
							}
						),
						'matchups' => [
							'won_against' => $player->wonAgainstWithCounts(),
							'lost_against' => $player->lostAgainstWithCounts(),
							'not_played' => $player->notPlayedWith(),
						],
						'locations' =>[
							'courts' => $player->mostUsedCourts(),
							'leagues' => $player->mostUsedLeagues(),
							'counties' => $player->mostUsedCounties()
						],
						'wins_number' => count($player->wins),
						'losses_number' => count($player->losses),
						'total_matches' => count($player->wins) + count($player->losses),
						'win_precentage' => count($player->wins) + count($player->losses) == 0 ? 0 : round(count($player->wins) / (count($player->wins) + count($player->losses)) * 100),
					];
				}
			);

			return $p[0];
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
