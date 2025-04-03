<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\TenisMatchController;
use Illuminate\Support\Facades\Storage;


class UpdateMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-matches';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update matches with the latest data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Matches updated successfully.');
        // You can add your logic here to update matches
        // For example, you can call a service or a model method to perform the update
        $matches = TenisMatchController::getMatches();

        Storage::disk('public')->put('matches.json', json_encode($matches));

    }
}
