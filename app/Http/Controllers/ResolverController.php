<?php

namespace App\Http\Controllers;

use App\Models\League;
use App\Models\Player;
use App\Models\TennisMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResolverController extends Controller
{
    //

    public static function resolveUri($uri){
        $player = Player::where('uri', $uri)->first();

        if($player) return Inertia::render('players/Player', ['player_uri' => $uri]);

        $league = League::where('uri', $uri)->first();

        if($league) return Inertia::render('leagues/League', ['league_uri' => $uri]);

        // $match = TennisMatch::where('number', $uri)->first();

        // if($match) return Inertia::render('matches/Match', ['match_number' => $uri]);

        return redirect('/');

    }
}
