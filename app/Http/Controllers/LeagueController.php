<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\TenisMatch;
use App\Models\Court;
use App\Models\League;
use App\Models\TennisMatch;
use LeagueChartData;
use Illuminate\Support\Facades\Storage;


class LeagueController extends Controller
{

    public static function getCachedStatistics(){
        return json_decode(file_get_contents(storage_path('app/public/statistics.json')), true);
    }

    public static function update_league_cache($winner_data, $loser_data, $location_data, $court_data, $league_data, $date, $new_players = 0){
        $cache = json_decode(file_get_contents(storage_path('app/public/statistics.json')), true);

        $cache['stats']['totals']['matches'] ++;
        $cache['stats']['totals']['points'] += $winner_data['gains'] + $loser_data['gains'];
        if($new_players > 0){
            $cache['stats']['totals']['players']+= $new_players;
        }

        $cache_players_total = $cache['stats']['players']['total'];
        $cache_players_wins = $cache['stats']['players']['wins'];
        $cache_players_loses = $cache['stats']['players']['loses'];

        $updated_total_win = false;
        $updated_total_los = false;

        for($i = 0; $i < count($cache_players_total); $i++){
            if($cache_players_total[$i]['uri'] == $winner_data['uri']){
                $cache_players_total[$i]['count']++;
                $updated_total_win = true;
            }
            if($cache_players_total[$i]['uri'] == $loser_data['uri']){
                $cache_players_total[$i]['count']++;
                $updated_total_los = true;
            }
        }

        if(!$updated_total_win && $cache_players_total[count($cache_players_total)-1]['count'] < $winner_data['total_matches']){
            $cache_players_total[count($cache_players_total)-1] = [
                'name' => $winner_data['name'],
                'count' => $winner_data['total_matches'],
                'uri' => $winner_data['uri'],
            ];
        }

        if(!$updated_total_los && $cache_players_total[count($cache_players_total)-1]['count'] < $loser_data['total_matches']){
            $cache_players_total[count($cache_players_total)-1] = [
                'name' => $loser_data['name'],
                'count' => $loser_data['total_matches'],
                'uri' => $loser_data['uri'],
            ];
        }

        $cache['stats']['players']['total'] = $cache_players_total;
        $updated_wins = false;

        for($i = 0; $i < count($cache_players_wins); $i++){
            if($cache_players_wins[$i]['uri'] == $winner_data['uri']){
                $cache_players_wins[$i]['count']++;
                $updated_wins = true;
            }
        }
        if(!$updated_wins && $cache_players_wins[count($cache_players_wins)-1]['count'] < $winner_data['wins']){
            $cache_players_wins[count($cache_players_wins)-1] = [
                'name' => $winner_data['name'],
                'count' => $winner_data['wins'],
                'uri' => $winner_data['uri'],
            ];
        }

        $cache['stats']['players']['wins'] = $cache_players_wins;


        $updated_loses = false;
        for($i = 0; $i < count($cache_players_loses); $i++){
            if($cache['stats']['players']['loses'][$i]['uri'] == $loser_data['uri']){
                $cache['stats']['players']['loses'][$i]['count'] = $cache['stats']['players']['loses'][$i]['count'] + 1;
                $updated_loses = true;
            }
        }

        if(!$updated_loses && $cache_players_loses[count($cache_players_loses)-1]['count'] < $loser_data['loses']){
            $cache['stats']['players']['loses'][count($cache_players_loses)-1] = [
                'name' => $loser_data['name'],
                'count' => $loser_data['loses'],
                'uri' => $loser_data['uri'],
            ];
        }


        $cache_locations_courts = $cache['stats']['locations']['courts'];
        $cache_locations_leagues = $cache['stats']['locations']['leagues'];
        $cache_locations_locations = $cache['stats']['locations']['locations'];

        $court_updated = false;
        for($i = 0; $i < count($cache_locations_courts); $i++){
            if($cache_locations_courts[$i]['link'] == $court_data['link'] && $court_data['id'] > 1){
                $cache_locations_courts[$i]['count']++;
                $court_updated = true;
            }
        }
        if(!$court_updated && $cache_locations_courts[count($cache_locations_courts)-1]['count'] < $court_data['count']){
            $cache_locations_courts[count($cache_locations_courts)-1] = [
                'name' => $court_data['name'],
                'link' => $court_data['link'],
                'count' => $court_data['count'],
            ];
        }
        $cache['stats']['locations']['courts'] = $cache_locations_courts;

        $league_updated = false;
        if($league_data['id'] > 1){
            if(count($cache_locations_leagues) == 0){
                array_push($cache_locations_leagues, [
                    'name' => $league_data['name'],
                    'link' => $league_data['link'],
                    'count' => 1,
                ]);
            }
            else{
                for($i = 0; $i < count($cache_locations_leagues); $i++){
                    if($cache_locations_leagues[$i]['link'] == $league_data['link']){
                        $cache_locations_leagues[$i]['count']++;
                        $league_updated = true;
                    }
                }
                if(!$league_updated && $cache_locations_leagues[count($cache_locations_leagues)-1]['count'] < $league_data['count']){
                    $cache_locations_leagues[count($cache_locations_leagues)-1] = [
                        'name' => $league_data['name'],
                        'link' => $league_data['link'],
                        'count' => $league_data['count'],
                    ];
                }
            }

        }

        $cache['stats']['locations']['leagues'] = $cache_locations_leagues;

        $location_updated = false;
        for($i = 0; $i < count($cache_locations_locations); $i++){
            if($cache_locations_locations[$i]['name'] == $location_data['name']){
                $cache_locations_locations[$i]['count']++;
                $location_updated = true;
            }
        }
        if(!$location_updated && $cache_locations_locations[count($cache_locations_locations)-1]['count'] < $location_data['count']){
            $cache_locations_locations[count($cache_locations_locations)-1] = [
                'name' => $location_data['name'],
                'count' => $location_data['count'],
            ];
        }
        $cache['stats']['locations']['locations'] = $cache_locations_locations;

        $cache_chart_points = $cache['charts']['points'];
        $cache_chart_players = $cache['charts']['players'];
        $cache_chart_matches = $cache['charts']['matches'];

        if($new_players > 0){
            $updated_total_players = false;
            foreach($cache_chart_players as $entry){
                if(strtotime($entry['date']) >= strtotime($date)){
                    $entry['players']+= $new_players;
                    $updated_total_players = true;
                }
            }
            if(!$updated_total_players){
                $cache_chart_players[count($cache_chart_players)-1]['players'] += $new_players;
            }
        }

        $updated_chart_points = false;
        foreach($cache_chart_points as $entry){

            if(strtotime($entry['date']) >= strtotime($date)){
                $entry['points'] += $winner_data['gains'] + $loser_data['gains'];
                $updated_chart_points = true;
            }
        }
        if(!$updated_chart_points){
            $cache_chart_points[count($cache_chart_points)-1]['points'] += $winner_data['gains'] + $loser_data['gains'];
        }

        $updated_chart_matches = false;
        foreach($cache_chart_matches as $entry){
            if(strtotime($entry['date']) >= strtotime($date)){
                $entry['matches'] ++;
            }
        }
        if(!$updated_chart_matches){
            $cache_chart_matches[count($cache_chart_matches)-1]['matches'] ++;
        }

        $cache['charts']['points'] = $cache_chart_points;
        $cache['charts']['players'] = $cache_chart_players;
        $cache['charts']['matches'] = $cache_chart_matches;


        Storage::disk('public')->put('statistics.json', json_encode($cache));
    }

