<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Nikola Tosic',
            'email' => 'nikola@openinnovation.me',
            'username' => 'nikola',
            'password' => bcrypt('123'),
        ]);

        User::factory()->create([
            'name' => 'Bogdan Randjelovic',
            'email' => 'bogdan@openinnovation.me',
            'username' => 'bogdan',
            'password' => bcrypt('123'),
        ]);
        
    }
}
