<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\League;

class LeaguesController extends Controller
{
    //
    public static function getLeagues(){
        return League::where('id', '>', 1)->orderBy('name')->get();
    }
}
