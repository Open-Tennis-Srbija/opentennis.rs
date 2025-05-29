<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\League;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LeaguesController extends Controller
{
    //
    public static function getLeagues(){
        return League::where('id', '>', 1)->orderByRaw('LOWER(name)')->get();
    }

    public static function returnLeague($league){
        return [
            'name' => $league->name,
            'county' => $league->county,
            'points' => $league->getPoints(),
            'date_start'=>$league->date_begin,
            'date_end' => $league->date_end,
            'player_number' => $league->getPlayerCount(),
            'match_number' => $league->getMatchCount(),
            'link' => $league->link,
            'players' => $league->getPlayers(),
            'matches' => $league->getMatches(),
            'court' => []
        ];

    }
    public static function returnCachedLeague($uri){
    if(file_exists(storage_path('app/public/leagues/'.$uri.'.json'))){
                $cache = json_decode(file_get_contents(storage_path('app/public/leagues/'.$uri.'.json')), true);
            return $cache;
            }
    else return redirect('/');
    }

    public static function getLeaguesForList(){
        $leagues = League::where('id', '>', 1)->orderBy('date_begin','desc')->get();

        $response = [];

        foreach($leagues as $league){
            array_push($response,[
                'name'=> $league->name,
                'uri'=> $league->uri,
                'date_start' => $league->date_begin,
                'date_end' => $league->date_end,
                'match_number' => $league->getMatchCount(),
                'county' => $league->county,
                'player_number' => $league->getPlayerCount(),
                'points' => $league->getPoints(),
                'link' => $league->link
            ]);
        }

        return $response;
    }

    public static function update_league_list_cache($league_uri,$match_number,$new_players,$gains){
        $cache = json_decode(file_get_contents(storage_path('app/public/leagues.json')),true);

        foreach($cache as $league){
            if($league['uri'] == $league_uri){
                $league['points'] += $gains;
                $league['match_number'] += 1;
                $league['player_number'] += $new_players;
            }
        }

        Storage::disk('public')->put('leagues.json', json_encode($cache));
    }

    public static function update_league_cache_from_match($league_uri,$match,$match_number,$gains,$winner_data, $loser_data){
        $cache = json_decode(file_get_contents(storage_path('app/public/leagues/'.$league_uri.'.json')), true);
        
        $cache['points'] += $gains;
        $cache['match_number']+= 1;


        array_push($cache['matches'],[
            'id' => $match->id,
            'winner_points' => $winner_data['gains'],
            'loser_points' => $loser_data['gains'],
            'winner_uri' => $winner_data['uri'],
            'loser_uri' => $loser_data['uri'],
            'winner' => $winner_data['name'],
            'loser' => $loser_data['name'],
            'set_score' => $match->set_score,
            'number' => $match_number,
            'game_score' => $match->game_score,
            'date' => $match->match_date,
            'location' => $match->match_location,
            'court' => $match->getCourt(),
            'league' => $match->getLeague(),
        ]);


        usort($cache['matches'], function($a, $b) {
                return $b['number'] <=> $a['number'];
            });

        $players_exist = [
            'loser'=> false,
            'winner' => false
        ];

        foreach($cache['players'] as $player){
            if($player['uri'] == $winner_data['uri']) $players_exist['winner'] = true;
            if($player['uri'] == $loser_data['uri']) $players_exist['loser'] = true;
        }

        if(!$players_exist['winner']){
            $cache['player_number'] +=1;

            array_push($cache['players'],[
                'name' => $winner_data['name'],
                'uri' => $winner_data['uri']
            ]);
        }

        if(!$players_exist['loser']){
            $cache['player_number'] +=1;

            array_push($cache['players'],[
                'name' => $loser_data['name'],
                'uri' => $loser_data['uri']
            ]);

        }
        usort($cache['players'], function($a, $b) {
            return strcmp($a['name'], $b['name']);
        });

        
        Storage::disk('public')->put('/leagues/'.$league_uri.'.json', json_encode($cache));

    }

}
