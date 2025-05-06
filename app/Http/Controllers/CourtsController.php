<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Court;

class CourtsController extends Controller
{
    public static function getCourts(){
        $courts = Court::where('id', '>', 1)->orderByRaw('LOWER(name)')->get();
        return $courts;
    }

    //
}
