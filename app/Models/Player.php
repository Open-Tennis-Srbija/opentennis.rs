<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use NikolaAlgoV1;

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
                'winner_points' =>NikolaAlgoV1::getMatchEloGains($match,'winner'),
                'loser_points' => NikolaAlgoV1::getMatchEloGains($match,'loser'),
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
                'winner_points' => NikolaAlgoV1::getMatchEloGains($match,'winner'),
                'loser_points' => NikolaAlgoV1::getMatchEloGains($match,'loser'),
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
        
        $elo = NikolaAlgoV1::calculatePoints($matches, $this);
        
        return $elo;
    }

}
    
