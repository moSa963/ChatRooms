<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{

    use RefreshDatabase, WithFaker;

    public function test_user_can_update_his_name()
    {
        $user = User::factory()->create();

        $new_name = $this->faker()->userName();

        Sanctum::actingAs($user);

        $response = $this->post('/api/user/update', [
            "name" => $new_name,
        ]);

        $response->assertSuccessful();
        $this->assertTrue(User::findOrFail($user->id)->name == $new_name);
    }

    public function test_user_can_update_his_username()
    {
        $user = User::factory()->create();

        $new_username = $this->faker()->userName();

        Sanctum::actingAs($user);

        $response = $this->post('/api/user/update', [
            "username" => $new_username,
        ]);

        $response->assertSuccessful();
        $this->assertTrue(User::findOrFail($user->id)->username == $new_username);
    }

    public function test_user_can_update_his_email()
    {
        $user = User::factory()->create();

        $new_email = $this->faker()->email();

        Sanctum::actingAs($user);

        $response = $this->post('/api/user/update', [
            "email" => $new_email,
        ]);

        $response->assertSuccessful();
        $this->assertTrue(User::findOrFail($user->id)->email == $new_email);
        $this->assertTrue(User::findOrFail($user->id)->email_verified_at == null);
    }

    public function test_user_cannot_update_his_username_with_one_already_taken()
    {
        $user = User::factory()->create();

        $new_username = $this->faker()->userName();

        User::factory()->create([
            "username" => $new_username,
        ]);

        Sanctum::actingAs($user);

        $response = $this->post('/api/user/update', [
            "username" => $new_username,
        ]);

        $response->assertInvalid();
    }
}
