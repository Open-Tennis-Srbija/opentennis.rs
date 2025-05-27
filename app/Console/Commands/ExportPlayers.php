<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ExportPlayers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:export-players';

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
        $this->info('Exporting players...');

        $players = \App\Models\Player::all();

        // Define CSV file path
        $filePath = storage_path('app/players_export.csv');   //

        // Open file for writing
        $file = fopen($filePath, 'w');
        // Write CSV header
        fputcsv($file, ['First name', 'Last name',]);

        foreach ($players as $player) {
            fputcsv($file, [
                $player->first_name,
                $player->last_name,
            ]);
        }
        fclose($file);
        $this->info('Players exported successfully!');
        $this->info("File saved to: $filePath");
    }
}
