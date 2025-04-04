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

    public function getLeague(){
        $league = League::where('id', $this->league_id)->first();
        if(!$league){
            return [
                'id' => 1,
                'name' => '',
                'link' => '',
            ];
        }
        return [
            'id' => $league->id,
            'name' => $league->name,
            'link' => $league->link,
        ];
    }

    public function getCourt(){
        $court = Court::where('id', $this->court_id)->first();
        if(!$court){
            return [
                'id' => 1,
                'name' => '',
                'link' => '',
            ];
        }
        return [
            'id' => $court->id,
            'name' => $court->name,
            'link' => $court->link,
        ];
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
