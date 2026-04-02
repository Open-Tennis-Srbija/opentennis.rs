<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TournamentSeries extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'uri',
        'description',
        'organizer',
        'county',
        'year',
        'date_begin',
        'date_end',
        'is_active',
        'color'
    ];

    protected $casts = [
        'date_begin' => 'date',
        'date_end' => 'date',
        'is_active' => 'boolean',
        'year' => 'integer'
    ];

    /**
     * Get the leagues that belong to this tournament series
     */
    public function leagues()
    {
        return $this->hasMany(League::class);
    }

    /**
     * Get active tournament series
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get tournaments count for this series
     */
    public function getTournamentCount()
    {
        return $this->leagues()->where('type', 'tournament')->count();
    }

    /**
     * Get total matches across all tournaments in series
     */
    public function getTotalMatches()
    {
        return $this->leagues()
            ->join('tennis_matches', 'leagues.id', '=', 'tennis_matches.league_id')
            ->count();
    }
}
