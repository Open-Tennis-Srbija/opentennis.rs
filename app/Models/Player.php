<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use NikolaAlgoV1;
use App\Models\TennisMatch;
use App\Models\Court;
use Illuminate\Support\Facades\DB;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'club',
        'category',
        'uri',
        'location',
    ];
    public function matches()
    {
        return $this->belongsToMany(TennisMatch::class, 'match_players')
                    ->withPivot('team')
                    ->orderByDesc('tennis_matches.number');
    }

    public function wins()
    {
        return $this->belongsToMany(TennisMatch::class, 'match_players')
                    ->withPivot('team')
                    ->wherePivot('team', 'winner')
					->orderByDesc('tennis_matches.number');
    }

    public function losses()
    {
        return $this->belongsToMany(TennisMatch::class, 'match_players')
                    ->withPivot('team')
                    ->wherePivot('team', 'loser')
					->orderByDesc('tennis_matches.number');
    }

    /**
     * Get players this player won against, with counts.
     */
    public function wonAgainstWithCounts()
    {
        return DB::table('match_players as winner')
            ->join('match_players as loser', function ($join) {
                $join->on('winner.tennis_match_id', '=', 'loser.tennis_match_id')
                     ->where('loser.team', '=', 'loser');
            })
            ->where('winner.team', '=', 'winner')
            ->where('winner.player_id', '=', $this->id)
            ->groupBy('loser.player_id')
            ->select('loser.player_id', DB::raw('count(*) as win_count'))
            ->get()
            ->map(function($row) {
                $player = Player::find($row->player_id);
                return [
                    'uri' => $player ? $player->uri : 'unknown',
                    'name' => $player ? $player->getName() : 'Unknown',
                    'count' => $row->win_count,
                ];
            })->values();
    }

    /**
     * Get players this player lost against, with counts.
     */
    public function lostAgainstWithCounts()
    {
        return DB::table('match_players as loser')
            ->join('match_players as winner', function ($join) {
                $join->on('loser.tennis_match_id', '=', 'winner.tennis_match_id')
                     ->where('winner.team', '=', 'winner');
            })
            ->where('loser.team', '=', 'loser')
            ->where('loser.player_id', '=', $this->id)
            ->groupBy('winner.player_id')
            ->select('winner.player_id', DB::raw('count(*) as loss_count'))
            ->get()
            ->map(function($row) {
                $player = Player::find($row->player_id);
                return [
                    'uri' => $player ? $player->uri : 'unknown',
                    'name' => $player ? $player->getName() : 'Unknown',
                    'count' => $row->loss_count,
                ];
            })->values();
    }

    /**
     * Get players this player has not played with.
     */
    public function notPlayedWith()
    {
        // Get all match IDs the player participated in
        $matchIds = DB::table('match_players')
            ->where('player_id', $this->id)
            ->pluck('tennis_match_id');

        // Get all opponent uris from those matches, excluding self
        $opponentUris = DB::table('match_players')
            ->whereIn('tennis_match_id', $matchIds)
            ->where('player_id', '!=', $this->id)
            ->join('players', 'match_players.player_id', '=', 'players.id')
            ->pluck('players.uri')
            ->unique();

        // Add self uri to the exclusion list
        $excludeUris = $opponentUris->merge([$this->uri])->unique();

        // Return players not played with
        return Player::whereNotIn('uri', $excludeUris)->get()->map(function($player) {
            return [
                'uri' => $player->uri,
                'name' => $player->getName(),
            ];
        })->values();
    }


    public function getName(){
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getMatches(){
        $raw_wins =TenisMatch::where('winner_id', $this->id)->get()->sortBy('match_date', SORT_REGULAR,true)->sortBy('date_created', SORT_REGULAR);
        $raw_loses = TenisMatch::where('loser_id', $this->id)->get()->sortBy('match_date', SORT_REGULAR,true)->sortBy('date_created', SORT_REGULAR);;


        $wins = [];
        foreach($raw_wins as $match){
            $loser = Player::find($match->loser_id);

            array_push($wins, [
                'id' => $match->id,
                'winner_points' =>NikolaAlgoV1::getMatchEloGains($match,'winner'),
                'loser_points' => NikolaAlgoV1::getMatchEloGains($match,'loser'),
                'winner_uri' => $match->getPlayerUri('winner'),
                'loser_uri' => $match->getPlayerUri('loser'),
                'winner' => $this->first_name . ' ' . $this->last_name,
                'loser' => $loser->first_name . ' ' . $loser->last_name,
                'set_score' => $match->set_score,
                'number' => $match->getNumber(),
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
                'court' => $match->getCourt(),
                'league'=> $match->getLeague(),
            ]);
        }

        $loses = [];

        foreach($raw_loses as $match){
            $winner = Player::find($match->winner_id);

            array_push($loses, [
                'id' => $match->id,
                'winner_points' => NikolaAlgoV1::getMatchEloGains($match,'winner'),
                'loser_points' => NikolaAlgoV1::getMatchEloGains($match,'loser'),
                'winner_uri' => $match->getPlayerUri('winner'),
                'loser_uri' => $match->getPlayerUri('loser'),
                'winner' => $winner->first_name . ' ' . $winner->last_name,
                'loser' => $this->first_name . ' ' . $this->last_name,
                'set_score' => $match->set_score,
                'number' => $match->getNumber(),
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
                'league'=> $match->getLeague(),
                'court' => $match->getCourt(),
            ]);
        }

        return [
            $wins, $loses
        ];
    }

 

    public function getStatsOnDate($date)
    {
        // Get all match IDs the player participated in from the pivot table
        $matchIds = $this->matches()->pluck('id');
		        // Fetch those matches
        $total_matches = TennisMatch::whereIn('id', $matchIds)->get();

        // Filter matches by date
        $filtered_matches = [];
        foreach ($total_matches as $match) {
            if (strtotime($match->date) <= strtotime($date)) {
                $filtered_matches[] = $match;
            }
        }

        return [
            'elo' => $this->getElo($filtered_matches),
        ];
    }

    public function getElo($matches) {

        $elo = NikolaAlgoV1::calculatePoints($matches, $this);

        return $elo;
    }

    public function mostUsedCourts()
    {
        return DB::table('match_players')
            ->join('tennis_matches', 'match_players.tennis_match_id', '=', 'tennis_matches.id')
            ->where('match_players.player_id', $this->id)
            ->whereNotNull('tennis_matches.court_id')
            ->select('tennis_matches.court_id', DB::raw('count(*) as count'))
            ->groupBy('tennis_matches.court_id')
            ->orderByDesc('count')
            ->get()
            ->map(function($row) {
                $court = Court::find($row->court_id);
                return [
                    'name' => $court ? $court->name : 'Nepoznat teren',
                    'uri' => $court ? $court->uri : '',
                    'id' => $court ? $court->id : 0,
                    'link' => $court && $court->link ? $court->link : '',
                    'count' => $row->count,
                ];
            })
            ->values();
    }
    public function mostUsedLeagues()
    {
        return DB::table('match_players')
            ->join('tennis_matches', 'match_players.tennis_match_id', '=', 'tennis_matches.id')
            ->where('match_players.player_id', $this->id)
            ->whereNotNull('tennis_matches.league_id')
            ->where('tennis_matches.league_id' , '>', 1)
            ->select('tennis_matches.league_id', DB::raw('count(*) as count'))
            ->groupBy('tennis_matches.league_id')
            ->orderByDesc('count')
            ->get()
            ->map(function($row) {
                $league = \App\Models\League::find($row->league_id);
                return [
                    'name' => $league ? $league->name : 'Nepoznata liga',
                    'uri' => $league && $league->uri ? $league->uri : '',
                    'count' => $row->count,
                ];
            })
            ->values();
    }
    public function mostUsedCounties()
    {
        return DB::table('match_players')
            ->join('tennis_matches', 'match_players.tennis_match_id', '=', 'tennis_matches.id')
            ->where('match_players.player_id', $this->id)
            ->whereNotNull('tennis_matches.county')
            ->select('tennis_matches.county', DB::raw('count(*) as count'))
            ->groupBy('tennis_matches.county')
            ->orderByDesc('count')
            ->get()
            ->map(function($row) {
                return [
                    'county' => $row->county,
                    'count' => $row->count,
                ];
            })
            ->values();
    }

}

