<?php

Class EloAlgoV1{
    private static function expectedScore($playerElo, $opponentElo) {
        return 1 / (1 + pow(10, ($opponentElo - $playerElo) / 400));
    }
    
    
    
    private static function updateEloWithPenalty($winner, $loser, $eloRatings) {
        $matchCounts = [];

        $winner_name = $winner->first_name . ' ' . $winner->last_name;
        $loser_name = $loser->first_name . ' ' . $loser->last_name;

        $winnerElo = $eloRatings[$winner_name] ?? 1500;
        $loserElo = $eloRatings[$loser_name] ?? 1500;
        
        $expectedWinner = self::expectedScore($winnerElo, $loserElo);
        $expectedLoser = self::expectedScore($loserElo, $winnerElo);
        
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