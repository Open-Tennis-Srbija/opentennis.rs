<?php

namespace Database\Seeders;

use App\Models\Player;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $unwanted_array = array(
            'Š' => 'S',
            'š' => 's',
            'Ž' => 'Z',
            'ž' => 'z',
            'À' => 'A',
            'Á' => 'A',
            'Â' => 'A',
            'Ã' => 'A',
            'Ä' => 'A',
            'Å' => 'A',
            'Æ' => 'A',
            'ć' => 'c',
            'č'=> 'c',
            'đ'=> 'dj',
            'È' => 'E',
            'É' => 'E',
            'Ê' => 'E',
            'Ë' => 'E',
            'Ì' => 'I',
            'Í' => 'I',
            'Î' => 'I',
            'Ï' => 'I',
            'Ñ' => 'N',
            'Ò' => 'O',
            'Ó' => 'O',
            'Ô' => 'O',
            'Õ' => 'O',
            'Ö' => 'O',
            'Ø' => 'O',
            'Ù' => 'U',
            'Ú' => 'U',
            'Û' => 'U',
            'Ü' => 'U',
            'Ý' => 'Y',
            'Þ' => 'B',
            'ß' => 'ss',
            'à' => 'a',
            'á' => 'a',
            'â' => 'a',
            'ã' => 'a',
            'ä' => 'a',
            'å' => 'a',
            'æ' => 'a',
            'ç' => 'c',
            'è' => 'e',
            'é' => 'e',
            'ê' => 'e',
            'ë' => 'e',
            'ì' => 'i',
            'í' => 'i',
            'î' => 'i',
            'ï' => 'i',
            'ð' => 'o',
            'ñ' => 'n',
            'ò' => 'o',
            'ó' => 'o',
            'ô' => 'o',
            'õ' => 'o',
            'ö' => 'o',
            'ø' => 'o',
            'ù' => 'u',
            'ú' => 'u',
            'û' => 'u',
            'ý' => 'y',
            'þ' => 'b',
            'ÿ' => 'y',
            'Ğ' => 'G',
            'İ' => 'I',
            'Ş' => 'S',
            'ğ' => 'g',
            'ı' => 'i',
            'ş' => 's',
            'ü' => 'u',
            'ă' => 'a',
            'Ă' => 'A',
            'ș' => 's',
            'Ș' => 'S',
            'ț' => 't',
            'Ț' => 'T'
        );

        $data = json_decode(file_get_contents(__DIR__ . '/players.json'));

        foreach ($data as $player) {
            $model = new Player();

            $uri_firstname = strtr($player->first_name, $unwanted_array);
            $uri_lastname = strtr($player->last_name, $unwanted_array);

            $uri = strtolower($uri_firstname) . '-' . strtolower($uri_lastname);

            $index = 0;

            while (Player::where('uri', $uri)->exists()) {
                $uri = $uri . $index;
                $index++;
            }


            $model->first_name = $player->first_name;
            $model->uri = $uri;
            $model->last_name = $player->last_name;
            $model->club = $player->club;
            $model->location = $player->location;

            $model->save();
        }
    }
}
