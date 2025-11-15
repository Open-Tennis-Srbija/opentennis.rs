<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTenisMatchRequest;
use App\Mail\AddMatchNotification;
use App\Models\Player;
use App\Models\TenisMatch;
use App\Models\TennisMatch;
use App\Models\Court;
use App\Models\League;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use NikolaAlgoV1;
use App\Http\Controllers\PlayerController;
use App\Mail\DoubleMatchNotification;
use DateTime;
use Helpers;
use Carbon\Carbon;
use Illuminate\Support\Str;

class TenisMatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function editMatch($number){
        
        $match = TennisMatch::where('number', $number)->first();

        $winner_count = $match->winners()->count();
        $loser_count = $match->losers()->count();

        $isDoubles = ($winner_count == 2 && $loser_count == 2);

        if($isDoubles){
            return Inertia::render('Auth/admin/matches/EditDouble', [
                'players' => PlayerController::getPlayersForDropdown(),
                'match' => TenisMatchController::getDoubleForEdit($number),
                'courts' => CourtsController::getCourts(),
                'leagues' => LeaguesController::getLeagues(),
            ]);
        }
        else{
            return Inertia::render('Auth/admin/matches/EditMatch', [
                'players' => PlayerController::getPlayersForDropdown(),
                'match' => TenisMatchController::getMatchForEdit($number),
                'courts' => CourtsController::getCourts(),
                'leagues' => LeaguesController::getLeagues(),
            ]);
        }

    }

    public function getMatchByUri($uri){
        // URI formats:
        // Singles: /winnerfirstname-winnerlastname-loserfirstname-loserlastname-match-number (5 parts)
        // Doubles: /winner1firstname-winner1lastname-winner2firstname-winner2lastname-loser1firstname-loser1lastname-loser2firstname-loser2lastname-match-number (9 parts)
        
        $parts = explode('-', $uri);
        $partsCount = count($parts);
        
        // Extract match number (always the last part)
        $matchNumber = intval(end($parts));
        
        // Find the match with the given number
        $match = TennisMatch::where('number', $matchNumber)
            ->with(['winners', 'losers'])
            ->first();
            
        if (!$match) {
            return abort(404);
        }

        $winnersCount = $match->winners()->count();
        $losersCount = $match->losers()->count();

        if ($partsCount == 5 && $winnersCount == 1 && $losersCount == 1) {
            // Singles match
            return $this->validateAndRenderMatch($match, $parts, $matchNumber, 'singles');
        } elseif ($partsCount == 9 && $winnersCount == 2 && $losersCount == 2) {
            // Doubles match
            return $this->validateAndRenderMatch($match, $parts, $matchNumber, 'doubles');
        }
        
        return abort(404);
    }

    private function validateAndRenderMatch($match, $parts, $matchNumber, $type) {
        if ($type === 'singles') {
            // Singles validation using player URIs
            $expectedWinnerUri = $parts[0] . '-' . $parts[1];
            $expectedLoserUri = $parts[2] . '-' . $parts[3];
            
            $winner = $match->winners()->first();
            $loser = $match->losers()->first();
            
            // Remove number suffix from URIs for comparison (e.g., "player-name0" -> "player-name")
            $winnerUriBase = preg_replace('/\d+$/', '', $winner->uri);
            $loserUriBase = preg_replace('/\d+$/', '', $loser->uri);
            
            // Verify URIs match
            if ($winnerUriBase == $expectedWinnerUri && $loserUriBase == $expectedLoserUri) {
                return Inertia::render('matches/Match', [
                    'match_number' => $matchNumber
                ]);
            }
        } else {
            // Doubles validation using player URIs
            $expectedWinnerUris = [
                $parts[0] . '-' . $parts[1],
                $parts[2] . '-' . $parts[3]
            ];
            $expectedLoserUris = [
                $parts[4] . '-' . $parts[5],
                $parts[6] . '-' . $parts[7]
            ];
            
            $winners = $match->winners()->get();
            $losers = $match->losers()->get();
            
            // Get actual player URIs without number suffixes
            $actualWinnerUris = $winners->map(function($winner) {
                return preg_replace('/\d+$/', '', $winner->uri);
            })->toArray();
            $actualLoserUris = $losers->map(function($loser) {
                return preg_replace('/\d+$/', '', $loser->uri);
            })->toArray();
            
            // Check if all expected URIs exist in actual URIs (order doesn't matter)
            $winnersMatch = empty(array_diff($expectedWinnerUris, $actualWinnerUris));
            $losersMatch = empty(array_diff($expectedLoserUris, $actualLoserUris));
            
            if ($winnersMatch && $losersMatch) {
                return Inertia::render('matches/Match', [
                    'match_number' => $matchNumber
                ]);
            }
        }
        
        return redirect('/');
    }

    public function batchImport(){
        return Inertia::render('Auth/admin/imports/BatchMatches', [
            'players' => PlayerController::getPlayersForDropdown(),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
        ]);
    }

    public function batchDoubles(){
        return Inertia::render('Auth/admin/imports/BatchDoubles', [
            'players' => PlayerController::getPlayersForDropdown(),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
        ]);
    }
    public function importMatches(Request $request){
        $data = $request->validate([
            'league' => '',
            'court' => '',
            'type' => '',
            'csvData' => 'required'
        ],[
            'csvData.required' => 'CSV fajl je obavezan.'
        ]);

        $league_id = null;
        $court_id = null;

        if(isset($data['league'])){
            if(!is_numeric($data['league']['id'])){
                $league = new League();

                $league->name = $data['league']['name'];
                $league->link = '';
                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;
                
                if(isset($data['type'])){
                    if($data['type'] == 'Liga'){
                        $league->type = 'league';
                    }
                    else{
                        $league->type = 'tournament';
                    }
                }
                else
                    $league->type = 'league';
                

                $league->save();
                $date = Carbon::now();
                $league->date_begin = $date->format('Y-m-d');
                $league->date_end = $date->addDay()->format('Y-m-d');
                $league_id = $league->id;
            }
            else{
                $league_id = $data['league']['id'];
            }
        }

        if(isset($data['court'])){
            if(!is_numeric($data['court']['id'])){
                $court = new Court();

                $court->name = $data['court']['name'];
                $court->link = '';
                $court->county = $data['location'];

                $court->save();
                $court_id = $court->id;
            }
            else{
                $court_id = $data['court']['id'];
            }
        }

        $csvString = $data['csvData']; // your CSV text

        $handle = fopen('php://memory', 'r+');
        fwrite($handle, $csvString);
        rewind($handle);

        $header = null;
        while (($row = fgetcsv($handle)) !== false) {
            if (!$header) {
                $header = $row;
                continue;
            }
            $rowData = array_combine($header, $row);

            $league_name = $rowData['Ime lige ili turnira'];
            $court_name = $rowData['teren ili klub'];
            $county = $rowData['opština'];
            $winner_name = $rowData['pobednik (ime i prezime)'];
            $loser_name = $rowData['gubitnik (ime i prezime)'];
            $set_score = $rowData['rezultat u setovima (2:0)'];
            $game_score = $rowData['rezultat u gemovima (6:3,4:2)'];
            $date = new DateTime($rowData['datum meča (dd mm gggg)']);

            if(!isset($league_id)){
                $league = League::where('name', $league_name)->first();
            }
            else{
                $league = League::find($league_id);
            }

            if(!$league){
                $league = new League();
                $league->name = $league_name;

                $league->link = '';

                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;

                $league->county = $county;

                $league->save();
            }

            if(!isset($court_id)){
                $court = Court::where('name', $court_name)->first();
            }
            else{
                $court = Court::find($court_id);
            }

            if(!$court){
                $court = new Court();
                $court->name = $court_name;

                $court->link = '';
                $court->uri = Str::slug($court->name);
                $court->county = $county;

                $court->save();
            }



            $existing = TennisMatch::where('league_id', $league->id)->get();
            $existing_match = null;

            foreach($existing as $match){
                $match_winner_name = $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name;
                $match_loser_name = $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name;

                if($match_winner_name == $winner_name
                    && $match_loser_name == $loser_name
                    && $match->set_score == $set_score
                    && $match->game_score == $game_score){
                        $existing_match = $match;
                    }
            }

            if(isset($existing_match)){
                $existing_match->date = $date;
                $existing_match->save();
            }
            else{
                $match = new TennisMatch();
                $match->court_id = $court->id;
                $match->league_id = $league->id;
                $match->date = $date->format('Y-m-d');
                $match->set_score = $set_score;
                $match->game_score = $game_score;
                $match->county = $league->county;


                $match->winner_point_gain = 0;
                $match->loser_point_gain = 0;
                $match->save();

                // Find the correct position based on date order
                $laterMatches = TennisMatch::where('date', '>', $match->date)
                    ->orWhere(function($query) use ($match) {
                        $query->where('date', '=', $match->date)
                              ->where('created_at', '>', $match->created_at);
                    })
                    ->orderBy('number', 'asc')
                    ->get();

                if ($laterMatches->isEmpty()) {
                    // This is the latest match, assign next number
                    $maxNumber = TennisMatch::max('number') ?? 0;
                    $match->number = $maxNumber + 1;
                } else {
                    // Insert at the position of the first later match
                    $insertPosition = $laterMatches->first()->number;
                    $match->number = $insertPosition;
                    
                    // Increment all later matches by 1
                    TennisMatch::where('number', '>=', $insertPosition)
                        ->where('id', '!=', $match->id)
                        ->increment('number');
                }


                if(count(explode(' ',$winner_name)) > 1){
                    $winner_first_name = explode(' ',$winner_name)[0];
                    $winner_last_name = explode(' ',$winner_name)[1];
                }
                else{
                    $winner_first_name = $winner_name;
                    $winner_last_name = ' ';
                }

                if(count(explode(' ', $loser_name))> 1){
                    $loser_first_name = explode(' ',$loser_name)[0];
                    $loser_last_name = explode(' ',$loser_name)[1];
                }
                else{
                    $loser_first_name = $loser_name;
                    $loser_last_name = ' ';
                }

                $new_winner = $this->check_existing_player($match,$winner_first_name, $winner_last_name, 'winner');
                $new_loser = $this->check_existing_player($match,$loser_first_name, $loser_last_name, 'loser');

                $new_players = $new_winner + $new_loser;

                $winner = $match->winners()->first();
                $loser = $match->losers()->first();
                $match->save();

                    [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
                $match->winner_point_gain = $winner_gains;
                $match->loser_point_gain = $loser_gains;

                $match->save();

                $winner->points += $winner_gains;
                $loser->points += $loser_gains;
                $winner->save();
                $loser->save();

                Helpers::UpdateRanks();
                Helpers::UpdatePlayerCharts($winner, $loser, $match);
                Helpers::UpdateStatsChart($new_players, $winner_gains + $loser_gains, $match->date);

        }
    }
fclose($handle);

    }

    public function importDoubles(Request $request){
        $data = $request->validate([
            'league' => '',
            'court' => '',
            'csvData' => 'required'
        ],[
            'csvData.required' => 'CSV fajl je obavezan.'
        ]);

        $league_id = null;
        $court_id = null;

        if(isset($data['league'])){
            if(!is_numeric($data['league']['id'])){
                $league = new League();

                $league->name = $data['league']['name'];
                $league->link = '';
                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;

                if(isset($data['type'])){
                    if($data['type'] == 'Liga'){
                        $league->type = 'league';
                    }
                    else{
                        $league->type = 'tournament';
                    }
                }
                else
                    $league->type = 'league';

                $league->save();
                $date = Carbon::now();
                $league->date_begin = $date->format('Y-m-d');
                $league->date_end = $date->addDay()->format('Y-m-d');
                $league_id = $league->id;
            }
            else{
                $league_id = $data['league']['id'];
            }
        }

        if(isset($data['court'])){
            if(!is_numeric($data['court']['id'])){
                $court = new Court();

                $court->name = $data['court']['name'];
                $court->link = '';
                $court->county = $data['location'];

                $court->save();
                $court_id = $court->id;
            }
            else{
                $court_id = $data['court']['id'];
            }
        }

        $csvString = $data['csvData']; // your CSV text

        $handle = fopen('php://memory', 'r+');
        fwrite($handle, $csvString);
        rewind($handle);

        $header = null;
        while (($row = fgetcsv($handle)) !== false) {
            if (!$header) {
                $header = $row;
                continue;
            }
            $rowData = array_combine($header, $row);

            $league_name = $rowData['Ime lige ili turnira'];
            $court_name = $rowData['teren ili klub'];
            $county = $rowData['opština'];
            $winner1_name = $rowData['pobednik 1 (ime i prezime)'];
            $winner2_name = $rowData['pobednik 2 (ime i prezime)'];
            $loser1_name = $rowData['gubitnik 1 (ime i prezime)'];
            $loser2_name = $rowData['gubitnik 2 (ime i prezime)'];
            $set_score = $rowData['rezultat u setovima (2:0)'];
            $game_score = $rowData['rezultat u gemovima (6:3,4:2)'];
            $date = new DateTime($rowData['datum meča (dd mm gggg)']);

            if(!isset($league_id)){
                $league = League::where('name', $league_name)->first();
            }
            else{
                $league = League::find($league_id);
            }

            if(!$league){
                $league = new League();
                $league->name = $league_name;

                $league->link = '';

                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;

                $league->county = $county;

                $league->save();
            }

            if(!isset($court_id)){
                $court = Court::where('name', $court_name)->first();
            }
            else{
                $court = Court::find($court_id);
            }

            if(!$court){
                $court = new Court();
                $court->name = $court_name;

                $court->link = '';
                $court->uri = Str::slug($court->name);
                $court->county = $county;

                $court->save();
            }



            $existing = TennisMatch::where('league_id', $league->id)->get();
            $existing_match = null;

            foreach($existing as $match){
                
                $match_winner1_name = $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name;
                $match_winner2_name = $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->first_name . ' ' . $match->winners()->skip(1)->first()->last_name : null;
                $match_loser1_name = $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name;
                $match_loser2_name = $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->first_name . ' ' . $match->losers()->skip(1)->first()->last_name : null;

                if($match_winner1_name == $winner1_name
                    && $match_winner2_name == $winner2_name
                    && $match_loser1_name == $loser1_name
                    && $match_loser2_name == $loser2_name
                    && $match->set_score == $set_score
                    && $match->game_score == $game_score){
                        $existing_match = $match;
                    }
            }

            if(isset($existing_match)){
                $existing_match->date = $date;
                $existing_match->save();
            }
            else{
                $match = new TennisMatch();
                $match->court_id = $court->id;
                $match->league_id = $league->id;
                $match->date = $date->format('Y-m-d');
                $match->set_score = $set_score;
                $match->game_score = $game_score;
                $match->county = $league->county;


                $match->winner_point_gain = 0;
                $match->loser_point_gain = 0;
                $match->save();

                // Find the correct position based on date order
                $laterMatches = TennisMatch::where('date', '>', $match->date)
                    ->orWhere(function($query) use ($match) {
                        $query->where('date', '=', $match->date)
                              ->where('created_at', '>', $match->created_at);
                    })
                    ->orderBy('number', 'asc')
                    ->get();

                if ($laterMatches->isEmpty()) {
                    // This is the latest match, assign next number
                    $maxNumber = TennisMatch::max('number') ?? 0;
                    $match->number = $maxNumber + 1;
                } else {
                    // Insert at the position of the first later match
                    $insertPosition = $laterMatches->first()->number;
                    $match->number = $insertPosition;
                    
                    // Increment all later matches by 1
                    TennisMatch::where('number', '>=', $insertPosition)
                        ->where('id', '!=', $match->id)
                        ->increment('number');
                }


                if(count(explode(' ',$winner1_name)) > 1){
                    $winner1_first_name = explode(' ',$winner1_name)[0];
                    $winner1_last_name = explode(' ',$winner1_name)[1];
                }
                else{
                    $winner1_first_name = $winner1_name;
                    $winner1_last_name = 'Anonymous';
                }

                if(count(explode(' ',$winner2_name)) > 1){
                    $winner2_first_name = explode(' ',$winner2_name)[0];
                    $winner2_last_name = explode(' ',$winner2_name)[1];
                }
                else{
                    $winner2_first_name = $winner2_name;
                    $winner2_last_name = 'Anonymous';
                }
                if(count(explode(' ', $loser1_name)) > 1){
                    $loser1_first_name = explode(' ',$loser1_name)[0];
                    $loser1_last_name = explode(' ',$loser1_name)[1];
                }
                else{
                    $loser1_first_name = $loser1_name;
                    $loser1_last_name = 'Anonymous';
                }

                if(count(explode(' ', $loser2_name)) > 1){
                    $loser2_first_name = explode(' ',$loser2_name)[0];
                    $loser2_last_name = explode(' ',$loser2_name)[1];
                }
                else{
                    $loser2_first_name = $loser2_name;
                    $loser2_last_name = 'Anonymous';
                }
                $new_winner1 = $this->check_existing_player($match,$winner1_first_name, $winner1_last_name, 'winner');
                $new_winner2 = $this->check_existing_player($match,$winner2_first_name, $winner2_last_name, 'winner');
                $new_loser1 = $this->check_existing_player($match,$loser1_first_name, $loser1_last_name, 'loser');
                $new_loser2 = $this->check_existing_player($match,$loser2_first_name, $loser2_last_name, 'loser');

                $new_players = $new_winner1 + $new_winner2 + $new_loser1 + $new_loser2;

                $winner1 = $match->winners()->first();
                $winner2 = $match->winners()->skip(1)->first();
                $loser1 = $match->losers()->first();
                $loser2 = $match->losers()->skip(1)->first();

                $match->save();

                [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
                $match->winner_point_gain = $winner_gains;
                $match->loser_point_gain = $loser_gains;

                $match->save();

                $winner1->points += $winner_gains / 2;
                $winner2->points += $winner_gains / 2;
                $loser1->points += $loser_gains / 2;
                $loser2->points += $loser_gains / 2;
                
                $winner1->save();
                $winner2->save();
                $loser1->save();
                $loser2->save();

                Helpers::UpdateRanks();
                Helpers::UpdatePlayerChartsDouble($winner1, $loser1, $match);
                Helpers::UpdatePlayerChartsDouble($winner2, $loser2, $match);
                Helpers::UpdateStatsChart($new_players, $winner_gains + $loser_gains, $match->date);

        }
    }
        fclose($handle);

    }
    private function check_for_existing($id,$first_name,$last_name){
        if(is_numeric($id)){
            $player = Player::find($id);
            if($player){
                return [$player, false];
            }
        }
        else{
            $player = new Player();
            $player->first_name = $first_name;
            $player->last_name = $last_name;
            $uri_firistname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
           
            $index = 0;
            $uri = strtolower($uri_firistname) . '-' . strtolower($uri_lastname);
            
            $check = false;
            while(!$check){
                if(Player::where('uri', $uri)->exists()){
                    $uri = strtolower($uri_firistname) . '-' . strtolower($uri_lastname) . $index;
                    $index++;
                }
                else{
                    $check = true;
                }
            }
            $player->uri = $uri;
            $player->save();
            return [$player, true];
        }

    }

    private function check_existing_player($match,$first_name,$last_name,$mode){
        $player = Player::where('first_name', $first_name)->where('last_name', $last_name)->first();
        $new = 0;

        if(!$player){
            $player = new Player();
            $player->first_name = $first_name;
            $player->last_name = $last_name;

            $uri_firistname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);

            $player->uri = strtolower($uri_firistname) . '-' . strtolower($uri_lastname);

            $player->save();

            $new = 1;
        }


        $match->players()->attach($player->id,['team'=>$mode]);
        return $new;

    }

    /**
     * Generate URI for a match based on player names and match number
     */
    public static function generateMatchUri($matchNumber) {
        $match = TennisMatch::where('number', $matchNumber)
            ->with(['winners', 'losers'])
            ->first();
            
        if (!$match) {
            return null;
        }
        
        $winner1 = $match->winners()->first();
        $loser1 = $match->losers()->first();
        $winner2 = $match->winners()->skip(1)->first();
        $loser2 = $match->losers()->skip(1)->first();
        
        // Format names for URI (lowercase, replace spaces with dashes)
        $formatName = function($firstName, $lastName) {
            return strtolower(Helper::formatName($firstName)) . '-' . strtolower(Helper::formatName($lastName));
        };
        
        if ($winner2 && $loser2) {
            // Doubles match
            return $formatName($winner1->first_name, $winner1->last_name) . '-' .
                   $formatName($winner2->first_name, $winner2->last_name) . '-' .
                   $formatName($loser1->first_name, $loser1->last_name) . '-' .
                   $formatName($loser2->first_name, $loser2->last_name) . '-' .
                   $matchNumber;
        } else {
            // Singles match
            return $formatName($winner1->first_name, $winner1->last_name) . '-' .
                   $formatName($loser1->first_name, $loser1->last_name) . '-' .
                   $matchNumber;
        }
    }

    private function getMatchForEdit($number){
        $match = TennisMatch::where('number', $number)->first();

        return [
            'id' => $match->id,
            'winner' => [
                'id' => $match->winners()->first()->id,
                'name' => Player::find($match->winners()->first()->id)->first_name . ' ' . Player::find($match->winners()->first()->id)->last_name,
            ],
            'loser' => [
                'id' => $match->losers()->first()->id,
                'name' => Player::find($match->losers()->first()->id)->first_name . ' ' . Player::find($match->losers()->first()->id)->last_name,
            ],
            'set_score' => $match->set_score,
            'game_score' => $match->game_score,
            'date' => $match->date,
            'location' => $match->county,
            'league' => League::find($match->league_id),
            'court' => Court::find($match->court_id),
        ];
    }

    private function getDoubleForEdit($number){
        $match = TennisMatch::where('number', $number)->first();

        return [
            'id' => $match->id,
            'winner1' => [
                'id' => $match->winners()->first()->id,
                'name' => Player::find($match->winners()->first()->id)->first_name . ' ' . Player::find($match->winners()->first()->id)->last_name,
            ],
            'winner2' => [
                'id' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->id : null,
                'name' => $match->winners()->skip(1)->first() ? Player::find($match->winners()->skip(1)->first()->id)->first_name . ' ' . Player::find($match->winners()->skip(1)->first()->id)->last_name : null,
            ],
            'loser1' => [
                'id' => $match->losers()->first()->id,
                'name' => Player::find($match->losers()->first()->id)->first_name . ' ' . Player::find($match->losers()->first()->id)->last_name,
            ],
            'loser2' => [
                'id' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->id : null,
                'name' => $match->losers()->skip(1)->first() ? Player::find($match->losers()->skip(1)->first()->id)->first_name . ' ' . Player::find($match->losers()->skip(1)->first()->id)->last_name : null,
            ],
            'set_score' => $match->set_score,
            'game_score' => $match->game_score,
            'date' => $match->date,
            'location' => $match->county,
            'league' => League::find($match->league_id),
            'court' => Court::find($match->court_id),
        ];
    }
    public static function getMatches($page = 1, $perPage = 100){

    return TennisMatch::with(['winners', 'losers'])
            ->orderByDesc('number')
            ->paginate($perPage, ['*'], 'page', $page)
            ->through(function ($match) {
                return [
                    'winner1_name' => $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name,
                    'winner1_uri' => $match->winners()->first()->uri,
                    'winner1_category' => $match->winners()->first()->category,
                    'winner2_name' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->first_name . ' ' . $match->winners()->skip(1)->first()->last_name : null,
                    'winner2_uri' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->uri : null,
                    'winner2_category' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->category : null,
                    'loser1_name' => $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name,
                    'loser1_uri' => $match->losers()->first()->uri,
                    'loser1_category' => $match->losers()->first()->category,
                    'loser2_name' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->first_name . ' ' . $match->losers()->skip(1)->first()->last_name : null,
                    'loser2_uri' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->uri : null,
                    'loser2_category' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->category : null,
                    'number' => $match->number,
                    'winner_point_gain' => $match->winner_point_gain,
                    'loser_point_gain' => $match->loser_point_gain,
                    'set_score' => $match->set_score,
                    'game_score' => $match->game_score,
                    'county' => $match->county,
                    'court' => Court::find($match->court_id),
                    'league' => League::find($match->league_id),
                    'court_link' => $match->court ? $match->court->link : null,
                    'date' => $match->date,
                ];
            });
            
    return $paginatedMatches;
    }

    public static function getMatchForDisplay($number){
       return Inertia::render('matches/Match', [
            'match_number' => $number
        ]);
    }


    public static function getMatchNumberApi($number){
        $match = TennisMatch::where('number', $number)->with(['winners', 'losers'])->first();

        if(!$match){
            return null;
        }

        return [
            'winner1_name' => $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name,
            'winner1_uri' => $match->winners()->first()->uri,
            'winner1_rank' => $match->winners()->first()->rank,
            'winner1_category' => $match->winners()->first()->category,
            'winner2_name' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->first_name . ' ' . $match->winners()->skip(1)->first()->last_name : null,
            'winner2_uri' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->uri : null,
            'winner2_rank' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->rank : null,
            'winner2_category' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->category : null,
            'loser1_name' => $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name,
            'loser1_uri' => $match->losers()->first()->uri,
            'loser1_rank' => $match->losers()->first()->rank,
            'loser1_category' => $match->losers()->first()->category,
            'loser2_name' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->first_name . ' ' . $match->losers()->skip(1)->first()->last_name : null,
            'loser2_uri' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->uri : null,
            'loser2_rank' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->rank : null,
            'loser2_category' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->category : null,
            'number' => $match->number,
            'winner_point_gain' => $match->winner_point_gain,
            'loser_point_gain' => $match->loser_point_gain,
            'set_score' => $match->set_score,
            'game_score' => $match->game_score,
            'county' => $match->county,
            'court' => Court::find($match->court_id),
            'league' => League::find($match->league_id),
            'court_link' => $match->court ? $match->court->link : null,
            'date' => $match->date,
        ];
    }
    /**
     * Get matches with pagination for API
     */
    public function getMatchesApi(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 100);
        
        return TennisMatch::with(['winners', 'losers'])
            ->orderByDesc('number')
            ->paginate($perPage, ['*'], 'page', $page)
            ->through(function ($match) {
                return [
                    'winner1_name' => $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name,
                    'winner1_uri' => $match->winners()->first()->uri,
                    'winner1_category' => $match->winners()->first()->category,
                    'winner2_name' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->first_name . ' ' . $match->winners()->skip(1)->first()->last_name : null,
                    'winner2_uri' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->uri : null,
                    'winner2_category' => $match->winners()->skip(1)->first() ? $match->winners()->skip(1)->first()->category : null,
                    'loser1_name' => $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name,
                    'loser1_uri' => $match->losers()->first()->uri,
                    'loser1_category' => $match->losers()->first()->category,
                    'loser2_name' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->first_name . ' ' . $match->losers()->skip(1)->first()->last_name : null,
                    'loser2_uri' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->uri : null,
                    'loser2_category' => $match->losers()->skip(1)->first() ? $match->losers()->skip(1)->first()->category : null,
                    'number' => $match->number,
                    'winner_point_gain' => $match->winner_point_gain,
                    'loser_point_gain' => $match->loser_point_gain,
                    'set_score' => $match->set_score,
                    'game_score' => $match->game_score,
                    'county' => $match->county,
                    'court' => Court::find($match->court_id),
                    'league' => League::find($match->league_id),
                    'court_link' => $match->court ? $match->court->link : null,
                    'date' => $match->date,
                ];
            });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'winner' => 'required',
            'loser' => 'required',
            'set_score' => ['required', 'max:30'],
            'game_score' => 'max:30',
            'date' => ['required', 'max:30'],
            'location' => 'required',
            'court' => '',
            'league' => '',
        ], [
            'winner.required' => 'Ovo polje je obavezno.',
            'loser.required' => 'Ovo polje je obavezno.',
            'set_score.required' => 'Ovo polje je obavezno.',
            'date.required' => 'Ovo polje je obavezno.',
            'location.required' => 'Ovo polje je obavezno.',
            'set_score.max' => 'Maksimalan broj karaktera je 30.',
            'date.max' => 'Maksimalan broj karaktera je 30.',
        ]);

        $winner_id = $data['winner']['id'];
        $loser_id = $data['loser']['id'];
        $new_players = 0;

        $winner = null;
        $loser = null;


        $court_id = null;
        if(isset($data['court']))
            $court_id = $data['court']['id'];
        else
            $court_id = 1;

        $league_id = null;

        if(isset($data['league']))
            $league_id = $data['league']['id'];
        else
            $league_id = 1;

        if(!is_numeric($winner_id)){
            $winner = new Player();

            $first_name = explode(' ', $data['winner']['name'])[0];
            $last_name = explode(' ', $data['winner']['name'])[1];

            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);

            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);

            $index = 0;

            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }

            $winner->first_name = $first_name;
            $winner->last_name = $last_name;
            $winner->uri = $uri;

            $winner->save();


            $new_players++;
            $new_winner = true;
            $winner_id = $winner->id;
        }
        else{
            $winner = Player::find($winner_id);
        }

        if(!is_numeric($loser_id)){
            $loser = new Player();

            $first_name = explode(' ', $data['loser']['name'])[0];
            $last_name = explode(' ', $data['loser']['name'])[1];

            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);

            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);

            $index = 0;

            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }

            $loser->first_name = $first_name;
            $loser->last_name = $last_name;
            $loser->uri = $uri;

            $loser->save();


            $new_players++;
            $new_loser = true;
            $loser_id = $loser->id;
        }
        else{
            $loser = Player::find($loser_id);
        }

        if(!is_numeric($court_id) && $court_id != null && $data['court']['name'] !== ''){
            if($data['court']['name'] == null){
                $court_id = 1;
            }
            else{
                $court_id = null;
                $court = new Court();

                $court->name = $data['court']['name'];
                $court->link = '';
                $court->uri = Str::slug($court->name);
                $court->county = $data['location'];
                $court->save();
                $court_id = $court->id;
            }
        }

        $match = new TennisMatch(
        );
        $match->date = date('Y-m-d', strtotime($data['date']));
        $match->set_score = $data['set_score'];
        $match->game_score = $data['game_score'];
        $match->county = $data['location'];
        $match->winner_point_gain = 0;
        $match->loser_point_gain = 0;

        $match->save();
        $match->players()->attach($winner_id, ['team' => 'winner']);
        $match->players()->attach($loser_id, ['team' => 'loser']);

        // Find the correct position based on date order
        $laterMatches = TennisMatch::where('date', '>', $match->date)
            ->orWhere(function($query) use ($match) {
                $query->where('date', '=', $match->date)
                      ->where('created_at', '>', $match->created_at);
            })
            ->orderBy('number', 'asc')
            ->get();

        if ($laterMatches->isEmpty()) {
            // This is the latest match, assign next number
            $maxNumber = TennisMatch::max('number') ?? 0;
            $match->number = $maxNumber + 1;
        } else {
            // Insert at the position of the first later match
            $insertPosition = $laterMatches->first()->number;
            $match->number = $insertPosition;
            
            // Increment all later matches by 1
            TennisMatch::where('number', '>=', $insertPosition)
                ->where('id', '!=', $match->id)
                ->increment('number');
        }

        [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
        $match->winner_point_gain = $winner_gains;
        $match->loser_point_gain = $loser_gains;


        if(isset($court_id)){
            $match->court_id = $court_id;
        }

        if(!is_numeric($league_id) && $league_id != null && $data['league']['name'] !== ''){
            if($data['league']['name'] == null){
                $league_id = 1;
            }
            else{
                $league = new League();

                $league->name = $data['league']['name'];
                $league->link = '';
                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;
                $date = Carbon::now();
                $league->date_begin = $date->format('Y-m-d');
                $league->date_end = $date->addDay()->format('Y-m-d');
                $league->save();
                $league_id = $league->id;
            }
        }

        if(isset($league_id)){
            $match->league_id = $league_id;
        }

        $match->save();

        $winner->points += $winner_gains;
        $loser->points += $loser_gains;
        $winner->save();
        $loser->save();


        Helpers::UpdateRanks();
        Helpers::UpdatePlayerCharts($winner, $loser, $match);
        Helpers::UpdateStatsChart($new_players, $winner_gains + $loser_gains, $match->date);



        if(env('APP_ENV') == 'production'){
            Mail::to('bogdan@openinnovation.me')->send(new AddMatchNotification($match));
            Mail::to('nikola@openinnovation.me')->send(new AddMatchNotification($match));
            Mail::to('')->send(new AddMatchNotification($match));
            Mail::to('')->send(new AddMatchNotification($match));
        }
         else
             Mail::to('bogdan@openinnovation.me')->send(new AddMatchNotification($match));

        // Generate URI for the created match
        $matchUri = self::generateMatchUri($match->number);

        return Inertia::render('matches/AddMatch', [
            'players' => PlayerController::getPlayersForDropdown(),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
            'match_uri' => $matchUri,
            'success' => true
        ]);
    }
 public function storeDouble(Request $request)
    {
        $data = $request->validate([
            'winner1' => 'required',
            'winner2' => 'required',
            'loser1' => 'required',
            'loser2' => 'required',
            'set_score' => ['required', 'max:30'],
            'game_score' => 'max:30',
            'date' => ['required', 'max:30'],
            'location' => 'required',
            'court' => '',
            'league' => '',
        ], [
            'winner.required' => 'Ovo polje je obavezno.',
            'loser.required' => 'Ovo polje je obavezno.',
            'set_score.required' => 'Ovo polje je obavezno.',
            'date.required' => 'Ovo polje je obavezno.',
            'location.required' => 'Ovo polje je obavezno.',
            'set_score.max' => 'Maksimalan broj karaktera je 30.',
            'date.max' => 'Maksimalan broj karaktera je 30.',
        ]);

        $winner1_id = $data['winner1']['id'];
        $winner2_id = $data['winner2']['id'];
        $loser1_id = $data['loser1']['id'];
        $loser2_id = $data['loser2']['id'];
        $new_players = 0;

        $winner1 = null;
        $winner2 = null;
        $loser1 = null;
        $loser2 = null;

        $court_id = null;
        if(isset($data['court']))
            $court_id = $data['court']['id'];
        else
            $court_id = 1;

        $league_id = null;

        if(isset($data['league']))
            $league_id = $data['league']['id'];
        else
            $league_id = 1;

        [$winner1, $new_winner1] = $this->check_for_existing($winner1_id, explode(' ', $data['winner1']['name'])[0], explode(' ', $data['winner1']['name'])[1]);
        if($new_winner1){
            $new_players++;
            $winner1_id = $winner1->id;
        }   
        [$winner2, $new_winner2] = $this->check_for_existing($winner2_id, explode(' ', $data['winner2']['name'])[0], explode(' ', $data['winner2']['name'])[1]);
        if($new_winner2){
            $new_players++;
            $winner2_id = $winner2->id;
        }
        [$loser1, $new_loser1] = $this->check_for_existing($loser1_id, explode(' ', $data['loser1']['name'])[0], explode(' ', $data['loser1']['name'])[1]);
        if($new_loser1){
            $new_players++;
            $loser1_id = $loser1->id;
        }
        [$loser2, $new_loser2] = $this->check_for_existing($loser2_id, explode(' ', $data['loser2']['name'])[0], explode(' ', $data['loser2']['name'])[1]);
        if($new_loser2){
            $new_players++;
            $loser2_id = $loser2->id;
        }

        if(!is_numeric($court_id) && $court_id != null && $data['court']['name'] !== ''){
            if($data['court']['name'] == null){
                $court_id = 1;
            }
            else{
                $court_id = null;
                $court = new Court();

                $court->name = $data['court']['name'];
                $court->link = '';
                $court->uri = Str::slug($court->name);
                $court->county = $data['location'];
                $court->save();
                $court_id = $court->id;
            }
        }

        $match = new TennisMatch(
        );
        $match->date = date('Y-m-d', strtotime($data['date']));
        $match->set_score = $data['set_score'];
        $match->game_score = $data['game_score'];
        $match->county = $data['location'];
        $match->winner_point_gain = 0;
        $match->loser_point_gain = 0;

        $match->save();
        $match->players()->attach($winner1_id, ['team' => 'winner']);
        $match->players()->attach($winner2_id, ['team' => 'winner']);
        $match->players()->attach($loser1_id, ['team' => 'loser']);
        $match->players()->attach($loser2_id, ['team' => 'loser']);

        // Find the correct position based on date order
        $laterMatches = TennisMatch::where('date', '>', $match->date)
            ->orWhere(function($query) use ($match) {
                $query->where('date', '=', $match->date)
                      ->where('created_at', '>', $match->created_at);
            })
            ->orderBy('number', 'asc')
            ->get();

        if ($laterMatches->isEmpty()) {
            // This is the latest match, assign next number
            $maxNumber = TennisMatch::max('number') ?? 0;
            $match->number = $maxNumber + 1;
        } else {
            // Insert at the position of the first later match
            $insertPosition = $laterMatches->first()->number;
            $match->number = $insertPosition;
            
            // Increment all later matches by 1
            TennisMatch::where('number', '>=', $insertPosition)
                ->where('id', '!=', $match->id)
                ->increment('number');
        }
        

        [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
        $match->winner_point_gain = $winner_gains;
        $match->loser_point_gain = $loser_gains;


        if(isset($court_id)){
            $match->court_id = $court_id;
        }

        if(!is_numeric($league_id) && $league_id != null && $data['league']['name'] !== ''){
            if($data['league']['name'] == null){
                $league_id = 1;
            }
            else{
                $league = new League();

                $league->name = $data['league']['name'];
                $league->link = '';
                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;
                $date = Carbon::now();
                $league->date_begin = $date->format('Y-m-d');
                $league->date_end = $date->addDay()->format('Y-m-d');
                $league->save();
                $league_id = $league->id;
            }
        }

        if(isset($league_id)){
            $match->league_id = $league_id;
        }

        $match->save();

        $winner1->points += $winner_gains/2;
        $winner2->points += $winner_gains/2;
        $loser1->points += $loser_gains/2;
        $loser2->points += $loser_gains/2;
        $winner1->save();
        $loser1->save();


        Helpers::UpdateRanks();
        Helpers::UpdatePlayerChartsDouble($winner1, $loser1, $match);
        Helpers::UpdatePlayerChartsDouble($winner2, $loser2, $match);
        Helpers::UpdateStatsChart($new_players, $winner_gains + $loser_gains, $match->date);



        if(env('APP_ENV') == 'production'){
            Mail::to('bogdan@openinnovation.me')->send(new DoubleMatchNotification($match));
            Mail::to('nikola@openinnovation.me')->send(new DoubleMatchNotification($match));
            Mail::to('')->send(new DoubleMatchNotification($match));
        }
         else
             Mail::to('bogdan@openinnovation.me')->send(new DoubleMatchNotification($match));

        // Generate URI for the created match
        $matchUri = self::generateMatchUri($match->number);

        return Inertia::render('matches/AddDouble', [
            'players' => PlayerController::getPlayersForDropdown(),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
            'match_uri' => $matchUri,
            'success' => true
        ]);
    }


    public function deleteMatch(){
        $data = request()->validate([
            'id' => ['required'],
        ]);

        $match = TennisMatch::find($data['id']);

        $winners = $match->winners()->get();
        $losers = $match->losers()->get();

        $winner_points = $match->winner_point_gain;
        $loser_points = $match->loser_point_gain;

        if($winners->count() > 1){
            foreach($winners as $winner){
                $winner->points -= $winner_points;
                $winner->save();
            }
        }
        else{
            $winners->first()->points -= $winner_points;
            $winners->first()->save();
        }

        if($losers->count() > 1){
            foreach($losers as $loser){
                $loser->points -= $loser_points;
                $loser->save();
            }
        }
        else{
            $losers->first()->points -= $loser_points;
            $losers->first()->save();
        }

        $match->players()->detach();

        $match->delete();

        $matches = TennisMatch::orderBy('date', 'asc')
            ->orderBy('created_at', 'asc')
            ->get();

        $i = 1;
        // Fix the matches
        foreach ($matches as $match) {
            $match->number = $i;
            $match->save();
            $i++;
        }

        return redirect('/mecevi');
    }

    /**
     * Display the specified resource.
     */
    public function show(TenisMatch $tenisMatch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TenisMatch $tenisMatch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTenisMatchRequest $request, TenisMatch $tenisMatch,$id)
    {
        $tenisMatch = TenisMatch::find($id);

        dd($tenisMatch);

        // return redirect()->back()->with('success', 'Meč je uspešno izmenjen.');
    }

    public function updateDouble(Request $request){
        $data = $request->validate([
            'id' => 'required',
            'winner1' => 'required',
            'winner2' => 'required',
            'loser1' => 'required',
            'loser2' => 'required',
            'set_score' => ['required', 'max:30'],
            'game_score' => 'max:30',
            'date' => ['required', 'max:30'],
            'location' => 'required',
            'court' => '',
            'league' => '',
        ], [
            'winner.required' => 'Ovo polje je obavezno.',
            'loser.required' => 'Ovo polje je obavezno.',
            'set_score.required' => 'Ovo polje je obavezno.',
            'date.required' => 'Ovo polje je obavezno.',
            'location.required' => 'Ovo polje je obavezno.',
            'set_score.max' => 'Maksimalan broj karaktera je 30.',
            'date.max' => 'Maksimalan broj karaktera je 30.',
        ]);

        $match = TennisMatch::find($data['id']);


        $old_winner1 = $match->winners()->first();
        $old_loser1 = $match->losers()->first();
        $old_winner2 = $match->winners()->skip(1)->first();
        $old_loser2 = $match->losers()->skip(1)->first();

        $old_points_winner = $match->winner_point_gain / 2;
        $old_points_loser = $match->loser_point_gain /2;

        $old_winner1->points -= $old_points_winner;
        $old_winner2->points -= $old_points_winner;
        $old_loser1->points -= $old_points_loser;
        $old_loser2->points -= $old_points_loser;

        $old_winner1->save();
        $old_winner2->save();
        $old_loser1->save();
        $old_loser2->save();

        $winner1 = Player::find($data['winner1']['id']);
        $winner2 = Player::find($data['winner2']['id']);
        $loser1 = Player::find($data['loser1']['id']);
        $loser2 = Player::find($data['loser2']['id']);

        $new_players = 0;

        if(!$winner1){
            $winner1 = new Player();
            $first_name = explode(' ', $data['winner1']['name'])[0];
            $last_name = explode(' ', $data['winner1']['name'])[1];
            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);
            $index = 0;
            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }
            $winner1->first_name = $first_name;
            $winner1->last_name = $last_name;
            $winner1->uri = $uri;
            $winner1->save();
            $new_players++;
        }
        if(!$winner2){
            $winner2 = new Player();
            $first_name = explode(' ', $data['winner2']['name'])[0];
            $last_name = explode(' ', $data['winner2']['name'])[1];
            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);
            $index = 0;
            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }
            $winner2->first_name = $first_name;
            $winner2->last_name = $last_name;
            $winner2->uri = $uri;
            $winner2->save();
            $new_players++;
        }

        if(!$loser1){
            $loser1 = new Player();
            $first_name = explode(' ', $data['loser1']['name'])[0];
            $last_name = explode(' ', $data['loser1']['name'])[1];
            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);
            $index = 0;
            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }
            $loser1->first_name = $first_name;
            $loser1->last_name = $last_name;
            $loser1->uri = $uri;
            $loser1->save();
            $new_players++;
        }

        if(!$loser2){
            $loser2 = new Player();
            $first_name = explode(' ', $data['loser2']['name'])[0];
            $last_name = explode(' ', $data['loser2']['name'])[1];
            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);
            $index = 0;
            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }
            $loser2->first_name = $first_name;
            $loser2->last_name = $last_name;
            $loser2->uri = $uri;
            $loser2->save();
            $new_players++;
        }


        if($old_loser1->id != $loser1->id){
            $match->players()->detach($old_loser1->id);
            $match->players()->attach($loser1->id, ['team' => 'loser']);
        }
        if($old_loser2->id != $loser2->id){
            $match->players()->detach($old_loser2->id);
            $match->players()->attach($loser2->id, ['team' => 'loser']);
        }
        if($old_winner1->id != $winner1->id){
            $match->players()->detach($old_winner1->id);
            $match->players()->attach($winner1->id, ['team' => 'winner']);
        }
        if($old_winner2->id != $winner2->id){
            $match->players()->detach($old_winner2->id);
            $match->players()->attach($winner2->id, ['team' => 'winner']);
        }



        if(isset($data['court'])){
            if(!is_numeric($data['court']['id'])){
                $court = new Court();

                $court->name = $data['court']['name'];
                $court->link = '';
                $court->uri = Str::slug($court->name);
                $court->county = $data['location'];
                $court->save();
                $court_id = $court->id;
            }
            else{
                $court_id = $data['court']['id'];
                if($match->court_id != $court_id){
                    $match->court_id = $court_id;
                    }
                }
        }
        else{
            $match->court_id = 1;
        }

        if(isset($data['league'])){
            if(!is_numeric($data['league']['id'])){
                $league = new League();

                $league->name = $data['league']['name'];
                $league->link = '';
                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;
                $date = Carbon::now();
                $league->date_begin = $date->format('Y-m-d');
                $league->date_end = $date->addDay()->format('Y-m-d');
                $league->save();
                $league_id = $league->id;
                $match->league_id = $league_id;
            }
            else{
                $league_id = $data['league']['id'];
                if($match->league_id != $league_id){
                    $match->league_id = $league_id;
                    }
                }
        }
        else{
            $match->league_id = 1;
        }
        if($data['set_score'] !== $match->set_score){
            $match->set_score = $data['set_score'];
        }
        if($data['game_score'] !== $match->game_score){
            $match->game_score = $data['game_score'];
        }
        $date = date('Y-m-d', strtotime($data['date']));
        if($date !== $match->date){
            $match->date = $date;
        }
        if($data['location'] !== $match->county){
            $match->county = $data['location'];
        }
        $match->save();

        [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
        $match->winner_point_gain = $winner_gains;
        $match->loser_point_gain = $loser_gains;

        $winner1->points += $winner_gains /2;
        $winner2->points += $winner_gains /2;
        $loser1->points += $loser_gains /2;
        $loser2->points += $loser_gains /2;
        $winner1->save();
        $winner2->save();
        $loser1->save();
        $loser2->save();

        $match->save();

        Helpers::UpdatePlayerChartsDouble($winner1, $loser1, $match);
        Helpers::UpdatePlayerChartsDouble($winner2, $loser2, $match);
        Helpers::UpdateRanks();
        Helpers::UpdateStatsChart($new_players, $winner_gains + $loser_gains, $match->date);

        // Generate URI for the updated match
        $matchUri = self::generateMatchUri($match->number);

        return Inertia::render('Auth/admin/matches/EditDouble', [
            'players' => PlayerController::getPlayersForDropdown(),
            'match' => TenisMatchController::getDoubleForEdit($match->number),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
            'match_uri' => $matchUri,
            'success' => true
        ]);

    }
    public function updateMatch(Request $request){
        $data = $request->validate([
            'id' => 'required',
            'winner' => 'required',
            'loser' => 'required',
            'set_score' => ['required', 'max:30'],
            'game_score' => 'max:30',
            'date' => ['required', 'max:30'],
            'location' => 'required',
            'court' => '',
            'league' => '',
        ], [
            'winner.required' => 'Ovo polje je obavezno.',
            'loser.required' => 'Ovo polje je obavezno.',
            'set_score.required' => 'Ovo polje je obavezno.',
            'date.required' => 'Ovo polje je obavezno.',
            'location.required' => 'Ovo polje je obavezno.',
            'set_score.max' => 'Maksimalan broj karaktera je 30.',
            'date.max' => 'Maksimalan broj karaktera je 30.',
        ]);

        $match = TennisMatch::find($data['id']);


        $old_winner = $match->winners()->first();
        $old_loser = $match->losers()->first();

        $old_points_winner = $match->winner_point_gain;
        $old_points_loser = $match->loser_point_gain;

        $old_winner->points -= $old_points_winner;
        $old_loser->points -= $old_points_loser;

        $old_winner->save();
        $old_loser->save();

        $winner = Player::find($data['winner']['id']);
        $loser = Player::find($data['loser']['id']);

        $new_players = 0;

        if(!$winner){
            $winner = new Player();
            $first_name = explode(' ', $data['winner']['name'])[0];
            $last_name = explode(' ', $data['winner']['name'])[1];
            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);
            $index = 0;
            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }
            $winner->first_name = $first_name;
            $winner->last_name = $last_name;
            $winner->uri = $uri;
            $winner->save();
            $new_players++;
        }

        if(!$loser){
            $loser = new Player();
            $first_name = explode(' ', $data['loser']['name'])[0];
            $last_name = explode(' ', $data['loser']['name'])[1];
            $uri_firstname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);
            $index = 0;
            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }
            $loser->first_name = $first_name;
            $loser->last_name = $last_name;
            $loser->uri = $uri;
            $loser->save();
            $new_players++;
        }



        $match->players()->detach($old_winner->id);
        $match->players()->detach($old_loser->id);



        if(isset($data['court'])){
            if(!is_numeric($data['court']['id'])){
                $court = new Court();

                $court->name = $data['court']['name'];
                $court->link = '';
                $court->uri = Str::slug($court->name);
                $court->county = $data['location'];
                $court->save();
                $court_id = $court->id;
            }
            else{
                $court_id = $data['court']['id'];
                if($match->court_id != $court_id){
                    $match->court_id = $court_id;
                    }
                }
        }
        else{
            $match->court_id = 1;
        }

        if(isset($data['league'])){
            if(!is_numeric($data['league']['id'])){
                $league = new League();

                $league->name = $data['league']['name'];
                $league->link = '';
                $uri = str_replace(' - ','-',$league->name);
                $uri = str_replace(' ','-',$uri);
                $uri = str_replace(',','',$uri);
                $uri = strtolower($uri);
                $league->uri = $uri;
                $date = Carbon::now();
                $league->date_begin = $date->format('Y-m-d');
                $league->date_end = $date->addDay()->format('Y-m-d');
                $league->save();
                $league_id = $league->id;
                $match->league_id = $league_id;
            }
            else{
                $league_id = $data['league']['id'];
                if($match->league_id != $league_id){
                    $match->league_id = $league_id;
                    }
                }
        }
        else{
            $match->league_id = 1;
        }
        if($data['set_score'] !== $match->set_score){
            $match->set_score = $data['set_score'];
        }
        if($data['game_score'] !== $match->game_score){
            $match->game_score = $data['game_score'];
        }
        $date = date('Y-m-d', strtotime($data['date']));
        if($date !== $match->date){
            $match->date = $date;
        }
        if($data['location'] !== $match->county){
            $match->county = $data['location'];
        }
        $match->save();
        $match->players()->attach($winner->id, ['team' => 'winner']);
        $match->players()->attach($loser->id, ['team' => 'loser']);

        [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
        $match->winner_point_gain = $winner_gains;
        $match->loser_point_gain = $loser_gains;

        $winner->points += $winner_gains;
        $loser->points += $loser_gains;
        $winner->save();
        $loser->save();

        $match->save();

        Helpers::UpdatePlayerCharts($winner, $loser, $match);
        Helpers::UpdateRanks();
        Helpers::UpdateStatsChart($new_players, $winner_gains + $loser_gains, $match->date);

        // Generate URI for the updated match
        $matchUri = self::generateMatchUri($match->number);

        return Inertia::render('Auth/admin/matches/EditMatch', [
            'players' => PlayerController::getPlayersForDropdown(),
            'match' => TenisMatchController::getMatchForEdit($match->number),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
            'match_uri' => $matchUri,
            'success' => true
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TenisMatch $tenisMatch)
    {
        //
    }
}
