<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\AuthAccount;
use App\Models\Customer; // if you keep customers table

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        if (AuthAccount::where('email', 'admin@gmail.com')->exists()) {
            return;
        }

        $auth = AuthAccount::create([
            'email'    => 'admin@gmail.com',
            'password' => Hash::make('givemeaccess'),
            'type'     => 'admin',
        ]);

    }
}
