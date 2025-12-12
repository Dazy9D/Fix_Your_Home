<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function listAvailable()
    {
        $options = DB::table('service_options')->pluck('name');
        return response()->json($options);
    }
}

