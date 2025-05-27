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
        'category',
        'uri',
        'location',
    ];


    public function getMatchups(){
        $matches = TenisMatch::where('winner_id', $this->id)
            ->orWhere('loser_id', $this->id)
            ->get();

        $players = Player::all();

        $matchups = [
            'wins' => [],
            'loses' => [],
            'notPlayedWith' => [],
        ];

        foreach($matches as $match){
            if($match->winner_id == $this->id){
                $loser = Player::find($match->loser_id);

                if(!isset($matchups['wins'][$loser->getName()])){
                    $matchups['wins'][$loser->getName()] = [
                        'name' => $loser->getName(),
                        'uri' => $loser->uri,
                        'number' => 1,
                    ];
                }
                else{
                    $matchups['wins'][$loser->getName()]['number']++;
                }
                foreach($players as $key=>$player){
                    if($player->id == $loser->id || $player->id == $this->id){
                        $players->forget($key);
                    }
                }
            }
            else{
                $winner = Player::find($match->winner_id);
                if(!isset($matchups['loses'][$winner->getName()])){
                    $matchups['loses'][$winner->getName()] = [
                        'name' => $winner->getName(),
                        'uri' => $winner->uri,
                        'number' => 1,
                    ];
                }
                else{
                    $matchups['loses'][$winner->getName()]['number']++;
                }
                   foreach($players as $key=>$player){
                    if($player->id == $winner->id || $player->id == $this->id){
                        $players->forget($key);
                    }
                }
            }
        }

        foreach($players as $player){
            array_push($matchups['notPlayedWith'], [
                'name' => $player->getName(),
                'uri' => $player->uri,
            ]);
        }
        usort($matchups['wins'], function($a, $b) {
            $comparison = $b['number'] <=> $a['number'];

            return $comparison ?: strcmp($a['name'], $b['name']);
        });
        usort($matchups['loses'], function($a, $b) {
            $comparison = $b['number'] <=> $a['number'];

            return $comparison ?: strcmp($a['name'], $b['name']);
        });
        usort($matchups['notPlayedWith'], function($a, $b) {

         return strcmp($a['name'], $b['name']);
        });
        return $matchups;

    }
    public function getName(){
        return $this->first_name . ' ' . $this->last_name;
    }
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
                'winner_uri' => $match->getPlayerUri('winner'),
                'loser_uri' => $match->getPlayerUri('loser'),
                'winner' => $this->first_name . ' ' . $this->last_name,
                'loser' => $loser->first_name . ' ' . $loser->last_name,
                'set_score' => $match->set_score,
                'number' => $match->getNumber(),
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
                'court' => $match->getCourt(),
                'league'=> $match->getLeague(),
            ]);
        }

        $loses = [];

        foreach($raw_loses as $match){
            $winner = Player::find($match->winner_id);

            array_push($loses, [
                'id' => $match->id,
                'winner_points' => NikolaAlgoV1::getMatchEloGains($match,'winner'),
                'loser_points' => NikolaAlgoV1::getMatchEloGains($match,'loser'),
                'winner_uri' => $match->getPlayerUri('winner'),
                'loser_uri' => $match->getPlayerUri('loser'),
                'winner' => $winner->first_name . ' ' . $winner->last_name,
                'loser' => $this->first_name . ' ' . $this->last_name,
                'set_score' => $match->set_score,
                'number' => $match->getNumber(),
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
                'league'=> $match->getLeague(),
                'court' => $match->getCourt(),
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

    public function getStatsOnDate($date){
        $total_matches = TenisMatch::where('winner_id', $this->id)
            ->orWhere('loser_id', $this->id)
            ->get();

        $filtered_matches = [];

        foreach($total_matches as $match){
            if(strtotime($match->match_date) <= strtotime($date)){
                array_push($filtered_matches, $match);
            }
        }
        return [
            'elo' => $this->getElo($filtered_matches),
        ];
    }

    public function getElo($matches) {

        $elo = NikolaAlgoV1::calculatePoints($matches, $this);

        return $elo;
    }

}

