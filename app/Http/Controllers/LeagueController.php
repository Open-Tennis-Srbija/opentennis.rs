<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\TenisMatch;
use Illuminate\Http\Request;
use LeagueChartData;

class LeagueController extends Controller
{
    
    public static function getStatistics(){

        $data = [];
        
        $data['totals']['matches'] = TenisMatch::count();
        $data['totals']['players'] = Player::count();

        $players = PlayerController::getPlayers();

        $points = 0;

        foreach($players as $player){
            $points += $player['stats']['elo'];
        }

        $data['totals']['points'] = $points;

        usort($players, function($a, $b) {
            return $b['stats']['total_matches'] <=> $a['stats']['total_matches'];
        });

        $data['players']['total'] = [
            'name' => $players[0]['name'],
            'count' => $players[0]['stats']['total_matches'],
            'uri' => $players[0]['uri'],
        ];

        usort($players, function($a, $b) {
            return $b['stats']['wins'] <=> $a['stats']['wins'];
        });

        $data['players']['wins'] = [
            'name' => $players[0]['name'],
            'count' => $players[0]['stats']['wins'],
            'uri' => $players[0]['uri'],
        ];

        usort($players, function($a, $b) {
            return $b['stats']['loses'] <=> $a['stats']['loses'];
        });

        $data['players']['loses'] = [
            'name' => $players[0]['name'],
            'count' => $players[0]['stats']['loses'],
            'uri' => $players[0]['uri'],
        ];

        return $data;

    }

    public static function getChart(){

        return LeagueChartData::getChartData();
    }

}
