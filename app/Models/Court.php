<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Court extends Model {
    /** @use HasFactory<\Database\Factories\TenisMatchFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'link',
    ];

}
