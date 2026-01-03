<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\AuthAccount;
use App\Models\Customer;
use App\Models\Worker;
use App\Models\JobRequest;

class RatingTestSeeder extends Seeder
{
    public function run(): void
    {
        // Create a test user auth account
        $auth = AuthAccount::firstOrCreate(
            ['email' => 'user@test.local'],
            ['password' => Hash::make('password'), 'type' => 'user']
        );

        // Ensure customer record exists
        $customer = Customer::firstOrCreate(
            ['customer_id' => $auth->id],
            ['name' => 'Test User', 'email' => 'user@test.local', 'phone' => '1234567890']
        );

        // Create a test worker auth account
        $wAuth = AuthAccount::firstOrCreate(
            ['email' => 'worker@test.local'],
            ['password' => Hash::make('password'), 'type' => 'worker']
        );

        // Ensure worker record exists
        $worker = Worker::firstOrCreate(
            ['worker_id' => $wAuth->id],
            ['name' => 'Test Worker', 'email' => 'worker@test.local', 'phone' => '0987654321', 'approval_status' => 'approved']
        );

        // Create a completed job for the customer
        $job = JobRequest::create([
            'customer_id' => $customer->customer_id,
            'worker_id' => $worker->worker_id,
            'title' => 'Fix sink',
            'description' => 'Fix the leaking sink',
            'budget' => 50.00,
            'final_price' => 50.00,
            'status' => 'completed',
            'scheduled_at' => now()->subDays(3),
            'completed_at' => now()->subDays(1),
        ]);
    }
}
