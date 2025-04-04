<?php

use App\Http\Controllers\PlayerController;
use App\Models\Player;
use App\Models\TenisMatch;

Class Caching{

    public static function update_cache_from_match($match){
        $winner = Player::find($match->winner_id);
        $loser = Player::find($match->loser_id);

        $winner->update([
            'wins' => $winner->wins + 1,
            'matches' => $winner->matches + 1,
        ]);

        $loser->update([
            'loses' => $loser->loses + 1,
            'matches' => $loser->matches + 1,
        ]);
    }




    public static function update_player_cache($player,$data,$opponent,$match,$match_number,$points){

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

        $is_new = true;
        $new_uri = null;

        if($is_winning){
            foreach($matchups['wins'] as $win){
                if($win['uri'] == $opponent->uri){
                    $win['number']++;
                    $is_new = false;
                }

                if($is_new){
                    array_push($matchups['wins'], [
                        'name' => $opponent->first_name . ' ' . $opponent->last_name,
                        'uri' => $opponent->uri,
                        'number' => 1,
                    ]);
                    $new_uri = $opponent->uri;
                }
            }
        }
        if(!$is_winning){
            foreach($matchups['loses'] as $loss){
                if($loss['uri'] == $opponent->uri){
                    $loss['number']++;
                    $is_new = false;
                }
            }
            if($is_new){
                array_push($matchups['loses'], [
                    'name' => $opponent->first_name . ' ' . $opponent->last_name,
                    'uri' => $opponent->uri,
                    'number' => 1,
                ]);
                $new_uri = $opponent->uri;
            }
        }

        if(isset($new_uri)){
            foreach($matchups['notPlayedWith'] as $key => $notPlayed){
                if($notPlayed['uri'] == $new_uri){
                    unset($matchups['notPlayedWith'][$key]);
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
                'location' => $match->location,
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
                'location' => $match->location,
                'court' => $match->getCourt(),
                'league' => $match->getLeague(),

            ]);
            usort($cache['data']['loses'], function($a, $b) {
                return $b['number'] <=> $a['number'];
            });
        }

        // update locations

        $locations = $cache['data']['locations'];

        $is_new = true;

        foreach($locations['courts'] as $court){
            if($court['name'] == $match->getCourt()['name'] && $match->getCourt()['name'] != ''){
                $court['count']++;
                $is_new = false;
            }
        }
        if($is_new){
            array_push($locations['courts'], [
                'name' => $match->getCourt()['name'],
                'link' => $match->getCourt()['link'],
                'count' => 1,
            ]);
        }
        $is_new = true;
        foreach($locations['locations'] as $loc){
            if($loc['name'] == $match->location){
                $loc['count']++;
                $is_new = false;
            }
        }
        if($is_new){
            array_push($locations['locations'], [
                'name' => $match->location,
                'count' => 1,
            ]);
        }

        $is_new = true;
        foreach($locations['leagues'] as $league){
            if($league['name'] == $match->getLeague()['name'] && $match->getLeague()['name'] != ''){
                $league['count']++;
                $is_new = false;
            }
        }
        if($is_new){
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
        $cache['data']['locations'] = $locations;


        // update charts

        $chart_points = $cache['charts']['points'];

        foreach($chart_points as $point_entry){
            if(strtotime($point_entry['date']) >= strtotime($match->match_date)){
                if($is_winning){
                    $point_entry['points'] = $point_entry['points'] + $points['winner'];
                }
                else{
                    $point_entry['points'] = $point_entry['points'] + $points['loser'];
                }
            }
        }
        $cache['charts']['points'] = $chart_points;

        $cache['charts']['rankings'][count($cache['charts']['rankings']) - 1]['rank'] = $data['pos'];



        Storage::disk('public')->put('/players/'.$player->uri.'.json', json_encode($cache));

    }

}
