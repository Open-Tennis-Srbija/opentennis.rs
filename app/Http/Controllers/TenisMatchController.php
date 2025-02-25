<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTenisMatchRequest;
use App\Http\Requests\UpdateTenisMatchRequest;
use App\Mail\AddMatchNotification;
use App\Models\Player;
use App\Models\TenisMatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

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
        ];
    }

    public static function getMatches(){
        $raw_matches = TenisMatch::all()->sortBy('match_date', SORT_REGULAR, true)->sortBy('date_created', SORT_REGULAR, true);

        $matches = [];
        foreach($raw_matches as $match){
            $winner = Player::find($match->winner_id);
            $loser = Player::find($match->loser_id);

            [$winner_gains, $loser_gains] = $match->getEloGains();

            array_push($matches, [
                'id' => $match->id,
                'winner' => $winner->first_name . ' ' . $winner->last_name,
                'winner_uri' => $winner->uri,
                'winner_points' => $winner_gains,
                'loser' => $loser->first_name . ' ' . $loser->last_name,
                'loser_uri' => $loser->uri,
                'loser_points' => $loser_gains,
                'set_score' => $match->set_score,
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
            ]);
        }



        return $matches;
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

        

        if(!is_numeric($winner_id)){
            $winner = new Player();

            $first_name = explode(' ', $data['winner']['name'])[0];
            $last_name = explode(' ', $data['winner']['name'])[1];

            $winner->first_name = $first_name;
            $winner->last_name = $last_name;

            $winner->save();
            
            $winner_id = $winner->id;
        }

        if(!is_numeric($loser_id)){
            $loser = new Player();

            $first_name = explode(' ', $data['loser']['name'])[0];
            $last_name = explode(' ', $data['loser']['name'])[1];

            $loser->first_name = $first_name;
            $loser->last_name = $last_name;

            $loser->save();

            $loser_id = $loser->id;
        }

        $match = new TenisMatch(
            [
                'winner_id' => $winner_id,
                'loser_id' => $loser_id,
                'set_score' => $data['set_score'],
                'game_score' => $data['game_score'],
                'match_date' => $data['date'],
                'match_location' => $data['location'],
            ]
        );

        $match->save();

        Mail::to('bogdan@openinnovation.me')->send(new AddMatchNotification($match));
        Mail::to('nikola@openinnovation.me')->send(new AddMatchNotification($match));

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

        if($match->winner_id != $data['winner']['id']){
            $match->winner_id = $data['winner']['id'];
        }

        if($match->loser_id != $data['loser']['id']){
            $match->loser_id = $data['loser']['id'];
        }

        $match->set_score = $data['set_score'];
        $match->game_score = $data['game_score'];
        $match->match_date = $data['date'];
        $match->match_location = $data['location'];

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
