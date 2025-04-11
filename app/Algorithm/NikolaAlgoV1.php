<?php


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
            $winner = $match->winners()->first();
            $winner_matches = $winner->matches();
            $winner_gain = self::getPlayerEloGain($match,$winner_matches,$winner->id);
            return $winner_gain;
        }
        else if($mode == 'loser'){
            $loser = $match->losers()->first();
            $loser_matches = $loser->matches();
            $loser_gain = self::getPlayerEloGain($match,$loser_matches, $loser->id, true);
            return $loser_gain;
        }
        else{
            $winner = $match->winners()->first();
            $winner_matches = $winner->matches();
            $winner_gain = self::getPlayerEloGain($match,$winner_matches,$winner->id);
            $loser = $match->losers()->first();
            $loser_matches = $loser->matches();
            $loser_gain = self::getPlayerEloGain($match,$loser_matches, $loser->id, true);
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
        $date_dif = strtotime($today) - strtotime($match->date);
        $days = floor($date_dif / (60 * 60 * 24));

        $penalties['time_penalty'] = ($days > 30) ? min(self::$time_decay * ($days / 30), 1) : 0;


        $penalties['repetition_penalty'] = 0;

        $winner = $match->winners()->first();
        $loser = $match->losers()->first();

        $match_key = '';
        if($player_id == $match->winner_id){
            $match_key = $winner->first_name . ' ' . $winner->last_name . '-' . $loser->first_name . ' ' . $loser->last_name;
        }
        else{
            $match_key = $loser->first_name . ' ' . $loser->last_name . '-' . $winner->first_name . ' ' . $winner->last_name;
        }

        foreach ($matches as $match_compare) {
            if ($match_compare->id != $match->id){
                $c_winner = $match_compare->winners()->first();
                $c_loser = $match_compare->losers()->first();
                $search_key = '';

                if($player_id == $match_compare->winner_id){
                    $search_key = $c_winner->first_name . ' ' . $c_winner->last_name . '-' . $c_loser->first_name . ' ' . $c_loser->last_name;
                }
                else{
                    $search_key = $c_loser->first_name . ' ' . $c_loser->last_name . '-' . $c_winner->first_name . ' ' . $c_winner->last_name;
                }

                if ($search_key == $match_key) {
                    $matchup_date_dif = strtotime($match->date) - strtotime($match_compare->date);
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