    public static function update_ranks_cache($winner, $loser, $winner_gains, $loser_gains, $new_winner, $new_loser){
        $data = json_decode(file_get_contents(storage_path('app/public/players.json')), true);

        $winner_data = null;
        $loser_data = null;
        $winner_pos = 0;
        $loser_pos = 0;

        for($i = 0; $i < count($data) ; $i++){

            if($data[$i]['id'] == $winner->id){
                $winner_pos = $i+1;
                $data[$i]['stats']['elo'] = $data[$i]['stats']['elo'] + $winner_gains;
                $data[$i]['stats']['wins']++;
                $data[$i]['stats']['total_matches']++;
                $data[$i]['stats']['win_precentage'] = round($data[$i]['stats']['wins'] / $data[$i]['stats']['total_matches'] * 100, 2);
                $winner_data = $data[$i];

                for($k = $i; $k > 0; $k--){
                    if($data[$k]['stats']['elo'] > $data[$k-1]['stats']['elo']){
                        $temp = $data[$k];
                        $data[$k] = $data[$k-1];
                        $data[$k-1] = $temp;
                        $winner_pos = $k;
                    }
                    else{
                        break;
                    }
                }

            }
            if($data[$i]['id'] == $loser->id){
                $loser_pos = $i+1;
                $data[$i]['stats']['elo'] = round($data[$i]['stats']['elo'] + $loser_gains);
                $data[$i]['stats']['loses']++;
                $data[$i]['stats']['total_matches']++;
                $data[$i]['stats']['win_precentage'] = round($data[$i]['stats']['wins'] / $data[$i]['stats']['total_matches'] * 100, 2);
                $loser_data = $data[$i];

                for($k = $i; $k > 0; $k--){
                    if($data[$k]['stats']['elo'] > $data[$k-1]['stats']['elo']){
                        $temp = $data[$k];
                        $data[$k] = $data[$k-1];
                        $data[$k-1] = $temp;
                        $loser_pos = $k;
                    }
                    else{
                        break;
                    }
                }
            }
        }
        if($new_winner){
            $winner_data = [
                'id' => $winner->id,
                'name' => $winner->first_name . ' ' . $winner->last_name,
                'uri' => $winner->uri,
                'stats' => [
                    'elo' => $winner_gains,
                    'wins' => 1,
                    'loses' => 0,
                    'total_matches' => 1,
                    'win_precentage' => 100
                ]
            ];
            array_push($data, $winner_data);
        }
        if($new_loser){
            $loser_data = [
                'id' => $loser->id,
                'name' => $loser->first_name . ' ' . $loser->last_name,
                'uri' => $loser->uri,
                'stats' => [
                    'elo' => $loser_gains,
                    'wins' => 0,
                    'loses' => 1,
                    'total_matches' => 1,
                    'win_precentage' => 0
                ]];
            array_push($data, $loser_data);
        }
        if($new_winner || $new_loser){
            usort($data, function($a, $b) {
                return $b['stats']['elo'] <=> $a['stats']['elo'];
            });
            for($i = 0; $i < count($data); $i++){
                $data[$i]['rank'] = $i+1;
                if($data[$i]['id'] == $winner->id){
                    $winner_pos = $i+1;
                }
                if($data[$i]['id'] == $loser->id){
                    $loser_pos = $i+1;
                }
            }
        }


        Storage::disk('public')->put('players.json', json_encode($data));

        return [
            "winner" =>[
                "data" => $winner_data,
                "pos" => $winner_pos,
            ],
            "loser" =>[
                "data" => $loser_data,
                "pos" => $loser_pos,
            ]
        ];
     }

    
    
