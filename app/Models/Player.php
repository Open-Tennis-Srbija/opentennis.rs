<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'club',
        'uri',
        'location',
    ];
    
    public function getMatches(){
        $raw_wins =TenisMatch::where('winner_id', $this->id)->get()->sortBy('match_date', SORT_REGULAR,true)->sortBy('date_created', SORT_REGULAR);
        $raw_loses = TenisMatch::where('loser_id', $this->id)->get()->sortBy('match_date', SORT_REGULAR,true)->sortBy('date_created', SORT_REGULAR);;


        $wins = [];
        foreach($raw_wins as $match){
            $loser = Player::find($match->loser_id);

            array_push($wins, [
                'id' => $match->id,
                'winner' => $this->first_name . ' ' . $this->last_name,
                'loser' => $loser->first_name . ' ' . $loser->last_name,
                'set_score' => $match->set_score,
                'number' => $match->getNumber(),
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
            ]);
        }

        $loses = [];

        foreach($raw_loses as $match){
            $winner = Player::find($match->winner_id);

            array_push($loses, [
                'id' => $match->id,
                'winner' => $winner->first_name . ' ' . $winner->last_name,
                'loser' => $this->first_name . ' ' . $this->last_name,
                'set_score' => $match->set_score,
                'number' => $match->getNumber(),
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
            ]);
        }

        return [
            $wins, $loses
        ];
    }

    public function getStats()
    {
        $total_matches = TenisMatch::where('winner_id', $this->id)
            ->orWhere('loser_id', $this->id)->get();

        $wins = TenisMatch::where('winner_id', $this->id)
            ->count();
        
        $loses = $total_matches->count() - $wins;

        $win_precentage = $total_matches->count() > 0 ? ($wins / $total_matches->count()) * 100 : 0;

        return [
            'total_matches' => $total_matches->count(),
            'wins' => $wins,
            'loses' => $loses,
            'win_precentage' => round($win_precentage),
            'elo' => $this->getElo($total_matches),
        ];
    }

    public function getElo($matches) {
        
        $elo = $this->getPointsByNikola($matches);
        
        return $elo;
    }


    private function getPointsByNikolaRecursive($matches, $index = 0, $points = 0) {
        if ($index >= count($matches)) {
            return round($points);
        }
    
        $match = $matches[$index];
        $match_points = 0;
    
        if ($match->winner_id == $this->id) {
            if($match->repetition_penalty == 0) $match_points += 100;
            if($match->repetition_penalty == 1) $match_points += 75;
            if($match->repetition_penalty > 1) $match_points += 50;
    
            $games_raw = $match->game_score;
            if($games_raw && $games_raw !== ''){
                $games_raw = str_replace(')', '', $games_raw);
                $games_raw = str_replace('(', '', $games_raw);
                $games = explode(',', $games_raw);
                foreach($games as $game){
                    $match_points += (int)substr($game, 0, 1) * 10;
                }
            }
        } else {
            if($match->repetition_penalty == 0) $match_points += 25;
            if($match->repetition_penalty == 1) $match_points += 20;
            if($match->repetition_penalty > 1) $match_points += 15;
    
            $games_raw = $match->game_score;
            if($games_raw && $games_raw !== ''){
                $games_raw = str_replace(')', '', $games_raw);
                $games_raw = str_replace('(', '', $games_raw);
                $games = explode(',', $games_raw);
                foreach($games as $game){
                    $match_points += (int)substr($game, 0, 1) * 7;
                }
            }
        }
    
        $points += $match_points * (1 - $match->time_penalty);
    
        return $this->getPointsByNikolaRecursive($matches, $index + 1, $points);
    }

    private function getPointsByNikola($matches) {
       $points = 0;

       $mathces_with_penalties = $this->calculatePenaltiesRecursive($matches);

         foreach ($mathces_with_penalties as $match) {
            $match_points = 0;

             if($match->winner_id == $this->id){
                if($match->repetition_penalty == 0) $match_points += 100;
                if($match->repetition_penalty == 1) $match_points += 75;
                if($match->repetition_penalty > 1) $match_points += 50;

                $games_raw = $match->game_score;
                if($games_raw && $games_raw !== ''){
                    $games_raw = str_replace(')', '', $games_raw);
                    $games_raw = str_replace('(', '', $games_raw);
                    $games = explode(',', $games_raw);
                    foreach($games as $game){
                        $match_points += (int)substr($game, 0, 1) * 10;
                    }
                }
                else{
                    $match_points += (int)substr($match->set_score, 0, 1) * 10;
                }

             }


             else{
                if($match->repetition_penalty == 0) $match_points += 25;
                if($match->repetition_penalty == 1) $match_points += 20;
                if($match->repetition_penalty > 1) $match_points += 15;

                if($match->game_score && $match->game_score !== ''){
                    str_replace(')', '', $match->game_score);
                    str_replace('(', '', $match->game_score);
                    $games = explode(',', $match->game_score);

                    foreach($games as $game){
                        $match_points += (int)substr($game, 3, 1) * 7;
                    }
                }
                else{
                    $match_points += (int)substr($match->set_score, 3, 1) * 7;
                }
             }
             $points += $match_points * (1 - $match->time_penalty);
                
         }
        
       return round($points);
    }
    private function calculatePenaltiesRecursive($matches, $index = 0, $matches_with_penalties = []){
        if ($index >= count($matches)) {
            return $matches_with_penalties;
        }
    
        $today = date("Y-m-d");
        $match = $matches[$index];
        $date_dif = strtotime($today) - strtotime($match->match_date);
        $days = floor($date_dif / (60 * 60 * 24));
    
        $time_penalty = ($days > 30) ? min(0.1 * ($days / 30), 1) : 0;
        $repetition_penalty = 0;
    
        $winner = Player::find($match->winner_id);
        $loser = Player::find($match->loser_id);
    
        $match_key = ($match->winner_id == $this->id)
            ? $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name
            : $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;
    
        foreach ($matches as $match_compare) {
            if ($match_compare->id == $match->id) continue;
    
            $winner = Player::find($match_compare->winner_id);
            $loser = Player::find($match_compare->loser_id);
    
            $search_key = ($match_compare->winner_id == $this->id)
                ? $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name
                : $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;
    
            if ($search_key == $match_key) {
                $matchup_date_dif = strtotime($match->match_date) - strtotime($match_compare->match_date);
                $matchup_days = floor($matchup_date_dif / (60 * 60 * 24));
                if ($matchup_days < 30 && $matchup_days > 0) {
                    $repetition_penalty++;
                }
            }
        }
    
        $match['repetition_penalty'] = $repetition_penalty;
        $match['time_penalty'] = $time_penalty;
    
        $matches_with_penalties[] = $match;
    
        return $this->calculatePenaltiesRecursive($matches, $index + 1, $matches_with_penalties);
    }
    
    private function calculatePenalties($matches){
        $today = date("Y-m-d");
        $matches_with_penalties = [];

        
        foreach ($matches as $match) {
            $date_dif = strtotime($today) - strtotime($match->match_date);
            $days = floor($date_dif / (60 * 60 * 24));
            $repetition_penalty = 0;
            
            // Every 30 days a match declines by 10%
            $time_penalty = 0; 
            if($days > 30)
                $time_penalty = 0.1 * ($days / 30);
            
            if($time_penalty > 1) $time_penalty = 1;
        
            $winner = Player::find($match->winner_id);
            $loser = Player::find($match->loser_id);

            if($match->winner_id == $this->id){
                $match_key = $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name;

            }
            else{
                $match_key = $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;
            }
            
            foreach($matches as $match_compare){
                if($match_compare->id == $match->id)
                    continue;

                $winner = Player::find($match_compare->winner_id);
                $loser = Player::find($match_compare->loser_id);
                $search_key = '';

                if($match_compare->winner_id == $this->id){
                    $search_key = $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name;

                }
                else{
                    $search_key = $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;
                }

                if($search_key == $match_key){
                    $matchup_date_dif = strtotime($match->match_date) - strtotime($match_compare->match_date);
                    $matchup_days = floor($matchup_date_dif / (60 * 60 * 24));
                    if($matchup_days < 30 && $matchup_days > 0){
                        $repetition_penalty++;
                    }
                }
            }

            $match['repetition_penalty'] = $repetition_penalty;
            $match['time_penalty'] = $time_penalty;
            
            // Each match against the same player in 30 days is penalized


            array_push($matches_with_penalties, $match);
        }

        return $matches_with_penalties;
    }

    private function expectedScore($playerElo, $opponentElo) {
        return 1 / (1 + pow(10, ($opponentElo - $playerElo) / 400));
    }
    
    
    
    private function updateEloWithPenalty($winner, $loser, $eloRatings) {
        $matchCounts = [];

        $winner_name = $winner->first_name . ' ' . $winner->last_name;
        $loser_name = $loser->first_name . ' ' . $loser->last_name;

        $winnerElo = $eloRatings[$winner_name] ?? 1500;
        $loserElo = $eloRatings[$loser_name] ?? 1500;
        
        $expectedWinner = $this->expectedScore($winnerElo, $loserElo);
        $expectedLoser = $this->expectedScore($loserElo, $winnerElo);
        
        $matchupKey1 = $winner_name . '-' . $loser_name;
        $matchupKey2 = $loser_name .  '-' . $winner_name;
        $matchupCount = ($matchCounts[$matchupKey1] ?? 0) + ($matchCounts[$matchupKey2] ?? 0);
        $penaltyFactor = max(0.1, 1 - 0.1 * $matchupCount);
        
        $eloRatings[$winner_name] = $winnerElo + (32 * $penaltyFactor) * (1 - $expectedWinner);
        $eloRatings[$loser_name] = $loserElo + (32 * $penaltyFactor) * (0 - $expectedLoser);
        
        $matchCounts[$matchupKey1] = ($matchCounts[$matchupKey1] ?? 0) + 1;
        $matchCounts[$matchupKey2] = ($matchCounts[$matchupKey2] ?? 0) + 1;

        return $eloRatings;
    }
    
}
