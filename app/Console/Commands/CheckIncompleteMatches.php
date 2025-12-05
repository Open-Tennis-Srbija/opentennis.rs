<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TennisMatch;

class CheckIncompleteMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'matches:check-incomplete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for matches without winners or losers';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking for incomplete matches...');
        $this->newLine();

        // Check for matches without winners
        $matchesWithoutWinners = TennisMatch::doesntHave('winners')->get();
        
        if ($matchesWithoutWinners->count() > 0) {
            $this->error('Found ' . $matchesWithoutWinners->count() . ' match(es) without winners:');
            foreach ($matchesWithoutWinners as $match) {
                $this->line('  - Match ID: ' . $match->id . ', Number: ' . $match->number . ', Date: ' . $match->date);
            }
            $this->newLine();
        } else {
            $this->info('✓ All matches have winners');
        }

        // Check for matches without losers
        $matchesWithoutLosers = TennisMatch::doesntHave('losers')->get();
        
        if ($matchesWithoutLosers->count() > 0) {
            $this->error('Found ' . $matchesWithoutLosers->count() . ' match(es) without losers:');
            foreach ($matchesWithoutLosers as $match) {
                $this->line('  - Match ID: ' . $match->id . ', Number: ' . $match->number . ', Date: ' . $match->date);
            }
            $this->newLine();
        } else {
            $this->info('✓ All matches have losers');
        }

        $totalIncomplete = $matchesWithoutWinners->count() + $matchesWithoutLosers->count();
        
        if ($totalIncomplete === 0) {
            $this->info('✓ All matches are complete!');
        } else {
            $this->error('Total incomplete matches: ' . $totalIncomplete);
        }

        return Command::SUCCESS;
    }
}
