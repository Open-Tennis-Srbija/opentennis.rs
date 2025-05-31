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
use Helpers;
use Illuminate\Support\Facades\Storage;

class TenisMatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function editMatch($id){
        return Inertia::render('EditMatch', [
            'players' => PlayerController::getPlayersForDropdown(),
            'match' => TenisMatchController::getMatchForEdit($id),
            'courts' => CourtsController::getCourts(),
        ]);
    }

    private function getMatchForEdit($id){
        $match = TenisMatch::find($id);

        return [
            'id' => $match->id,
            'winner' => [
                'id' => $match->winner_id,
                'name' => Player::find($match->winner_id)->first_name . ' ' . Player::find($match->winner_id)->last_name,
            ],
            'loser' => [
                'id' => $match->loser_id,
                'name' => Player::find($match->loser_id)->first_name . ' ' . Player::find($match->loser_id)->last_name,
            ],
            'set_score' => $match->set_score,
            'game_score' => $match->game_score,
            'date' => $match->match_date,
            'location' => $match->match_location,
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

        return redirect()->back()->with('success', 'Meč je uspešno dodat.');
    }


    public function deleteMatch(){
        $data = request()->validate([
            'id' => ['required'],
        ]);

        $match = TenisMatch::find($data['id']);

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

        $match = TenisMatch::find($data['id']);


        $old_data = [];
        [$old_data['winner_gains'], $old_data['loser_gains']] = NikolaAlgoV1::getMatchEloGains($match);

        if($match->winner_id != $data['winner']['id']){
            $old_data['winner'] = Player::find($match->winner_id);
            $match->winner_id = $data['winner']['id'];
        }

        if($match->loser_id != $data['loser']['id']){
            $old_data['loser'] = Player::fild($match->loser_id);
            $match->loser_id = $data['loser']['id'];
        }

        if($match->court_id > 1)
            $old_data['court'] = $match->getCourt();

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
            $old_data['set_score'] = $match->set_score;
            $match->set_score = $data['set_score'];
        }
        if($data['game_score'] !== $match->game_score){
            $old_data['game_score'] = $match->game_score;
            $match->game_score = $data['game_score'];
        }
        if($data['date'] !== $match->match_date){
            $old_data['date'] = $match->match_date;
            $match->match_date = $data['date'];
        }
        if($data['location'] !== $match->match_location){
            $old_data['location'] = $match->match_location;
            $match->match_location = $data['location'];
        }


        $match->save();

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
