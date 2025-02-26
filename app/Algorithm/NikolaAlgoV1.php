<?php

use App\Models\Player;
use App\Models\TenisMatch;

class NikolaAlgoV1
{
    private static $time_decay = 0.05;
    private static $winner_game_gain = 10;
    private static $loser_game_gain = 7;

    private static function getBaseWinner($repetition)
    {
        switch ($repetition) {
            case 0:
                return 100;
            case 1:
                return 75;
            default:
                return 50;
        }
    }

    private static function getBaseLoser($repetition)
    {
        switch ($repetition) {
            case 0:
                return 25;
            case 1:
                return 20;
            default:
                return 15;
        }
    }



    public static function calculatePoints($matches,$player)
    {
        $points = 0;

        
        foreach ($matches as $match) {
            if ($match->winner_id == $player->id) {
                $points += self::getMatchEloGains($match, 'winner');
               
            } else {
                $points += self::getMatchEloGains($match, 'loser');
            }
        }

        return round($points);
    }


    public static function getMatchEloGains($match,$mode = null){
        
        if($mode == 'winner'){
            $winner = Player::find($match->winner_id);
            $winner_matches = TenisMatch::where('winner_id', $winner->id)->get();
            $winner_gain = self::getPlayerEloGain($match,$winner_matches,$match->winner_id);
            return $winner_gain;
        }
        else if($mode == 'loser'){
            $loser = Player::find($match->loser_id);
            $loser_matches = TenisMatch::where('loser_id', $loser->id)->get();
            $loser_gain = self::getPlayerEloGain($match,$loser_matches, $match->loser_id, true);
            return $loser_gain;
        }
        else{
            $winner = Player::find($match->winner_id);
            $winner_matches = TenisMatch::where('winner_id', $winner->id)->get();
            $winner_gain = self::getPlayerEloGain($match,$winner_matches,$match->winner_id);
            $loser = Player::find($match->loser_id);
            $loser_matches = TenisMatch::where('loser_id', $loser->id)->get();
            $loser_gain = self::getPlayerEloGain($match,$loser_matches, $match->loser_id, true);
            return [$winner_gain, $loser_gain];
        }
    }

    private static function getPlayerEloGain($match,$matches, $player_id, $loser = false){
        $points = 0;

        $penalties = self::getPenalties($match, $matches, $player_id);

        if($loser == false){
            $points += self::getBaseWinner($penalties['repetition_penalty']);

            $games_raw = $match->game_score;
            if($games_raw && $games_raw !== ''){
                $games_raw = str_replace(')', '', $games_raw);
                $games_raw = str_replace('(', '', $games_raw);
                $games = explode(',', $games_raw);
                foreach($games as $game){
                    $points += (int)substr($game, 0, 1) * self::$winner_game_gain;
                }
            }
            else{
                $points += (int)substr($match->set_score, 0, 1) * self::$winner_game_gain;
            }
        }
        else{
           $points += self::getBaseLoser($penalties['repetition_penalty']);

            $games_raw = $match->game_score;
            if($games_raw && $games_raw !== ''){
                $games_raw = str_replace(')', '', $games_raw);
                $games_raw = str_replace('(', '', $games_raw);
                $games = explode(',', $games_raw);
                foreach($games as $game){
                    $points += (int)substr($game, 2, 1) * self::$loser_game_gain;
                }
            }
            else{
                $points += (int)substr($match->set_score, 2, 1) * self::$loser_game_gain;
            }
        }

        
        return round($points * (1 - $penalties['time_penalty']));
    }
    
    private static function getPenalties($match,$matches, $player_id){
        $today = date("Y-m-d");
        $date_dif = strtotime($today) - strtotime($match->match_date);
        $days = floor($date_dif / (60 * 60 * 24));
    
        $penalties['time_penalty'] = ($days > 30) ? min(self::$time_decay * ($days / 30), 1) : 0;

        $penalties['repetition_penalty'] = 0;

        $winner = Player::find($match->winner_id);
        $loser = Player::find($match->loser_id);

        $match_key = ($match->winner_id == $player_id)
                    ? $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name
                    : $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;

        foreach ($matches as $match_compare) {
            if ($match_compare->id != $match->id){
                $winner = Player::find($match_compare->winner_id);
                $loser = Player::find($match_compare->loser_id);
        
                $search_key = ($match_compare->winner_id == $player_id)
                    ? $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name
                    : $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;
        
                if ($search_key == $match_key) {
                    $matchup_date_dif = strtotime($match->match_date) - strtotime($match_compare->match_date);
                    $matchup_days = floor($matchup_date_dif / (60 * 60 * 24));
                    if ($matchup_days < 30 && $matchup_days > 0) {
                        $penalties['repetition_penalty']++;
                    }
                }
            }
    
        }


        return $penalties;
    }





}
