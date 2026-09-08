<?php

namespace App\Http\Controllers;

use App\Models\League;
use App\Models\Player;
use App\Models\TennisMatch;
use App\Helpers\SEOHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResolverController extends Controller
{
    //

    public static function resolveUri($uri){
        $player = Player::where('uri', $uri)->first();

        if($player) return Inertia::render('players/Player', [
            'player_uri' => $uri,
            'seo' => SEOHelper::generatePlayerSEO($player),
        ]);

        $league = League::where('uri', $uri)->first();

        if($league) return Inertia::render('leagues/League', [
            'league_uri' => $uri,
            'seo' => SEOHelper::generateLeagueSEO($league),
        ]);

        // $match = TennisMatch::where('number', $uri)->first();

        // if($match) return Inertia::render('matches/Match', ['match_number' => $uri]);

        return redirect('/');

    }
}
