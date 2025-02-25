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

        $player_name = $this->first_name . ' ' . $this->last_name;

        $elo = [];
        foreach ($matches as $match) {
            $winner = Player::find($match["winner_id"]);
            $loser = Player::find($match["loser_id"]);

            $elo = $this->updateEloWithPenalty($winner, $loser, $elo);
        }
        
        if(isset($elo[$player_name]))
            return round($elo[$player_name]);
        return 0;
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
