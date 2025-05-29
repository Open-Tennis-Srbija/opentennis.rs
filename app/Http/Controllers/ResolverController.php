<?php

namespace App\Http\Controllers;

use App\Models\League;
use App\Models\Player;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResolverController extends Controller
{
    //

    public static function resolveUri($uri){
        $player = Player::where('uri', $uri)->first();

        if($player) return Inertia::render('Player',['player'=>PlayerController::get_cached($uri)]);

        $league = League::where('uri', $uri)->first();

        if($league) return Inertia::render('League', ['league'=>LeaguesController::returnLeague($league)]);

        return redirect('/');

    }
}
