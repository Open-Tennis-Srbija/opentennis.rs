<?php

use App\Http\Controllers\PlayerController;
use App\Models\Player;
use App\Models\TenisMatch;
use Illuminate\Support\Facades\Storage;

Class PlayerChartData{

    public static function get_cached_charts($uri){
        $file = 'charts/' . $uri . '.php';
        if(Storage::disk('public')->exists($file)){
            return include(Storage::disk('public')->path($file));
        }
        else{
            return null;
        }
    }

    public static function getChartData($player){

        $wins = $player->wins->reverse();
        $losses = $player->losses->reverse();
        $matches = $wins->merge($losses)->sortBy('number')->values();

        $total_players = Player::all()->count();

        $data = [
            'points' => [],
            'rankings' => [],
            'maxRank' => $total_players,

        ];

        $check = count($matches) > 0;
        $first_match = $check ? $matches->first() : null;
        $start = new DateTime($first_match->date);
        if(count($matches) == 1){
            $data['points'] = [
                [
                    'points' => count($wins) > 0 ? $wins[0]->winner_point_gain : $losses[0]->loser_point_gain,
                    'date' => $matches[0]->match_date,
                ]
            ];
            $data['rankings'] = [
                [
                    'rank' => $player->rank,
                    'date' => $matches[0]->match_date,
                ]
            ];
        }
        else{
            $data['points'] = self::getPointsChanges($start,$matches, $player->id);
            $data['rankings'] = self::getRankingsChanges($start,$player);
        }



        return $data;

    }


    private static function getPointsChanges($start, $matches, $player_id){
        $accumulative_points = 0;
        $changes_array = [];
        $end = new DateTime('tomorrow');

        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($start, $interval, $end);

        foreach($matches as $match){
            if($match->winners()->first()->id == $player_id){
                $accumulative_points += $match->winner_point_gain;
                array_push($changes_array, [
                    'points' => $accumulative_points,
                    'date' => $match->date,
                ]);
            }
            else{
                $accumulative_points += $match->loser_point_gain;
                array_push($changes_array, [
                    'points' => $accumulative_points,
                    'date' => $match->date,
                ]);
            }
        }
        $formated_changes = [];
        foreach($period as $day){
            $most_recent = [
                'points' => 0,
            ];
            foreach($changes_array as $change){
                $date = new DateTime($change['date']);
                $date = $date->format('Y-m-d');
                $date = strtotime($date,0);
                $compate = strtotime($day->format('Y-m-d'),0);
                if($date <= $compate){
                    $most_recent = $change;
                }

            }
            array_push($formated_changes, [
                'points' => $most_recent['points'],
                'date' => $day->format('Y-m-d'),
            ]);
        }


        return $formated_changes;
    }

    private static function getRankingsChanges($start,$player){
        $end = new DateTime('tomorrow');
        $changes_array = [];

        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($start, $interval, $end);

        foreach($period as $day){
            $date = $day->format('Y-m-d');
            echo 'calculating rank for date: ' . $date . PHP_EOL;
            $players = PlayerController::getPlayersOnDate($date);

            $rank = 0;

            foreach($players as $key => $value){
                if($value['uri'] == $player->uri){
                    $rank = $key + 1;
                }
            }
            echo 'rank' . $rank . PHP_EOL;
            array_push($changes_array, [
                'rank' => $rank,
                'date' => $day->format('Y-m-d'),
            ]);
        }


        return $changes_array;
    }

}

