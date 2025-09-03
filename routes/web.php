<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TenisMatchController;
use App\Http\Controllers\CourtsController;
use App\Http\Controllers\LeaguesController;
use App\Http\Controllers\ResolverController;
use App\Http\Middleware\RedirectLoggedIn;
use Illuminate\Support\Facades\Route;


// PROMO
Route::inertia('/crazy-pizza', 'static/CrazyPizza')->name('crazyPizza');

Route::inertia('/', 'players/Players')->name('home');
Route::get('/get-players', [PlayerController::class, 'getPlayers']);

Route::inertia('/mecevi', 'matches/Matches', ['loadMatches' => true])->name('matches');
Route::get('/get-matches', [TenisMatchController::class, 'getMatches']);
Route::get('/api/matches', [TenisMatchController::class, 'getMatchesApi']);

Route::get('/get-player/{uri}', [PlayerController::class, 'get_player_by_uri']);
Route::get('/api/player/{id}/matches', [PlayerController::class, 'getPlayerMatchesApi']);
Route::get('/get-player-chart/{id}', [PlayerController::class, 'getChart']);

Route::inertia('/dodaj', 'matches/AddMatch',
    ['players' => PlayerController::getPlayersForDropdown(),
    'courts' => CourtsController::getCourts(),
    'leagues' => LeaguesController::getLeagues(),
    ]
)->name('addMatch');
Route::post('/dodaj', [TenisMatchController::class, 'store']);

Route::inertia('/dodaj-dubl', 'matches/AddDouble',
    ['players' => PlayerController::getPlayersForDropdown(),
    'courts' => CourtsController::getCourts(),
    'leagues' => LeaguesController::getLeagues(),
    ]
)->name('addDouble');
Route::post('/dodaj-dubl', [TenisMatchController::class, 'storeDouble']);

Route::inertia('/lige-turniri', 'leagues/Leagues')->name('leagues');

Route::get('/get-leagues', [LeaguesController::class, 'getLeaguesForList']);
Route::get('/get-league/{uri}', [LeaguesController::class, 'returnLeague']);
Route::get('/api/league/{id}/matches', [LeaguesController::class, 'getLeagueMatchesApi']);

Route::inertia('/dodaj-ligu', 'static/ForClubs')->name('clubs');

Route::inertia('/misija', 'static/Mision')->name('mision');

Route::inertia('/statistika', 'static/Statistics')->name('leagueStats');
Route::get('/get-statistics', [LeagueController::class, 'getStatistics']);
Route::get('/get-league-chart', [LeagueController::class, 'getLeagueChart']);

/* Route::post('/leagueChart',[LeagueController::class, 'getChart'])->name('leagueChart'); */
/**/

Route::inertia('/uputstva', 'static/Rules')->name('rules');
Route::inertia('/tereni', 'courts/Courts')->name('courts');
Route::get('/tereni/{uri}',[CourtsController::class, 'getCourt'])->name('court');
Route::get('/get-court/{id}',[CourtsController::class, 'get_court'])->name('court');
Route::get('/get-courts', [CourtsController::class, 'getCourtList']);
Route::get('/api/court/{id}/matches', [CourtsController::class, 'getCourtMatchesApi']);


 Route::inertia('/admin/login', 'Auth/Login')->middleware(RedirectLoggedIn::class)->name('login');
 Route::post('/admin/login', [AuthController::class, 'login']);

    Route::post('/getChart',[PlayerController::class, 'getChart'])->name('playerChart');
    Route::middleware('auth')->group(function(){

     Route::get('/izmeni/{number}',[TenisMatchController::class, 'editMatch'])->name('editMatch');
     Route::post('/izmeni', [TenisMatchController::class, 'updateMatch']);
     Route::post('/izmeni-dubl', [TenisMatchController::class, 'updateDouble']);
     Route::post('/mec/obrisi',[TenisMatchController::class, 'deleteMatch']);


     Route::inertia('/dodaj-turnir','Auth/admin/leagues/AddLeague',['courts' => CourtsController::getCourts()])->name('addLeague');
     Route::post('/dodaj-ligu', [LeaguesController::class, 'store']);
     Route::get('/izmeni-ligu/{uri}', [LeaguesController::class, 'getLeagueForEdit'])->name('editLeague');
     Route::get('/liga/{uri}', [LeaguesController::class, 'returnForEdit'])->name('leagueByUri');
     Route::post('/izmeni-ligu/{uri}', [LeaguesController::class, 'updateLeague']);
     Route::post('/obrisi-ligu', [LeaguesController::class, 'deleteLeague']);

     Route::inertia('/dodaj-teren','Auth/admin/courts/AddCourt')->name('addCourt');
     Route::post('/teren/dodaj', [CourtsController::class, 'store']);
     Route::get('/izmeni-teren/{id}',[CourtsController::class, 'getEditCourt'])->name('editCourt');
     Route::get('/get-court-for-edit/{id}',[CourtsController::class, 'getCourtForEdit'])->name('courtById');
     Route::post('/teren/izmeni', [CourtsController::class, 'updateCourt']);
     Route::post('/teren/obrisi', [CourtsController::class, 'deleteCourt']);

     Route::get('/{uri}/izmeni',[PlayerController::class, 'getPlayer'])->name('editPlayer');
     Route::get('/teniser/{uri}',[PlayerController::class, 'getPlayerForEdit'])->name('playerByUri');
     Route::post('/teniser/izmeni',[PlayerController::class, 'updatePlayer']);


     Route::get('/import-meceva', [TenisMatchController::class, 'batchImport'])->name('batchImport');
     Route::post('/import-matches', [TenisMatchController::class, 'importMatches']);
     
     Route::get('/import-dublova', [TenisMatchController::class, 'batchDoubles'])->name('batchDoubles');
     Route::post('/import-doubles', [TenisMatchController::class, 'importDoubles']);
    //  Route::post('/{uri}/obrisi',[PlayerController::class, 'deletePlayer']);

     Route::inertia('/admin', 'players/Players')->name('admin');

     Route::post('/logout',[AuthController::class, 'logout'])->name('logout');
 });

Route::get('/{uri}',[ResolverController::class, 'resolveUri'])->name('player');

/* Route::get('/{uri}','Player'); */
/* Route::get('/{uri}',PlayerController::class, 'getPlayerByUri'); */
