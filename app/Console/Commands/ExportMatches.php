<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ExportMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:export-matches';

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
        $this->info('Exporting matches...');

        $matches = \App\Models\TenisMatch::all();

        // Define CSV file path
        $filePath = storage_path('app/matches_export.csv');

        // Open file for writing
        $file = fopen($filePath, 'w');

        // Write CSV header
        fputcsv($file, ['Date', 'Winner', 'Loser', 'Set Score', 'Game Score']);

        foreach ($matches as $match) {
            $date = $match->match_date;
            $loser = $match->getLoserName();
            $winner = $match->getWinnerName();

            fputcsv($file, [
                $date,
                $winner,
                $loser,
                $match->set_score,
                $match->game_score == '' || $match->game_score == null ? '' : $match->game_score,
            ]);
        }

        fclose($file);

        $this->info('Matches exported successfully!');
        $this->info("File saved to: $filePath");
    }
}
