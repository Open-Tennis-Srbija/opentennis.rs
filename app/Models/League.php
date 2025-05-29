<?php

namespace App\Models;

use App\Http\Controllers\PlayerController;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use NikolaAlgoV1;

class League extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'link',
    ];


    public function getMatchCount()
    {
        return TenisMatch::where('league_id', $this->id)->count();
    }

    public function getPlayerCount()
    {
        return DB::table(function ($query) {
            $query->select('winner_id as player_id')
                ->from('tenis_matches')
                ->where('league_id', $this->id)
                ->union(
                    DB::table('tenis_matches')
                        ->select('loser_id as player_id')
                        ->where('league_id', $this->id)
                );
        }, 'players')
            ->selectRaw('COUNT(DISTINCT player_id) as count')
            ->value('count');
    }

    public function getMatches(){
        $matches = TenisMatch::where('league_id', $this->id)->get();

        $response = [];

        foreach($matches as $match){
            
            $winner = Player::find($match->winner_id);
            $loser = Player::find($match->loser_id);

            array_push($response, [
                'id' => $match->id,
                'winner_points' =>NikolaAlgoV1::getMatchEloGains($match,'winner'),
                'loser_points' => NikolaAlgoV1::getMatchEloGains($match,'loser'),
                'winner_uri' => $match->getPlayerUri('winner'),
                'loser_uri' => $match->getPlayerUri('loser'),
                'winner' => $winner->first_name . ' ' . $winner->last_name,
                'loser' => $loser->first_name . ' ' . $loser->last_name,
                'set_score' => $match->set_score,
                'number' => $match->getNumber(),
                'game_score' => $match->game_score,
                'date' => $match->match_date,
                'location' => $match->match_location,
                'court' => $match->getCourt(),
                'league'=> $match->getLeague(),
            ]);
            usort($response, function($a, $b) {
                return $b['number'] <=> $a['number'];
            });
        }
        return $response;
    }

    public function getPlayers(){
        $ids = $this->playerIds()->all();

        $raw_players = Player::whereIn('id', $ids)->get();

        $players = [];
        foreach($raw_players as $player){
            array_push($players, [
                'uri' => $player->uri,
                'name' => $player->first_name . ' ' . $player->last_name
            ]);
        }


        usort($players, function($a, $b) {
            return strcmp($a['name'], $b['name']);
        });

        return $players;
    }

    private function playerIds(){
            return DB::table(function ($query) {
            $query->select('winner_id as player_id')
                ->from('tenis_matches')
                ->where('league_id', $this->id)
                ->union(
                    DB::table('tenis_matches')
                        ->select('loser_id as player_id')
                        ->where('league_id', $this->id)
                );
        }, 'players')
        ->distinct()
        ->pluck('player_id');
    }


    public function getPoints()
    {
        $points = 0;

        $matches = TenisMatch::where('league_id', $this->id)->get();

        foreach ($matches as $match) {
            $gains = NikolaAlgoV1::getMatchEloGains($match);
            $points += $gains[0] + $gains[1];
        }

        return $points;
    }
}
