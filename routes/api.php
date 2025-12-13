<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ServiceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Make something great!
|
*/

/**
 * Public auth routes
 * - user register
 * - worker register
 * - login
 * - password reset flow
 */
Route::post('/register/user',   [AuthController::class, 'registerUser']);
Route::post('/register/worker', [AuthController::class, 'registerWorker']);
Route::post('/login',           [AuthController::class, 'login']);

// password reset (Laravel password broker)
Route::post('/forgot-password', [PasswordController::class, 'sendResetLinkEmail'])
    ->name('password.email');
Route::post('/reset-password',  [PasswordController::class, 'reset'])
    ->name('password.update');

/**
 * Public data for forms
 * - list of available services for worker signup
 */
Route::get('/available-services', [ServiceController::class, 'listAvailable']);

/**
 * Protected routes (need token via Sanctum)
 * - current user
 * - logout
 * - example protected admin route
 */
Route::middleware('auth:sanctum')->group(function () {
    // return current authenticated auth account
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    // logout (delete current access token)
    Route::post('/logout', [AuthController::class, 'logout']);

    // example admin-only route
    Route::get('/admin/dashboard', function (Request $request) {
        if ($request->user()->type !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json([
            'message' => 'Welcome, admin',
        ]);
    });
});
