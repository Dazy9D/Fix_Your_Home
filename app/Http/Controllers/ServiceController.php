<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function listAvailable()
    {
        return response()->json([
            'Electrician',
            'Cook',
            'Cleaner',
            'Plumber',
            'Babysitter',
        ]);
    }
}


