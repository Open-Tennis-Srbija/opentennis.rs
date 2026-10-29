<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaguePriceChange extends Model
{
    protected $fillable = [
        'league_id',
        'price',
        'user_id',
    ];

    public function league()
    {
        return $this->belongsTo(League::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
