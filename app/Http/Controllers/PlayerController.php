<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlayerRequest;
use App\Http\Requests\UpdatePlayerRequest;
use App\Models\Player;
use App\Models\TenisMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public static function getPlayers(){
        $raw_players = Player::all();

        $players = [];
        foreach($raw_players as $player){
            array_push($players, [
                'id' => $player->id,
                'uri' => $player->uri,
                'name' => $player->first_name . ' ' . $player->last_name,
                'stats' => $player->getStats(),
                'club' => $player->club,
                'location' => $player->location,
            ]);
        }


        usort($players, function($a, $b) {
            return $b['stats']['elo'] <=> $a['stats']['elo'];
        });

        return $players;
    }

    public static function getPlayersForDropdown(){
        $raw_players = Player::all()->sortBy('first_name');

        $players = [];
        foreach($raw_players as $player){
            array_push($players, [
                'id' => $player->id,
                'name' => $player->first_name . ' ' . $player->last_name,
            ]);
        }

        return $players;
    }

    public static function getPlayerData($uri){
        $player = Player::where('uri', $uri)->first();

        $players = PlayerController::getPlayers();
        $position = 0;

        [$wins,$loses] = $player->getMatches();

        foreach($players as $key => $value){
            if($value['uri'] == $uri){
                $position = $key + 1;
            }
        }

        return [
            'id' => $player->id,
            'name' => $player->first_name . ' ' . $player->last_name,
            'stats' => $player->getStats(),
            'club' => $player->club,
            'position' => $position,
            'wins' => $wins,
            'loses' => $loses,
            'location' => $player->location,
        ];
    }
    public function deletePlayer(){
        $data = request()->validate([
            'id' => ['required'],
        ]);

        $player = Player::find($data['id']);

        $player->delete();

        return redirect('/');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlayerRequest $request)
    {
        //
    }

    public function getPlayer($id){
        return Inertia::render('EditPlayer', [
            'player' => Player::find($id),
        ]);
       
    }


    public function updatePlayer(Request $request){
        $data = $request->validate([
            'id' => ['required'],
            'first_name' => ['required', 'max:30'],
            'last_name' => ['required', 'max:30'],
            'club' => ['max:30'],
            'location' => ['max:30'],
        ], [
            'first_name.required' => 'Ovo polje je obavezno.',
            'first_name.max' => 'Maksimalan broj karaktera je 30.',
            'last_name.required' => 'Ovo polje je obavezno.',
            'last_name.max' => 'Maksimalan broj karaktera je 30.',
            'club.max' => 'Maksimalan broj karaktera je 30.',
            'location.max' => 'Maksimalan broj karaktera je 30.',
        ]);

        $player = Player::find($data['id']);

        $player->first_name = $data['first_name'];
        $player->last_name = $data['last_name'];
        $player->club = $data['club'];
        $player->location = $data['location'];

        $player->save();
        $uri = '/'.$player->uri;
        return redirect($uri);
    }

    /**
     * Display the specified resource.
     */
    public function show($uri)
    {  
        $player = PlayerController::getPlayerData(($uri));
        return Inertia::render('Player', [
            'player' => $player
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Player $player)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlayerRequest $request, Player $player)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        //
    }
}
