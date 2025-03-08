<?php

use App\Http\Controllers\PlayerController;
use App\Models\Player;
use App\Models\TenisMatch;

Class LeagueChartData{

    public static function getChartData(){

        $matches = TenisMatch::all()->sortBy('match_date');
        $total_players = Player::all()->count();

        $data = [
            'points' => [],
            'rankings' => [],
            'maxRank' => $total_players,
            
        ];

        $data['points'] = self::getPointsChanges($matches);


        $data['players'] = self::getPlayerChanges($matches);

        $data['matches'] = self::getMatchChanges($matches);



        return $data;

    }


    private static function getPointsChanges($matches){
        $accumulative_points = 0;
        $changes_array = [];

        $start = new DateTime($matches[0]->match_date);
        $end = new DateTime('tomorrow');

        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($start, $interval, $end);

        foreach($matches as $match){
                $accumulative_points += NikolaAlgoV1::getMatchEloGains($match)[0];
                $accumulative_points += NikolaAlgoV1::getMatchEloGains($match)[1];
                $date = new DateTime($match->match_date);
                $date = $date->format('Y-m-d');
                array_push($changes_array, [
                    'points' => $accumulative_points,
                    'date' => $date,
                ]);
        }

        $formated_changes = [];
        foreach($period as $day){
            $most_recent = null;
            foreach($changes_array as $change){
                if(strtotime($change['date']) <= strtotime($day->format('Y-m-d'))){
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

    private static function getPlayerChanges($matches){
        $start = new DateTime($matches[0]->match_date);
        $end = new DateTime('tomorrow');
        $changes_array = [];

        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($start, $interval, $end);

        foreach($period as $day){
            $players = PlayerController::getPlayersOnDate($day->format('Y-m-d'));

            array_push($changes_array, [
                'players' => count($players),
                'date' => $day->format('Y-m-d'),
            ]);
        }


        return $changes_array;
    }

    private static function getMatchChanges($matches){
        $start = new DateTime($matches[0]->match_date);
        $end = new DateTime('tomorrow');
        $changes_array = [];

        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($start, $interval, $end);

        foreach($period as $day){
            $count = 0;
            foreach($matches as $match){
                $date = new DateTime($match->match_date);
                $date = $date->format('Y-m-d');
                if(strtotime($date) <= strtotime($day->format('Y-m-d'))){
                    $count++;
                }
            }

            array_push($changes_array, [
                'matches' => $count,
                'date' => $day->format('Y-m-d'),
            ]);
        }


        return $changes_array;
    }

}

