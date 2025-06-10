<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TenisMatchController;
use App\Http\Controllers\CourtsController;
use App\Http\Controllers\LeaguesController;
use App\Http\Controllers\ResolverController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');
Route::get('/get-players', [PlayerController::class, 'getPlayers']);

Route::inertia('/mecevi', 'Matches', ['loadMatches' => true])->name('matches');
Route::get('/get-matches', [TenisMatchController::class, 'getMatches']);

Route::get('/get-player/{uri}', [PlayerController::class, 'get_player_by_uri']);
Route::get('/get-player-chart/{id}', [PlayerController::class, 'getChart']);

 Route::inertia('/dodaj', 'AddMatch', 
     ['players' => PlayerController::getPlayersForDropdown(), 
       'courts' => CourtsController::getCourts(), 
        'leagues' => LeaguesController::getLeagues(), 
     ] 
 )->name('addMatch'); 
 Route::post('/dodaj', [TenisMatchController::class, 'store']); 

Route::inertia('/lige-turniri', 'Leagues')->name('leagues');

Route::get('/get-leagues', [LeaguesController::class, 'getLeaguesForList']);
Route::get('/get-league/{uri}', [LeaguesController::class, 'returnLeague']);

Route::inertia('/dodaj-ligu', 'ForClubs')->name('clubs');

Route::inertia('/misija', 'Mision')->name('mision');

Route::inertia('/statistika', 'Statistics')->name('leagueStats');
Route::get('/get-statistics', [LeagueController::class, 'getStatistics']);
Route::get('/get-league-chart', [LeagueController::class, 'getLeagueChart']);

/* Route::post('/leagueChart',[LeagueController::class, 'getChart'])->name('leagueChart'); */
/**/

Route::inertia('/uputstva', 'Rules')->name('rules');

 Route::inertia('/admin/login', 'Auth/Login')->name('login'); 
 Route::post('/admin/login', [AuthController::class, 'login']); 

    Route::post('/getChart',[PlayerController::class, 'getChart'])->name('playerChart');
    Route::middleware('auth')->group(function(){

     Route::get('/izmeni/{number}',[TenisMatchController::class, 'editMatch'])->name('editMatch');
     Route::post('/izmeni', [TenisMatchController::class, 'updateMatch']);

     
     Route::get('/izmeni-ligu/{uri}', [LeaguesController::class, 'getLeagueForEdit'])->name('editLeague');
     Route::get('/liga/{uri}', [LeaguesController::class, 'returnForEdit'])->name('leagueByUri');
     Route::post('/izmeni-ligu/{uri}', [LeaguesController::class, 'updateLeague']);
     Route::post('/obrisi-ligu', [LeaguesController::class, 'deleteLeague']);

     Route::inertia('/tereni', 'Courts')->name('courts');
     Route::get('/get-courts', [CourtsController::class, 'getCourts']);
     Route::get('/izmeni-teren/{id}',[CourtsController::class, 'getEditCourt'])->name('editCourt');
     Route::get('/teren/{id}',[CourtsController::class, 'getCourtForEdit'])->name('courtById');
     Route::post('/teren/izmeni', [CourtsController::class, 'updateCourt']);
     Route::post('/teren/obrisi', [CourtsController::class, 'deleteCourt']);

     Route::get('/{uri}/izmeni',[PlayerController::class, 'getPlayer'])->name('editPlayer');
     Route::get('/teniser/{uri}',[PlayerController::class, 'getPlayerForEdit'])->name('playerByUri');
     Route::post('/teniser/izmeni',[PlayerController::class, 'updatePlayer']);
    //  Route::post('/{uri}/obrisi',[PlayerController::class, 'deletePlayer']);
    //  Route::post('/mec/obrisi',[TenisMatchController::class, 'deleteMatch']);

     Route::inertia('/admin', 'Home')->name('admin'); 

     Route::post('/logout',[AuthController::class, 'logout'])->name('logout');
 }); 

Route::get('/{uri}',[ResolverController::class, 'resolveUri'])->name('player');

/* Route::get('/{uri}','Player'); */
/* Route::get('/{uri}',PlayerController::class, 'getPlayerByUri'); */