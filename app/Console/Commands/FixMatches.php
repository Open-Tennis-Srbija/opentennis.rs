<?php

namespace App\Console\Commands;

use App\Models\TennisMatch;
use Illuminate\Console\Command;

class FixMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fix-matches';

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
        // get all matches, newest first, sort by date, and date_created
        $matches = TennisMatch::orderBy('date', 'asc')
            ->orderBy('created_at', 'asc')
            ->get();

        $i = 1;
        // Fix the matches
        foreach ($matches as $match) {
            $match->number = $i;
            $match->save();
            $i++;
        }
    }
}
