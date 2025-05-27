<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class UpdatePlayersWithRank extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-players-with-rank';

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
        $filePath = storage_path('app/players_with_rank.csv'); // Adjust path as needed

        if (!file_exists($filePath) || !is_readable($filePath)) {
            $this->error("CSV file not found or not readable: $filePath");
            return;
        }

        $data = [];
        if (($handle = fopen($filePath, 'r')) !== false) {
            $header = fgetcsv($handle); // Read the first row as header
            while (($row = fgetcsv($handle)) !== false) {
                $data[] = array_combine($header, $row); // Combine header with row values
            }
            fclose($handle);
        }

        $this->info('Loaded ' . count($data) . ' rows from CSV.');

        foreach ($data as $row) {
            $firstName = $row['First name'];
            $lastName = $row['Last name'];
            $rank = $row['rank'];

            // Find the player by first and last name
            $player = \App\Models\Player::where('first_name', $firstName)
                ->where('last_name', $lastName)
                ->first();

            if ($player) {
                $player->category = $rank;
                $player->save();
                $this->info("Updated {$firstName} {$lastName} to rank {$rank}");
            } else {
                $this->warn("Player not found: {$firstName} {$lastName}");
            }
        }
    }
}
