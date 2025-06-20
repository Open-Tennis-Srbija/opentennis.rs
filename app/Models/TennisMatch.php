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
}
