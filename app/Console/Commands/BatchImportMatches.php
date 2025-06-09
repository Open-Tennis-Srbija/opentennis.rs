<?php

namespace App\Console\Commands;

use App\Models\Court;
use App\Models\League;
use App\Models\Player;
use App\Models\TennisMatch;
use DateTime;
use Helper;
use Helpers;
use Illuminate\Console\Command;
use NikolaAlgoV1;

class BatchImportMatches extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:batch-import-matches {file_name}';

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
        $file_name = $this->argument('file_name');
        $filePath = storage_path('app/'. $file_name . '.csv');

        if (!file_exists($filePath)) {
            $this->error("File not found: $filePath");
            return 1;
        }

        if (($handle = fopen($filePath, 'r')) !== false) {
            $header = null;
            while (($row = fgetcsv($handle)) !== false) {
                if (!$header) {
                    $header = $row;
                    continue;
                }

                $data = array_combine($header, $row);
                $league_name = $data['Ime lige ili turnira'];
                $court_name = $data['teren ili klub'];
                $county = $data['opština'];
                $winner_name = $data['pobednik (ime i prezime)'];
                $loser_name = $data['gubitnik (ime i prezime)'];
                $set_score = $data['rezultat u setovima (2:0)'];
                $game_score = $data['rezultat u gemovima (6:3,4:2)'];
                $date = new DateTime($data['datum meča (dd mm gggg)']);
                
                $league = League::where('name', $league_name)->first();

                if(!$league){
                    $league = new League();
                    $league->name = $league_name;

                    $league->link = '';

                    $uri = str_replace(' - ','-',$league->name);
                    $uri = str_replace(' ','-',$uri);
                    $uri = str_replace(',','',$uri);
                    $uri = strtolower($uri);
                    $league->uri = $uri; 

                    $league->county = $county;

                    $league->save();
                }

                $court = Court::where('name', $court_name)->first();

                if(!$court){
                    $court = new Court();
                    $court->name = $court_name;

                    $court->link = '';

                    $court->save();
                }
                
                
                
                
                $existing = TennisMatch::where('league_id', $league->id)->get();
                $existing_match = null;
                
                foreach($existing as $match){
                    $match_winner_name = $match->winners()->first()->first_name . ' ' . $match->winners()->first()->last_name;
                    $match_loser_name = $match->losers()->first()->first_name . ' ' . $match->losers()->first()->last_name;
                
                    if($match_winner_name == $winner_name 
                        && $match_loser_name == $loser_name 
                        && $match->set_score == $set_score
                        && $match->game_score == $game_score){
                            $existing_match = $match;
                        }
                }

                if(isset($existing_match)){
                    $existing_match->date = $date;
                    $existing_match->save();
                    $this->info('Updated match #' . $existing_match->number .  PHP_EOL);
                }
                else{
                    $match = new TennisMatch();
                    $match->court_id = $court->id;
                    $match->league_id = $league->id;
                    $match->date = $date->format('Y-m-d');
                    $match->set_score = $set_score;
                    $match->game_score = $game_score;
                    $match->county = 'Pančevo';


                    $match->winner_point_gain = 0;
                    $match->loser_point_gain = 0;
                    $match->save();
                    
                    $compare = TennisMatch::where('date', '<=', $match->date)->orderByDesc('number')->orderByDesc('created_at')->first();
                    
                    $match->number = $compare->number + 1;
                    
                    $rest_matches = TennisMatch::where('number', '>=', $match->number)->get();

                    foreach($rest_matches as $m){
                        if($m->id !== $match->id){
                            $m->number = $m->number + 1;
                            $m->save();
                        }
                    }

                   
                    
                    $winner_first_name = explode(' ',$winner_name)[0];
                    $winner_last_name = explode(' ',$winner_name)[1];

                    $loser_first_name = explode(' ',$loser_name)[0];
                    $loser_last_name = explode(' ',$loser_name)[1];

                    $new_winner = $this->check_existing_player($match,$winner_first_name, $winner_last_name, 'winner');
                    $new_loser = $this->check_existing_player($match,$loser_first_name, $loser_last_name, 'loser');

                    $new_players = $new_winner + $new_loser;

                    $winner = $match->winners()->first();
                    $loser = $match->losers()->first();
                    $match->save();

                     [$winner_gains, $loser_gains] = NikolaAlgoV1::getMatchEloGains($match);
                    $match->winner_point_gain = $winner_gains;
                    $match->loser_point_gain = $loser_gains;

                    $match->save();
        
                    $winner->points += $winner_gains;
                    $loser->points += $loser_gains; 
                    $winner->save();
                    $loser->save();

                    Helpers::UpdateRanks();
                    Helpers::UpdatePlayerCharts($winner, $loser, $match);
                    Helpers::UpdateStatsChart($new_players, $winner_gains + $loser_gains, $match->date);

                    $this->info('Imported match #' . $match->number . PHP_EOL);
                }

            }
            fclose($handle);
        } else {
            $this->error("Could not open file: $filePath");
            return 1;
        }

        $this->info('Import finished.');
        return 0;
    }


    function check_existing_player($match,$first_name,$last_name,$mode){
        $player = Player::where('first_name', $first_name)->where('last_name', $last_name)->first();
        $new = 0;

        if(!$player){
            $player = new Player();
            $player->first_name = $first_name;
            $player->last_name = $last_name;

            $uri_firistname = Helper::formatName($first_name);
            $uri_lastname = Helper::formatName($last_name);
            
            $player->uri = strtolower($uri_firistname) . '-' . strtolower($uri_lastname);

            $player->save();

            $new = 1;
        }


        $match->players()->attach($player->id,['team'=>$mode]);
        return $new;

    }
}
