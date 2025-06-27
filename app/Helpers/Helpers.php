<?php

use App\Models\Player;
use Illuminate\Support\Facades\Storage;

Class Helpers{

    public static function UpdateRanks(){
        $players = Player::all();
        $players = $players->sortByDesc('points');

        $rank = 1;
        foreach($players as $player){
            $player->rank = $rank;
            $player->save();
            $rank++;
        }
    }

    public static function UpdatePlayerCharts($winner, $loser, $match){
        Self::update_player_chart($winner, $match->winner_point_gain, $match->date);
        Self::update_player_chart($loser, $match->loser_point_gain, $match->date);
    }

    public static function UpdateStatsChart($new_players, $point_gain, $date){
            $cache = include(Storage::disk('public')->path('charts/statistics.php'));
            $cache = json_decode(json_encode($cache), true);

            $cache['maxRank']+= $new_players;

            $points_updated = false;
            for($i = 0; $i < count($cache['points']); $i++){
                if($cache['points'][$i]['date'] >= $date){
                    $cache['points'][$i]['points'] += $point_gain;
                    $points_updated = true;
                }
            }
            if(!$points_updated){
                array_push($cache['points'], [
                    'date' => $date,
                    'points' => $cache['points'][count($cache['points']) - 1]['points'] + $point_gain
                ]);
            }
            $players_updated = false;
            for($i = 0; $i < count($cache['players']); $i++){
                if($cache['players'][$i]['date'] >= $date){
                    $cache['players'][$i]['players'] += $new_players;
                    $players_updated = true;
                }
            }
            if(!$players_updated){
                array_push($cache['players'], [
                    'date' => $date,
                    'players' => $cache['players'][count($cache['players'])-1]['players'] + $new_players
                ]);
            }

            $matches_updated = false;
            for($i = 0; $i < count($cache['matches']); $i++){
                if($cache['matches'][$i]['date'] >= $date){
                    $cache['matches'][$i]['matches'] += 1;
                    $matches_updated = true;
                }
            }
            if(!$matches_updated){
                array_push($cache['matches'], [
                    'date' => $date,
                    'matches' => $cache['matches'][count($cache['matches'])-1]['matches'] + 1
                ]);
            }

            $export = "<?php\n\nreturn " . var_export($cache, true) . ";\n";
            Storage::disk('public')->put('charts/statistics.php', $export);
        }


    private static function update_player_chart($player, $point_gain, $date){
        $file = 'charts/' . $player->uri . '.php';
        $cache = [];
        if(Storage::disk('public')->exists($file)){
            $cache = include(Storage::disk('public')->path($file));
            $cache = json_decode(json_encode($cache), true);

            $points_updated = false;
            for($i = 0; $i < count($cache['points']); $i++){
                if($cache['points'][$i]['date'] >= $date){
                   $cache['points'][$i]['points'] += $point_gain;
                    $points_updated = true;
                }
            }
            if(!$points_updated){
                array_push($cache['points'], [
                    'date' => $date,
                    'points' => $cache['points'][count($cache['points']) - 1]['points'] + $point_gain
                ]);
            }

            $rank_updated = false;
            for($i = 0; $i < count($cache['rankings']); $i++){
                if($cache['rankings'][$i]['date'] >= $date){
                    $cache['rankings'][$i]['rank'] = $player->rank;
                    $rank_updated = true;
                }
            }
            if(!$rank_updated){
                array_push($cache['rankings'], [
                    'date' => $date,
                    'rank' => $player->rank
                ]);
            }
            $cache['maxRank'] = Player::all()->count();
        }
        else{
            $rank = Player::where('points','<',$point_gain)->first()->rank;
            $cache = [
                'points' => [[
                    'points' => $point_gain,
                    'date' => $date
                ]],
                'rankings' => [
                    [
                    'rank' => $rank,
                    'date' => $date
                ]],
                'maxRank' => Player::all()->count()
            ];
        }
        $export = "<?php\n\nreturn " . var_export($cache, true) . ";\n";
        Storage::disk('public')->put($file, $export);   
    }


}

