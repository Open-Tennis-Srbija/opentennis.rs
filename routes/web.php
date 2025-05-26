<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TenisMatchController;
use App\Http\Controllers\CourtsController;
use App\Http\Controllers\LeaguesController;
use Illuminate\Support\Facades\Route;
use Ziggy\Ziggy;


Route::inertia('/', 'Home',
    [ 'players' => PlayerController::getCachedPlayers()]
)->name('home');

Route::inertia('/mecevi', 'Matches',
['matches' => TenisMatchController::getCachedMatches()]
)->name('matches');

Route::inertia('/dodaj', 'AddMatch',
    ['players' => PlayerController::getPlayersForDropdown(),
      'courts' => CourtsController::getCourts(),
       'leagues' => LeaguesController::getLeagues(),
    ]
)->name('addMatch');
Route::post('/dodaj', [TenisMatchController::class, 'store']);



Route::inertia('/dodaj-ligu', 'ForClubs')->name('clubs');

Route::inertia('/misija', 'Mision')->name('mision');

Route::inertia('/statistika', 'Statistics',
    ['data' => LeagueController::getCachedStatistics()]
)->name('leagueStats');

Route::post('/leagueChart',[LeagueController::class, 'getChart'])->name('leagueChart');


Route::inertia('/pravila', 'Rules')->name('rules');

Route::inertia('/admin/login', 'Auth/Login')->name('login');
Route::post('/admin/login', [AuthController::class, 'login']);

Route::post('/getChart',[PlayerController::class, 'getChart'])->name('playerChart');


Route::middleware('auth')->group(function(){

    Route::get('/izmeni/{id}',[TenisMatchController::class, 'editMatch'])->name('editMatch');
    Route::post('/izmeni', [TenisMatchController::class, 'updateMatch']);

    Route::get('/teniser/izmeni/{id}',[PlayerController::class, 'getPlayer'])->name('editPlayer');
    Route::post('/teniser/izmeni',[PlayerController::class, 'updatePlayer']);
    Route::post('/teniser/obrisi',[PlayerController::class, 'deletePlayer']);
    Route::post('/mec/obrisi',[TenisMatchController::class, 'deleteMatch']);

    Route::inertia('/admin', 'Auth/Dashboard',
    ['data' => AuthController::getDashboardData()])->name('admin');

    Route::post('/logout',[AuthController::class, 'logout'])->name('logout');
});


Route::get('/{uri}',[PlayerController::class, 'show'])->name('player');

