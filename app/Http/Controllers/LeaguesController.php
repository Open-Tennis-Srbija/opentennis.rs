<?php

namespace App\Http\Controllers;

use App\Models\Court;
use App\Models\League;
use App\Models\TennisMatch;
use DateTime;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;


class LeaguesController extends Controller
{
    public static function getLeagues(){
        return League::where('id', '>', 1)->orderByRaw('LOWER(name)')->get();
    }

    public static function returnLeague($league_uri){
        $league = League::where('uri', $league_uri)->first();

        return [
            'name' => $league->name,
            'id' => $league->id,
            'county' => $league->county,
            'uri' => $league->uri,
            'points' => $league->getPoints(),
            'date_start'=>$league->date_begin,
            'date_end' => $league->date_end,
            'player_number' => $league->getPlayerCount(),
            'match_number' => $league->getMatchCount(),
            'link' => $league->link,
            'rank' => $league->getRank(),
            'players' => $league->getPlayers(),
            'matches' => $league->getMatches(),
            'court' => Court::find($league->court_id),
        ];

    }

    public function updateLeague(Request $request){
        $data = $request->validate([
            'id' => 'required',
            'name' => 'required',
            'location' => 'required',
            'date_begin' => 'required',
            'date_end' => 'required',
            'uri' => 'max:50|regex:/^[a-zA-Z0-9-]+$/',
            'link' => '',
            'court' => '',
        ], [
            'name.required' => 'Ime je obavezno.',
            'county.required' => 'Opština je obavezna.',
            'date_begin.required' => 'Datum početka je obavezan.',
            'date_end.required' => 'Datum završetka je obavezan.',
        ]);

        $league = League::find($data['id']);
        if($league){
            $league->name = $data['name'];
            $league->county = $data['location'];
            $date_begin = new DateTime($data['date_begin']);
            $league->date_begin = $date_begin->format('Y-m-d');
            $date_end = new DateTime($data['date_end']);
            $league->date_end = $date_end->format('Y-m-d');
            $league->link = $data['link'] ?? '';

            if($data['uri'] != $league->uri)
            {
                $league->uri = $data['uri'];
            }
            else{
                // Generate a new URI if not provided
                $uri = str_replace(' ', '-', strtolower($data['name']));
                $uri = str_replace('--', '-', $uri);
                $uri = Helper::formatName($uri);
                $league->uri = $uri;
            }

            if(!is_numeric($data['court']['id'])){
                $court = new Court();
                $court->name = $data['court']['name'];
                $court->link = '';
                $court->save();
                
                $league->court_id = $court->id;
            } else {
                $league->court_id = $data['court']['id'];
            }
            $league->save();
            $uri = '/'.$league->uri;
            return redirect($uri);
        }
    }

    public static function getLeagueForEdit($uri){
		return Inertia::render('Auth/EditLeague', [
			'uri' => $uri,
            'courts' => CourtsController::getCourts(),
		]);
    }

    public static function deleteLeague(Request $request){
        $league = League::find($request->input('id'));
        if(!$league){
            return response()->json(['error' => 'League not found'], 404);
        }

        // Delete the league's cache file
        $cacheFilePath = storage_path('app/public/leagues/'.$league->uri.'.json');
        if(file_exists($cacheFilePath)){
            unlink($cacheFilePath);
        }

        $matches = TennisMatch::where('league_id', $league->id)->get();

        if($matches->count() > 0){
            // Delete all matches associated with the league
            foreach($matches as $match){
                $match->league_id = 1;
                $match->save();
            }
        }

        // Delete the league
        $league->delete();

        return redirect('/lige-turniri');
    }


    public static function returnForEdit($league_uri){
        $league = League::where('uri', $league_uri)->first();
        return [
            'id' => $league->id,
            'name' => $league->name,
            'county' => $league->county,
            'date_begin' => $league->date_begin,
            'uri' => $league->uri,
            'date_end' => $league->date_end,
            'link' => $league->link,
            'court' => Court::find($league->court_id),
        ];
    }
    public static function returnCachedLeague($uri){
    if(file_exists(storage_path('app/public/leagues/'.$uri.'.json'))){
                $cache = json_decode(file_get_contents(storage_path('app/public/leagues/'.$uri.'.json')), true);
            return $cache;
            }
    else return redirect('/');
    }

    // public static function getLeaguesForList(){
    //     $today = date('Y-m-d');
    //     $leagues = League::where('id', '>', 1)
    //         // Inactive at the bottom
    //         ->orderByRaw("date_end < ? ASC", [$today])
    //         // For active leagues, sort by duration (longest first)
    //         ->orderByRaw("CASE WHEN date_end >= ? THEN DATEDIFF(date_end, date_begin) END DESC", [$today])
    //         // For inactive leagues, you can sort by date_end descending (most recently ended first)
    //         ->orderByRaw("CASE WHEN date_end < ? THEN date_end END DESC", [$today])
    //         ->get();

    //     $response = [];

    //     foreach($leagues as $league){
    //         array_push($response,[
    //             'name'=> $league->name,
    //             'uri'=> $league->uri,
    //             'date_start' => $league->date_begin,
    //             'date_end' => $league->date_end,
    //             'match_number' => $league->getMatchCount(),
    //             'county' => $league->county,
    //             'player_number' => $league->getPlayerCount(),
    //             'points' => $league->getPoints(),
    //             'link' => $league->link
    //         ]);
    //     }

    //     return $response;
    // }
public static function getLeaguesForList(){
    $today = date('Y-m-d');
    $leagues = League::where('id', '>', 1)->get();

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

    // Sort by points only (highest first)
    usort($response, function($a, $b) {
        return $b['points'] <=> $a['points'];
    });

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
        if(!file_exists(storage_path('app/public/leagues/'.$league_uri.'.json'))){
            $league = League::where('uri',$league_uri)->first();
            $cache = LeaguesController::returnLeague($league);
            Storage::disk('public')->put('/leagues/'.$league_uri.'.json',json_encode($cache));
        }
        else{
            $cache = json_decode(file_get_contents(storage_path('app/public/leagues/'.$league_uri.'.json')), true);
        }

        
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


    public static function store(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'location' => 'required',
            'date_begin' => 'required',
            'date_end' => 'required',
            'link' => '',
            'court' => '',
        ], [
            'name.required' => 'Ime je obavezno.',
            'county.required' => 'Opština je obavezna.',
            'date_begin.required' => 'Datum početka je obavezan.',
            'date_end.required' => 'Datum završetka je obavezan.',
        ]);

        $league = new League();
        $league->name = $data['name'];
        $league->county = $data['location'];
        $date_begin = new DateTime($data['date_begin']);
        $league->date_begin = $date_begin->format('Y-m-d');
        $date_end = new DateTime($data['date_end']);
        $league->date_end = $date_end->format('Y-m-d');
        $league->link = $data['link'] ?? '';
        
        $league->uri = Str::slug($data['name'], '-');

        if($data['court'] && !is_numeric($data['court']['id'])){
            $court = new Court();
            $court->name = $data['court']['name'];
            $court->link = '';
            $court->uri = Str::slug($data['court']['name']);
            $court->county = $data['location'];
            $court->save();
            
            $league->court_id = $court->id;
        } else {
            if(isset($data['court']['id']) && is_numeric($data['court']['id']))
                $league->court_id = $data['court']['id'];
            else
                $league->court_id = 1; // No court selected
        }

        $league->save();

        return redirect('/'. $league->uri);
    }

}
