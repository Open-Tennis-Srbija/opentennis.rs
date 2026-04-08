<?php

namespace App\Http\Controllers;

use App\Helpers\SEOHelper;
use App\Models\Player;
use App\Models\Court;
use App\Models\League;
use Inertia\Inertia;

class StaticController extends Controller
{
    public function mission()
    {
        $seoData = SEOHelper::generateStaticPageSEO('mission');
        
        return Inertia::render('static/Mision', [
            'seo' => $seoData,
        ]);
    }

    public function home()
    {
        $seoData = SEOHelper::generateStaticPageSEO('home');

        $players = Player::select('first_name', 'last_name', 'uri')
            ->orderBy('first_name')
            ->get()
            ->map(fn($p) => ['name' => $p->first_name . ' ' . $p->last_name, 'uri' => $p->uri]);

        $courts = Court::where('id', '>', 1)
            ->select('name', 'uri')
            ->orderBy('name')
            ->get()
            ->map(fn($c) => ['name' => $c->name, 'uri' => $c->uri]);

        $tournaments = League::where('id', '>', 1)
            ->where('type', 'tournament')
            ->select('name', 'uri')
            ->orderBy('name')
            ->get()
            ->map(fn($l) => ['name' => $l->name, 'uri' => $l->uri]);

        $leagues = League::where('id', '>', 1)
            ->where('type', 'league')
            ->select('name', 'uri')
            ->orderBy('name')
            ->get()
            ->map(fn($l) => ['name' => $l->name, 'uri' => $l->uri]);

        return Inertia::render('home/Home', [
            'seo' => $seoData,
            'players' => $players,
            'courts' => $courts,
            'tournaments' => $tournaments,
            'leagues' => $leagues,
        ]);
    }
    
    public function rules()
    {
        $seoData = SEOHelper::generateStaticPageSEO('rules');
        
        return Inertia::render('static/Rules', [
            'seo' => $seoData,
        ]);
    }
    
    public function rewards()
    {
        $seoData = SEOHelper::generateStaticPageSEO('rewards');
        
        return Inertia::render('static/Rewards', [
            'seo' => $seoData,
        ]);
    }
    
    public function courts()
    {
        $seoData = SEOHelper::generateStaticPageSEO('courts_list');
        
        return Inertia::render('courts/Courts', [
            'seo' => $seoData,
        ]);
    }
    
    public function leagues()
    {
        $seoData = SEOHelper::generateStaticPageSEO('leagues_list');
        
        return Inertia::render('leagues/Leagues', [
            'seo' => $seoData,
        ]);
    }
    
    public function tournaments()
    {
        $seoData = SEOHelper::generateStaticPageSEO('tournaments_list');
        
        return Inertia::render('tournaments/Tournaments', [
            'seo' => $seoData,
            'series' => TournamentSeriesController::getAllSeries(),
        ]);
    }
    
    public function matches()
    {
        $seoData = SEOHelper::generateStaticPageSEO('matches_list');
        
        return Inertia::render('matches/Matches', [
            'seo' => $seoData,
            'loadMatches' => true,
        ]);
    }
    
    public function addMatch()
    {
        $seoData = SEOHelper::generateStaticPageSEO('add_match');
        
        return Inertia::render('matches/AddMatch', [
            'seo' => $seoData,
            'players' => \App\Http\Controllers\PlayerController::getPlayersForDropdown(),
            'courts' => \App\Http\Controllers\CourtsController::getCourts(),
            'leagues' => \App\Http\Controllers\LeaguesController::getLeagues(),
        ]);
    }
    
    public function addDouble()
    {
        $seoData = SEOHelper::generateStaticPageSEO('add_match');
        
        return Inertia::render('matches/AddDouble', [
            'seo' => $seoData,
            'players' => \App\Http\Controllers\PlayerController::getPlayersForDropdown(),
            'courts' => \App\Http\Controllers\CourtsController::getCourts(),
            'leagues' => \App\Http\Controllers\LeaguesController::getLeagues(),
        ]);
    }
    
    public function players()
    {
        $seoData = SEOHelper::generateStaticPageSEO('players_list');
        
        return Inertia::render('players/Players', [
            'seo' => $seoData,
        ]);
    }
}