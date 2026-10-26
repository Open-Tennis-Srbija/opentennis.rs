<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourtPriceChange extends Model
{
    protected $fillable = [
        'court_id',
        'season',
        'morning',
        'afternoon',
        'weekend',
        'user_id',
    ];

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
