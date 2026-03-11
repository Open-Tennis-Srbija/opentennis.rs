<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\League;
use App\Models\Court;
use App\Models\TennisMatch;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $staticPages = config('seo.sitemap.static_pages', []);
        
        return response()->view('sitemap.index', [
            'staticPages' => $staticPages,
        ])->header('Content-Type', 'text/xml');
    }
    
    public function players()
    {
        $players = Player::select('uri', 'updated_at')
            ->whereNotNull('uri')
            ->where('uri', '!=', '')
            ->orderBy('updated_at', 'desc')
            ->get();
            
        return response()->view('sitemap.players', [
            'players' => $players,
        ])->header('Content-Type', 'text/xml');
    }
    
    public function matches()
    {
        $matches = TennisMatch::select('id', 'updated_at')
            ->with(['winner:id,first_name,last_name', 'loser:id,first_name,last_name'])
            ->orderBy('updated_at', 'desc')
            ->limit(10000) // Limit for performance
            ->get();
            
        return response()->view('sitemap.matches', [
            'matches' => $matches,
        ])->header('Content-Type', 'text/xml');
    }
    
    public function leagues()
    {
        $leagues = League::select('uri', 'updated_at')
            ->whereNotNull('uri')
            ->where('uri', '!=', '')
            ->orderBy('updated_at', 'desc')
            ->get();
            
        return response()->view('sitemap.leagues', [
            'leagues' => $leagues,
        ])->header('Content-Type', 'text/xml');
    }
    
    public function courts()
    {
        $courts = Court::select('uri', 'updated_at')
            ->whereNotNull('uri')
            ->where('uri', '!=', '')
            ->orderBy('updated_at', 'desc')
            ->get();
            
        return response()->view('sitemap.courts', [
            'courts' => $courts,
        ])->header('Content-Type', 'text/xml');
    }
}