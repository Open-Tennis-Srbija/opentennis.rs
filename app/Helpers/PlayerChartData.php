<?php

use App\Http\Controllers\PlayerController;
use App\Models\Player;
use App\Models\TenisMatch;

Class PlayerChartData{

    public static function getChartData($player){

        $matches = TenisMatch::where('winner_id', $player->id)->orWhere('loser_id', $player->id)->get()->sortBy('match_date');
        $total_players = Player::all()->count();

        $data = [
            'points' => [],
            'rankings' => [],
            'maxRank' => $total_players,
            
        ];

        $data['points'] = self::getPointsChanges($matches, $player);


        $data['rankings'] = self::getRankingsChanges($matches, $player);



        return $data;

    }


    private static function getPointsChanges($matches,$player){
        $accumulative_points = 0;
        $changes_array = [];

        $start = new DateTime($matches[0]->match_date);
        $end = new DateTime('tomorrow');

        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($start, $interval, $end);

        foreach($matches as $match){
            if($match->winner_id == $player->id){
                $accumulative_points += NikolaAlgoV1::getMatchEloGains($match)[0];
                array_push($changes_array, [
                    'points' => $accumulative_points,
                    'date' => $match->match_date,
                ]);
            }
            else{
                $accumulative_points += NikolaAlgoV1::getMatchEloGains($match)[1];
                array_push($changes_array, [
                    'points' => $accumulative_points,
                    'date' => $match->match_date,
                ]);
            }
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

    private static function getRankingsChanges($matches,$player){
        $start = new DateTime($matches[0]->match_date);
        $end = new DateTime('tomorrow');
        $changes_array = [];

        $interval = DateInterval::createFromDateString('1 day');
        $period = new DatePeriod($start, $interval, $end);

        foreach($period as $day){
            $players = PlayerController::getPlayersOnDate($day->format('Y-m-d'));

            $rank = 0;

            foreach($players as $key => $value){
                if($value['uri'] == $player->uri){
                    $rank = $key + 1;
                }
            }

            array_push($changes_array, [
                'rank' => $rank,
                'date' => $day->format('Y-m-d'),
            ]);
        }


        return $changes_array;
    }

}

