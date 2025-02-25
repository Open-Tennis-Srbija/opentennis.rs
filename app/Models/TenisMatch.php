<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenisMatch extends Model
{
    /** @use HasFactory<\Database\Factories\TenisMatchFactory> */
    use HasFactory;

    protected $fillable = [
        'winner_id',
        'loser_id',
        'set_score',
        'game_score',
        'match_date',
        'match_location',
    ];

    public function getNumber(){
        $matches = TenisMatch::all()->sortBy('match_date', SORT_REGULAR)->sortBy('date_created', SORT_REGULAR);

        $match_number = 0;
        foreach($matches as $m){
            $match_number++;
            if($m->id == $this->id){
                break;
            }
        }
        return $match_number;
    }

    public function getEloGains(){
        $winner = Player::find($this->winner_id);
        $loser = Player::find($this->loser_id);

        $winner_matches = TenisMatch::where('winner_id', $winner->id)->get();
        $loser_matches = TenisMatch::where('loser_id', $loser->id)->get();

        $winner_gain = $this->getEloGain($winner_matches,$this->winner_id);
        $loser_gain = $this->getEloGain($loser_matches, $this->loser_id, true);

        return [$winner_gain, $loser_gain];
    }

    private function getEloGain($matches, $player_id, $loser = false){
        $points = 0;

        $penalties = $this->getPenalties($matches, $player_id);

        if($loser == false){
            if($penalties['repetition_penalty'] == 0) $points += 100;
            if($penalties['repetition_penalty'] == 1) $points += 75;
            if($penalties['repetition_penalty'] > 1) $points += 50;

            $games_raw = $this->game_score;
            if($games_raw && $games_raw !== ''){
                $games_raw = str_replace(')', '', $games_raw);
                $games_raw = str_replace('(', '', $games_raw);
                $games = explode(',', $games_raw);
                foreach($games as $game){
                    $points += (int)substr($game, 0, 1) * 10;
                }
            }
            else{
                $points += (int)substr($this->set_score, 0, 1) * 10;
            }
        }
        else{
            if($penalties['repetition_penalty'] == 0) $points += 25;
            if($penalties['repetition_penalty'] == 1) $points += 20;
            if($penalties['repetition_penalty'] > 1) $points += 10;

            $games_raw = $this->game_score;
            if($games_raw && $games_raw !== ''){
                $games_raw = str_replace(')', '', $games_raw);
                $games_raw = str_replace('(', '', $games_raw);
                $games = explode(',', $games_raw);
                foreach($games as $game){
                    $points += (int)substr($game, 2, 1) * 7;
                }
            }
            else{
                $points += (int)substr($this->set_score, 2, 1) * 7;
            }
        }

        
        return round($points * (1 - $penalties['time_penalty']));
    }
    
    private function getPenalties($matches, $player_id){
        $today = date("Y-m-d");
        $date_dif = strtotime($today) - strtotime($this->match_date);
        $days = floor($date_dif / (60 * 60 * 24));
    
        $penalties['time_penalty'] = ($days > 30) ? min(0.1 * ($days / 30), 1) : 0;

        $penalties['repetition_penalty'] = 0;

        $winner = Player::find($this->winner_id);
        $loser = Player::find($this->loser_id);

        $match_key = ($this->winner_id == $player_id)
                    ? $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name
                    : $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;

        foreach ($matches as $match_compare) {
            if ($match_compare->id != $this->id){
                $winner = Player::find($match_compare->winner_id);
                $loser = Player::find($match_compare->loser_id);
        
                $search_key = ($match_compare->winner_id == $player_id)
                    ? $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name
                    : $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;
        
                if ($search_key == $match_key) {
                    $matchup_date_dif = strtotime($this->match_date) - strtotime($match_compare->match_date);
                    $matchup_days = floor($matchup_date_dif / (60 * 60 * 24));
                    if ($matchup_days < 30 && $matchup_days > 0) {
                        $penalties['repetition_penalty']++;
                    }
                }
            }
    
        }


        return $penalties;
    }
    
    public function getWinnerName(){
        $winner = Player::find($this->winner_id);
        return $winner->first_name . ' ' . $winner->last_name;
    }

    public function getPlayerUri($player){
        if($player == 'winner'){
            $winner = Player::find($this->winner_id);
            return $winner->uri;
        }else{
            $loser = Player::find($this->loser_id);
            return $loser->uri;
        }
    }

    public function getLoserName(){
        $loser = Player::find($this->loser_id);
        return $loser->first_name . ' ' . $loser->last_name;
    }

    public function getFormatedDate(){
        return date('D d M Y', strtotime($this->match_date));
    }
}
