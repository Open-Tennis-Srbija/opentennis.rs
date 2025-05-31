<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\TenisMatchController;
use App\Models\TenisMatch;
use Illuminate\Support\Facades\Storage;

class UpdateMatch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-match {matchId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $this->info('Finding match with ID '.$this->argument('matchId').'...');
        $m = TenisMatch::find($this->argument('matchId'));

        if (!$m) {
            $this->error('Match with ID '.$this->argument('matchId').' not found.');
            return;
        }
        else{
            $this->info('Match with ID '.$this->argument('matchId').' found.');
        }

        $this->comment('Updating match....');

        TenisMatchController::update_match_cache($m);

        $this->info('Matches updated successfully.');
    }
}
