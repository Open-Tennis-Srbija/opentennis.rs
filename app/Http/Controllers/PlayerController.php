<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlayerRequest;
use App\Http\Requests\UpdatePlayerRequest;
use App\Models\Player;
use App\Models\TenisMatch;
use DateTime;
use Illuminate\Container\Attributes\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB as FacadesDB;
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

    public static function getCachedPlayers(){
        return json_decode(file_get_contents(storage_path('app/public/players.json')), true);

    }
    public static function getPlayers(){
        $raw_players = Player::all();

        $players = [];
        foreach($raw_players as $player){
            array_push($players, [
                'id' => $player->id,
                'uri' => $player->uri,
                'name' => $player->first_name . ' ' . $player->last_name,
                'stats' => $player->getStats(),
                'club' => $player->club,
                'location' => $player->location,
            ]);
        }


        usort($players, function($a, $b) {
            return $b['stats']['elo'] <=> $a['stats']['elo'];
        });

        return $players;
    }

    public static function getPlayersOnDate($date){
        $raw_players = Player::all();

        $players = [];
        foreach($raw_players as $player){
            $check = TenisMatch::where('winner_id', $player->id)->orWhere('loser_id', $player->id)->orderBy('match_date')->first();
            $checkDate = new DateTime($check->match_date);
            $checkDate = $checkDate->format('Y-m-d');
            if($check)
                if(strtotime($checkDate) <= strtotime($date)){
                    array_push($players, [
                        'uri' => $player->uri,
                        'check' => $check,
                        'stats' => $player->getStatsOnDate($date),
                    ]);
                }
        }

        usort($players, function($a, $b) {
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

    public function getPlayer($id){
        return Inertia::render('EditPlayer', [
            'player' => Player::find($id),
        ]);

    }

    public function getChart(Request $request){

        $player = Player::find($request->id);

        return  PlayerChartData::getChartData($player);
    }


    public function updatePlayer(Request $request){
        $data = $request->validate([
            'id' => ['required'],
            'first_name' => ['required', 'max:30'],
            'last_name' => ['required', 'max:30'],
            'club' => ['max:30'],
            'location' => ['max:30'],
        ], [
            'first_name.required' => 'Ovo polje je obavezno.',
            'first_name.max' => 'Maksimalan broj karaktera je 30.',
            'last_name.required' => 'Ovo polje je obavezno.',
            'last_name.max' => 'Maksimalan broj karaktera je 30.',
            'club.max' => 'Maksimalan broj karaktera je 30.',
            'location.max' => 'Maksimalan broj karaktera je 30.',
        ]);

        $player = Player::find($data['id']);

        $player->first_name = $data['first_name'];
        $player->last_name = $data['last_name'];
        $player->club = $data['club'];
        $player->location = $data['location'];

        $player->save();
        $uri = '/'.$player->uri;
        return redirect($uri);
    }

    /**
     * Display the specified resource.
     */
    public function show($uri)
    {
        $check = Player::where('uri', $uri)->first();
        if(!$check){
            return redirect('/');
        }

        return Inertia::render('Player', [
            'player' => json_decode(file_get_contents(storage_path('app/public/players/'.$uri.'.json')), true),
        ]);
    }

    public static function update_player_cache_from_match($player,$data,$opponent,$match,$match_number,$points){

        $cache = json_decode(file_get_contents(storage_path('app/public/players/'.$player->uri.'.json')), true);

        // update base stats
        $cache['data']['position'] = $data['pos'];
        $cache['data']['stats']['elo'] = $data['data']['stats']['elo'];
        $cache['data']['stats']['wins'] = $data['data']['stats']['wins'];
        $cache['data']['stats']['loses'] = $data['data']['stats']['loses'];
        $cache['data']['stats']['total_matches'] = $data['data']['stats']['total_matches'];
        $cache['data']['stats']['win_precentage'] = $data['data']['stats']['win_precentage'];

        // update matchups
        $matchups = $cache['data']['matchups'];

        $is_winning = $match->winner_id == $player->id;

        $new_uri = null;

        if($is_winning){
            $updated_wins = false;
            for($i = 0; $i < count($matchups['wins']); $i++){
                if($matchups['wins'][$i]['uri'] == $opponent->uri){
                    $matchups['wins'][$i]['number']++;
                    $updated_wins = true;
                }
            }

            if(!$updated_wins){
                array_push($matchups['wins'], [
                    'name' => $opponent->first_name . ' ' . $opponent->last_name,
                    'uri' => $opponent->uri,
                    'number' => 1,
                ]);
                $new_uri = $opponent->uri;
            }
        }
        if(!$is_winning){
            $updated_losses = false;
            for($i = 0; $i < count($matchups['loses']); $i++){
                if($matchups['loses'][$i]['uri'] == $opponent->uri){
                    $matchups['loses'][$i]['number']++;
                    $updated_losses = true;
                }
            }

            if(!$updated_losses){
                array_push($matchups['loses'], [
                    'name' => $opponent->first_name . ' ' . $opponent->last_name,
                    'uri' => $opponent->uri,
                    'number' => 1,
                ]);
                $new_uri = $opponent->uri;
            }
        }

        if($new_uri != null){
            for($i = 0; $i < count($matchups['notPlayedWith']); $i++){
                if($matchups['notPlayedWith'][$i]['uri'] == $new_uri){
                    unset($matchups['notPlayedWith'][$i]);
                }
            }
        }

        $cache['data']['matchups'] = $matchups;

        //
        // update wins and losses

        if($is_winning){
            array_push($cache['data']['wins'], [
                'id' => $match->id,
                'winner_points' => $points['winner'],
                'loser_points' => $points['loser'],
                'winner_uri' => $player->uri,
                'loser_uri' => $opponent->uri,
                'winner' => $player->first_name . ' ' . $player->last_name,
                'loser' => $opponent->first_name . ' ' . $opponent->last_name,
                'set_score' => $match->set_score,
                'number' => $match_number,
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
                'court' => $match->getCourt(),
                'league' => $match->getLeague(),

            ]);

            usort($cache['data']['wins'], function($a, $b) {
                return $b['number'] <=> $a['number'];
            });
        }
        else{
            array_push($cache['data']['loses'], [
                'id' => $match->id,
                'winner_points' => $points['winner'],
                'loser_points' => $points['loser'],
                'winner_uri' => $opponent->uri,
                'loser_uri' => $player->uri,
                'winner' => $opponent->first_name . ' ' . $opponent->last_name,
                'loser' => $player->first_name . ' ' . $player->last_name,
                'set_score' => $match->set_score,
                'number' => $match_number,
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
                'court' => $match->getCourt(),
                'league' => $match->getLeague(),

            ]);
            usort($cache['data']['loses'], function($a, $b) {
                return $b['number'] <=> $a['number'];
            });
        }

        // update locations

        $locations = $cache['data']['locations'];

        $updated_courts = false;

        for($i = 0; $i < count($locations['courts']); $i++){
            if($locations['courts'][$i]['name'] == $match->getCourt()['name'] && $match->getCourt()['name'] != ''){
                $locations['courts'][$i]['count']++;
                $updated_courts = true;
            }
        }
        if(!$updated_courts && $match->getCourt()['name'] != ''){
            array_push($locations['courts'], [
                'name' => $match->getCourt()['name'],
                'link' => $match->getCourt()['link'],
                'count' => 1,
            ]);
        }

        $updated_locations = false;
        for($i = 0; $i < count($locations['locations']); $i++){
            if($locations['locations'][$i]['name'] == $match->match_location && $match->match_location != ''){
                $locations['locations'][$i]['count']++;
                $updated_locations = true;
            }
        }
        if(!$updated_locations && $match->location != ''){
            array_push($locations['locations'], [
                'name' => $match->location,
                'count' => 1,
            ]);
        }

        $updated_leagues = false;
        for($i = 0; $i < count($locations['leagues']); $i++){
            if($locations['leagues'][$i]['name'] == $match->getLeague()['name'] && $match->getLeague()['name'] != ''){
                $locations['leagues'][$i]['count']++;
                $updated_leagues = true;
            }
        }
        if(!$updated_leagues && $match->getLeague()['name'] != ''){
            array_push($locations['leagues'], [
                'name' => $match->getLeague()['name'],
                'link' => $match->getLeague()['link'],
                'count' => 1,
            ]);
        }
        usort($locations['courts'], function($a, $b) {
            $matchComparison = $b['count'] <=> $a['count'];

            return $matchComparison ?: strcmp($a['name'], $b['name']);
        });
        usort($locations['leagues'], function($a, $b) {
            $matchComparison = $b['count'] <=> $a['count'];

            return $matchComparison ?: strcmp($a['name'], $b['name']);
        });

        usort($locations['locations'], function($a, $b) {
            $matchComparison = $b['count'] <=> $a['count'];

            return $matchComparison ?: strcmp($a['name'], $b['name']);
        });

        $cache['data']['locations'] = $locations;


        // update charts

        $chart_points = $cache['charts']['points'];

        $updated_points = false;
        foreach($chart_points as $point_entry){
            if(strtotime($point_entry['date']) >= strtotime($match->match_date)){
                if($is_winning){
                    $point_entry['points'] = $point_entry['points'] + $points['winner'];
                    $updated_points = true;
                }
                else{
                    $point_entry['points'] = $point_entry['points'] + $points['loser'];
                    $updated_points = true;
                }
            }
        }
        if(!$updated_points){
            if($is_winning){
                $chart_points[count($chart_points) - 1]['points'] = $chart_points[count($chart_points) - 1]['points'] + $points['winner'];
            }
            else{
                $chart_points[count($chart_points) - 1]['points'] = $chart_points[count($chart_points) - 1]['points'] + $points['loser'];
            }
        }
        $cache['charts']['points'] = $chart_points;

        $cache['charts']['rankings'][count($cache['charts']['rankings']) - 1]['rank'] = $data['pos'];



        Storage::disk('public')->put('/players/'.$player->uri.'.json', json_encode($cache));

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
