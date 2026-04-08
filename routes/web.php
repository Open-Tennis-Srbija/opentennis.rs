<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\StaticController;
use App\Http\Controllers\TenisMatchController;
use App\Http\Controllers\CourtsController;
use App\Http\Controllers\LeaguesController;
use App\Http\Controllers\ResolverController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\TournamentSeriesController;
use App\Http\Middleware\RedirectLoggedIn;
use Illuminate\Support\Facades\Route;


// PROMO
Route::redirect('/crazy-pizza', '/');
Route::redirect('/nagrade', '/');
Route::redirect('/uputstva', '/o-nama');

Route::get('/', [StaticController::class, 'home'])->name('home');

Route::get('/teniseri', [StaticController::class, 'players'])->name('home');
Route::get('/get-players', [PlayerController::class, 'getPlayers']);

Route::get('/mecevi', [StaticController::class, 'matches'])->name('matches');
Route::get('/mec/{uri}', [TenisMatchController::class, 'getMatchByUri'])->name('match');
Route::get('/get-matches', [TenisMatchController::class, 'getMatches']);
Route::get('/api/matches', [TenisMatchController::class, 'getMatchesApi']);
Route::get('/api/match/{number}', [TenisMatchController::class, 'getMatchNumberApi']);

Route::get('/get-player/{uri}', [PlayerController::class, 'get_player_by_uri']);
Route::get('/api/player/{id}/matches', [PlayerController::class, 'getPlayerMatchesApi']);
Route::get('/get-player-chart/{id}', [PlayerController::class, 'getChart']);

Route::get('/dodaj', [StaticController::class, 'addMatch'])->name('addMatch');
Route::post('/dodaj', [TenisMatchController::class, 'store']);

Route::get('/dodaj-dubl', [StaticController::class, 'addDouble'])->name('addDouble');
Route::post('/dodaj-dubl', [TenisMatchController::class, 'storeDouble']);

Route::get('/lige', [StaticController::class, 'leagues'])->name('leagues');
Route::get('/turniri', [StaticController::class, 'tournaments'])->name('tournaments');

Route::get('/get-leagues', [LeaguesController::class, 'getLeaguesForList']);
Route::get('/get-tournaments', [LeaguesController::class, 'getTournamentsForList']);
Route::get('/tournament-series', [TournamentSeriesController::class, 'index']);
Route::get('/api/tournament-series', [TournamentSeriesController::class, 'index']);
Route::get('/get-league/{uri}', [LeaguesController::class, 'returnLeague']);
Route::get('/api/league/{id}/matches', [LeaguesController::class, 'getLeagueMatchesApi']);

Route::inertia('/dodaj-ligu', 'static/ForClubs')->name('clubs');

Route::get('/misija', [StaticController::class, 'mission'])->name('mision');

Route::inertia('/statistika', 'static/Statistics')->name('leagueStats');
Route::get('/get-statistics', [LeagueController::class, 'getStatistics']);
Route::get('/get-league-chart', [LeagueController::class, 'getLeagueChart']);

/* Route::post('/leagueChart',[LeagueController::class, 'getChart'])->name('leagueChart'); */
/**/

Route::get('/o-nama', [StaticController::class, 'rules'])->name('rules');
Route::get('/tereni', [StaticController::class, 'courts'])->name('courts');
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


     Route::inertia('/dodaj-turnir','Auth/admin/leagues/AddTournament',['courts' => CourtsController::getCourts(),'series' => TournamentSeriesController::getAllSeries()])->name('addTournament');
     Route::get('/izmeni-turnir/{uri}', [LeaguesController::class, 'getTournamentForEdit'])->name('editTournament');
    
     Route::inertia('/dodaj-novu-ligu','Auth/admin/leagues/AddLeague',['courts' => CourtsController::getCourts()])->name('addLeague');
     Route::post('/dodaj-ligu', [LeaguesController::class, 'store']);
    
     Route::get('/izmeni-ligu/{uri}', [LeaguesController::class, 'getLeagueForEdit'])->name('editLeague');
     Route::get('/liga/{uri}', [LeaguesController::class, 'returnForEdit'])->name('leagueByUri');
     Route::post('/izmeni-ligu/{uri}', [LeaguesController::class, 'updateLeague']);
    
     Route::inertia('/upravljaj-serijama', 'Auth/admin/leagues/EditSeries')->name('editSeries');

     Route::get('/turnir/{uri}', [LeaguesController::class, 'returnTournamentForEdit'])->name('tournamentByUri');
     Route::post('/izmeni-turnir/{uri}', [LeaguesController::class, 'updateTournament']);
     
     Route::post('/obrisi-ligu', [LeaguesController::class, 'deleteLeague']);

     // Tournament Series API routes
     Route::post('/api/tournament-series', [TournamentSeriesController::class, 'store']);
     Route::put('/api/tournament-series/bulk', [TournamentSeriesController::class, 'bulkUpdate']);
     Route::put('/api/tournament-series/{tournamentSeries}', [TournamentSeriesController::class, 'update']);
     Route::delete('/api/tournament-series/{tournamentSeries}', [TournamentSeriesController::class, 'destroy']);

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

// SEO Sitemap Routes
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/sitemap-static.xml', function() {
    return response()->view('sitemap.static', [
        'staticPages' => config('seo.sitemap.static_pages', [])
    ])->header('Content-Type', 'text/xml');
});
Route::get('/sitemap-players.xml', [SitemapController::class, 'players']);
Route::get('/sitemap-matches.xml', [SitemapController::class, 'matches']);
Route::get('/sitemap-leagues.xml', [SitemapController::class, 'leagues']);
Route::get('/sitemap-courts.xml', [SitemapController::class, 'courts']);

Route::get('/{uri}',[ResolverController::class, 'resolveUri'])->name('player');

/* Route::get('/{uri}','Player'); */
/* Route::get('/{uri}',PlayerController::class, 'getPlayerByUri'); */
