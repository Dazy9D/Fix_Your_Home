<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\AuthAccount;
use App\Models\Customer;
use App\Models\Worker;
use App\Models\JobRequest;
use Illuminate\Support\Facades\Hash;

class RateJobTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_rate_completed_job()
    {
        // create auth & customer
        $auth = AuthAccount::create(['email' => 'user2@test.local', 'password' => Hash::make('password'), 'type' => 'user']);
        $customer = Customer::create(['customer_id' => $auth->id, 'name' => 'User2', 'email' => 'user2@test.local', 'phone' => '123']);

        $wAuth = AuthAccount::create(['email' => 'worker2@test.local', 'password' => Hash::make('password'), 'type' => 'worker']);
        $worker = Worker::create(['worker_id' => $wAuth->id, 'name' => 'Worker2', 'email' => 'worker2@test.local', 'phone' => '000']);

        $job = JobRequest::create([
            'customer_id' => $customer->customer_id,
            'worker_id' => $worker->worker_id,
            'title' => 'Test Job',
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        // act as user and post rating
        $this->actingAs($auth, 'sanctum')
            ->postJson('/api/user/job-requests/'.$job->id.'/rating', ['rating' => 4])
            ->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('job_requests', ['id' => $job->id, 'rating' => 4]);
    }

    public function test_user_cannot_rate_twice()
    {
        $auth = AuthAccount::create(['email' => 'user3@test.local', 'password' => Hash::make('password'), 'type' => 'user']);
        $customer = Customer::create(['customer_id' => $auth->id, 'name' => 'User3', 'email' => 'user3@test.local', 'phone' => '123']);

        $wAuth = AuthAccount::create(['email' => 'worker3@test.local', 'password' => Hash::make('password'), 'type' => 'worker']);
        $worker = Worker::create(['worker_id' => $wAuth->id, 'name' => 'Worker3', 'email' => 'worker3@test.local', 'phone' => '000']);

        $job = JobRequest::create([
            'customer_id' => $customer->customer_id,
            'worker_id' => $worker->worker_id,
            'title' => 'Test Job 2',
            'status' => 'completed',
            'completed_at' => now(),
            'rating' => 5,
            'rating_at' => now(),
        ]);

        $this->actingAs($auth, 'sanctum')
            ->postJson('/api/user/job-requests/'.$job->id.'/rating', ['rating' => 3])
            ->assertStatus(409);
    }

    public function test_cannot_rate_uncompleted_job()
    {
        $auth = AuthAccount::create(['email' => 'user4@test.local', 'password' => Hash::make('password'), 'type' => 'user']);
        $customer = Customer::create(['customer_id' => $auth->id, 'name' => 'User4', 'email' => 'user4@test.local', 'phone' => '123']);

        $wAuth = AuthAccount::create(['email' => 'worker4@test.local', 'password' => Hash::make('password'), 'type' => 'worker']);
        $worker = Worker::create(['worker_id' => $wAuth->id, 'name' => 'Worker4', 'email' => 'worker4@test.local', 'phone' => '000']);

        $job = JobRequest::create([
            'customer_id' => $customer->customer_id,
            'worker_id' => $worker->worker_id,
            'title' => 'Test Job 3',
            'status' => 'in_progress',
        ]);

        $this->actingAs($auth, 'sanctum')
            ->postJson('/api/user/job-requests/'.$job->id.'/rating', ['rating' => 5])
            ->assertStatus(422);
    }
}
