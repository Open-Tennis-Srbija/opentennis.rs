<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::command('app:update-matches')
    ->dailyAt('00:00')
    ->runInBackground();

Schedule::command('app:update-rank-list')
    ->dailyAt('00:00')
    ->runInBackground();

Schedule::command('app:update-league-stats')
    ->dailyAt('00:00')
    ->runInBackground();
Schedule::command('app:update-players')
    ->dailyAt('00:00')
    ->runInBackground();