    public function getLeagueChart(){
        if(Storage::disk('public')->exists('charts/statistics.php')){
            return include(Storage::disk('public')->path('charts/statistics.php'));
        }
        else{
            return null;
        }
    }
    
     public static function getStatistics(){

        $data = [
            'totals'=>[],
            'players'=>[
                'total'=>[],
                'wins'=>[],
                'loses'=>[]
            ],
            'categories'=>[
                1 => [],
                2 => [],
                3 => [],
                4 => [],
                5 => [],
                6 => [],
                7 => [],
                8 => [],
                9 => [],
                10 => [],
                '?' => []
            ],
            'locations'=>[]
        ];

        $data['totals']['matches'] = TennisMatch::count();
        $data['totals']['players'] = Player::count();
        $data['locations'] = Self::getLocations();
        $players = PlayerController::getPlayers();

        $players = $players->toArray();
       usort($players, function($a, $b) {
            $matchComparison = $b['total_matches'] <=> $a['total_matches'];

            return $matchComparison ?: strcmp($a['name'], $b['name']);
        });

        for ($i=0; $i < 5; $i++) {
            array_push($data['players']['total'], [
                'name' => $players[$i]['name'],
                'count' => $players[$i]['total_matches'],
                'uri' => $players[$i]['uri'],
            ]);
        }

       usort($players, function($a, $b) {
            $matchComparison = $b['wins'] <=> $a['wins'];

            return $matchComparison ?: strcmp($a['name'], $b['name']);
        });

        for ($i=0; $i < 5; $i++) {
            array_push($data['players']['wins'], [
                'name' => $players[$i]['name'],
                'count' => $players[$i]['wins'],
                'uri' => $players[$i]['uri'],
            ]);
        }
       usort($players, function($a, $b) {
            $matchComparison = $b['loses'] <=> $a['loses'];

            return $matchComparison ?: strcmp($a['name'], $b['name']);
        });

        for ($i=0; $i < 5; $i++) {
            array_push($data['players']['loses'], [
                'name' => $players[$i]['name'],
                'count' => $players[$i]['loses'],
                'uri' => $players[$i]['uri'],
            ]);
        }


        $data['categories'][1] = PlayerController::getPlayersForCategory(1);
        $data['categories'][2] = PlayerController::getPlayersForCategory(2);
        $data['categories'][3] = PlayerController::getPlayersForCategory(3);
        $data['categories'][4] = PlayerController::getPlayersForCategory(4);
        $data['categories'][5] = PlayerController::getPlayersForCategory(5);
        $data['categories'][6] = PlayerController::getPlayersForCategory(6);
        $data['categories'][7] = PlayerController::getPlayersForCategory(7);
        $data['categories'][8] = PlayerController::getPlayersForCategory(8);
        $data['categories'][9] = PlayerController::getPlayersForCategory(9);
        $data['categories'][10] = PlayerController::getPlayersForCategory(10);
        $data['categories']['?'] = PlayerController::getPlayersForCategory('?');

        return $data;

    }

