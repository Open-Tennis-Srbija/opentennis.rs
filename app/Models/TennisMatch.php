<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TennisMatch extends Model
{
    //
    protected $fillable = [
        'date',
        'winner_id',
        'loser_id',
        'court_id',
        'league_id',
    ];

    public function getFormatedDate(){
        $days = ['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned']; 
        $months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];

        $timestamp = strtotime($this->date);

        $dayOfWeek = date('w', $timestamp); // 0 (Sunday) to 6 (Saturday)
        $day = date('j', $timestamp);       // Day of the month without leading zeros
        $month = date('n', $timestamp);     // 1-12
        $year = date('Y', $timestamp);

        return "{$days[$dayOfWeek]} {$day} {$months[$month-1]} {$year}";
            
        return $date;
    }

    public function players()
    {
        return $this->belongsToMany(Player::class, 'match_players')
                    ->withPivot('team')
                    ->withTimestamps();
    }

    public function winners()
    {
        return $this->players()->wherePivot('team', 'winner');
    }

    public function losers()
    {
        return $this->players()->wherePivot('team', 'loser');
    }

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function addPlayers(array $players, string $team)
    {
        foreach ($players as $player) {
            $this->players()->attach($player instanceof Player ? $player->id : $player, ['team' => $team]);
        }
    }

    public function scopeApplySort($query, $sortBy, $sortDir)
    {
        if (in_array($sortBy, ['winner', 'loser'])) {
            $query->addSelect(['sort_name' => Player::query()
                ->select('players.last_name')
                ->join('match_players', 'players.id', '=', 'match_players.player_id')
                ->whereColumn('match_players.tennis_match_id', 'tennis_matches.id')
                ->where('match_players.team', $sortBy)
                ->orderBy('players.last_name')
                ->limit(1)
            ])->orderBy('sort_name', $sortDir);
        } elseif ($sortBy === 'league') {
            $query->addSelect(['sort_name' => League::query()
                ->select('leagues.name')
                ->whereColumn('leagues.id', 'tennis_matches.league_id')
                ->limit(1)
            ])->orderBy('sort_name', $sortDir);
        } elseif ($sortBy === 'court') {
            $query->addSelect(['sort_name' => Court::query()
                ->select('courts.name')
                ->whereColumn('courts.id', 'tennis_matches.court_id')
                ->limit(1)
            ])->orderBy('sort_name', $sortDir);
        } else {
            $query->orderBy($sortBy, $sortDir);
        }

        return $query;
    }
}
