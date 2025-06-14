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
use DateTime;
use Helpers;
use Illuminate\Support\Facades\Storage;
use PlayerCaching;

use function PHPUnit\Framework\isNumeric;

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
        return Inertia::render('Auth/EditMatch', [
            'players' => PlayerController::getPlayersForDropdown(),
            'match' => TenisMatchController::getMatchForEdit($number),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
        ]);
    }

    public function batchImport(){
        return Inertia::render('Auth/BatchMatches', [
            'players' => PlayerController::getPlayersForDropdown(),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues(),
        ]);
    }

    public function importMatches(Request $request){
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
                $league->save();
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
                
                $compare = TennisMatch::where('date', '<=', $match->date)->orderByDesc('number')->orderByDesc('created_at')->first();
                
                $match->number = $compare->number + 1;
                
                $rest_matches = TennisMatch::where('number', '>=', $match->number)->get();

                foreach($rest_matches as $m){
                    if($m->id !== $match->id){
                        $m->number = $m->number + 1;
                        $m->save();
                    }
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

    public static function getMatches(){

    return TennisMatch::with(['winners', 'losers'])
            ->orderByDesc('number')
            ->get()
            ->map(function ($match) {
                return [
                    'winner_name' => $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name,
                    'winner_uri' => $match->winners()->first()->uri,
                    'loser_name' => $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name,
                    'loser_uri' => $match->losers()->first()->uri,
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

        $compare = TennisMatch::where('date', '<=', $match->date)->orderByDesc('number')->orderByDesc('created_at')->first();
        
        $match->number = $compare->number + 1;

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
        }
         else
             Mail::to('bogdan@openinnovation.me')->send(new AddMatchNotification($match)); 

        return redirect()->back()->with('data',[
            'players' => PlayerController::getPlayersForDropdown(),
            'courts' => CourtsController::getCourts(),
            'leagues' => LeaguesController::getLeagues()
        ]);
    }


    public function deleteMatch(){
        $data = request()->validate([
            'id' => ['required'],
        ]);

        $match = TennisMatch::find($data['id']);

        $match->players()->detach($match->winners()->first()->id);
        $match->players()->detach($match->losers()->first()->id);


        $match->delete();

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



        if($old_loser->id != $loser->id){
            $match->players()->detach($old_loser->id);
            $match->players()->attach($loser->id, ['team' => 'loser']);
        }
        if($old_winner->id != $winner->id){
            $match->players()->detach($old_winner->id);
            $match->players()->attach($winner->id, ['team' => 'winner']);
        }



        if(isset($data['court'])){
            if(!is_numeric($data['court']['id'])){
                $court = new Court();

                $court->name = $data['court']['name'];
                $court->link = '';
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

        if($data['set_score'] !== $match->set_score){
            $match->set_score = $data['set_score'];
        }
        if($data['game_score'] !== $match->game_score){
            $match->game_score = $data['game_score'];
        }
        if($data['date'] !== $match->date){
            $match->date = $data['date'];
        }
        if($data['location'] !== $match->county){
            $match->county = $data['location'];
        }
        $match->save();

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


        return redirect()->back()->with('success', 'Meč je uspešno izmenjen.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TenisMatch $tenisMatch)
    {
        //
    }
}
