<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\TenisMatch;
use App\Models\Court;
use App\Models\League;
use Illuminate\Http\Request;
use LeagueChartData;

class LeagueController extends Controller
{

    public static function getStatistics(){

        $data = [
            'totals'=>[],
            'players'=>[
                'total'=>[],
                'wins'=>[],
                'loses'=>[]
            ],
            'locations'=>[]
        ];

        $data['totals']['matches'] = TenisMatch::count();
        $data['totals']['players'] = Player::count();
        $data['locations'] = Self::getLocations();
        $players = PlayerController::getPlayers();


        $points = 0;

        foreach($players as $player){
            $points += $player['stats']['elo'];
        }

        $data['totals']['points'] = $points;

        usort($players, function($a, $b) {
            return $b['stats']['total_matches'] <=> $a['stats']['total_matches'];
        });

        for ($i=0; $i < 5; $i++) {
            array_push($data['players']['total'], [
                'name' => $players[$i]['name'],
                'count' => $players[$i]['stats']['total_matches'],
                'uri' => $players[$i]['uri'],
            ]);
        }

        usort($players, function($a, $b) {
            return $b['stats']['wins'] <=> $a['stats']['wins'];
        });

        for ($i=0; $i < 5; $i++) {
            array_push($data['players']['wins'], [
                'name' => $players[$i]['name'],
                'count' => $players[$i]['stats']['total_matches'],
                'uri' => $players[$i]['uri'],
            ]);
        }

        usort($players, function($a, $b) {
            return $b['stats']['loses'] <=> $a['stats']['loses'];
        });
        for ($i=0; $i < 5; $i++) {
            array_push($data['players']['loses'], [
                'name' => $players[$i]['name'],
                'count' => $players[$i]['stats']['total_matches'],
                'uri' => $players[$i]['uri'],
            ]);
        }

        return $data;

    }

    public static function getChart(){

        return LeagueChartData::getChartData();
    }

    public static function getLocations(){
        $matches = TenisMatch::all();

        $data = [
            'courts'=>[],
            'locations'=>[],
            'leagues'=>[]
        ];

        foreach ($matches as $match) {
            $court = Court::find($match->court_id);
            $league = League::find($match->league_id);
            if($league->id != 1){
                if(!isset($data['leagues'][$league->id])){
                    $data['leagues'][$league->id] = [
                        'name' => $league->name,
                        'link' => $league->link,
                        'count' => 1
                    ];
                }
                else{
                    $data['leagues'][$league->id]['count']++;
                }
            }
            if($court->id != 1){
                if(!isset($data['courts'][$court->id])){
                    $data['courts'][$court->id] = [
                        'name' => $court->name,
                        'link' => $court->link,
                        'count' => 1
                    ];
                }
                else{
                    $data['courts'][$court->id]['count']++;
                }
            }
            if(!isset($data['locations'][$match->match_location])){
                $data['locations'][$match->match_location] = [
                    'name' => $match->match_location,
                    'count' => 1
                ];
            }
            else{
                $data['locations'][$match->match_location]['count']++;
            }
        }

        usort($data['courts'], function($a, $b) {
            return $b['count'] <=> $a['count'];
        });
        usort($data['locations'], function($a, $b) {
            return $b['count'] <=> $a['count'];
        });
        usort($data['leagues'], function($a, $b) {
            return $b['count'] <=> $a['count'];
        });
        $data['courts'] = array_slice($data['courts'], 0, 5);
        $data['locations'] =  array_slice($data['locations'], 0, 5);
        $data['leagues'] = array_slice($data['leagues'], 0, 5);

        return $data;
    }


    public static function getLocationsForPlayer($player_id){
        $matches = TenisMatch::where('winner_id', $player_id)->orWhere('loser_id', $player_id)->get();

        $data = [
            'courts'=>[],
            'locations'=>[],
            'leagues'=>[]
        ];

        foreach ($matches as $match) {
            $court = Court::find($match->court_id);
            $league = League::find($match->league_id);

            if($league->id != 1){
                if(!isset($data['leagues'][$league->id])){
                    $data['leagues'][$league->id] = [
                        'name' => $league->name,
                        'link' => $league->link,
                        'count' => 1
                    ];
                }
                else{
                    $data['leagues'][$league->id]['count']++;
                }
            }
            if($court->id != 1){
                if(!isset($data['courts'][$court->id])){
                    $data['courts'][$court->id] = [
                        'name' => $court->name,
                        'link' => $court->link,
                        'count' => 1
                    ];
                }
                else{
                    $data['courts'][$court->id]['count']++;
                }
            }

            if(!isset($data['locations'][$match->match_location])){
                $data['locations'][$match->match_location] = [
                    'name' => $match->match_location,
                    'count' => 1
                ];
            }
            else{
                $data['locations'][$match->match_location]['count']++;
            }
        }

        usort($data['courts'], function($a, $b) {
            return $b['count'] <=> $a['count'];
        });
        usort($data['locations'], function($a, $b) {
            return $b['count'] <=> $a['count'];
        });
        usort($data['leagues'], function($a, $b) {
            return $b['count'] <=> $a['count'];
        });

        return $data;
    }


}