    public static function getChart(){

        return LeagueChartData::getChartData();
    }

    public static function getLocations(){
        $matches = TennisMatch::all();

        $data = [
            'courts'=>[],
            'locations'=>[],
            'leagues'=>[]
        ];

        foreach ($matches as $match) {
            $court = Court::find($match->court_id);
            $league = League::find($match->league_id);
            if($league && $league->id != 1){
                if(!isset($data['leagues'][$league->id])){
                    $data['leagues'][$league->id] = [
                        'name' => $league->name,
                        'link' => $league->link,
                        'uri' => $league->uri,
                        'count' => 1
                    ];
                }
                else{
                    $data['leagues'][$league->id]['count']++;
                }
            }
            if($court && $court->id != 1){
                if(!isset($data['courts'][$court->id])){
                    $data['courts'][$court->id] = [
                        'name' => $court->name,
                        'id' => $court->id,
                        'uri' => $court->uri,
                        'count' => 1
                    ];
                }
                else{
                    $data['courts'][$court->id]['count']++;
                }
            }
            if(!isset($data['locations'][$match->county])){
                $data['locations'][$match->county] = [
                    'name' => $match->county,
                    'count' => 1
                ];
            }
            else{
                $data['locations'][$match->county]['count']++;
            }
        }


       usort($data['courts'], function($a, $b) {
            $matchComparison = $b['count'] <=> $a['count'];

            return $matchComparison ?: strcmp($a['name'], $b['name']);
        });
        usort($data['locations'], function($a, $b) {
            $comparison = $b['count'] <=> $a['count'];

            return $comparison ?: strcmp($a['name'], $b['name']);
        });
        usort($data['leagues'], function($a, $b) {
            $comparison = $b['count'] <=> $a['count'];

            return $comparison ?: strcmp($a['name'], $b['name']);
        });
        $data['courts'] = array_slice($data['courts'], 0, 5);
        $data['locations'] =  array_slice($data['locations'], 0, 5);
        $data['leagues'] = array_slice($data['leagues'], 0, 5);

        return $data;
    }




}