<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserImageTest extends TestCase
{
    use RefreshDatabase;


    public function test_user_can_set_his_profile_image()
    {
        $user = User::factory()->create();

        Sanctum::actingAs($user);

        $response = $this->post('/api/user/image', [
            "image" => UploadedFile::fake()->image("myimage.png"),
        ]);

        $response->assertSuccessful();

        $this->assertTrue(Storage::exists("users/{$user->username}"));

        Storage::delete("users/" . $user->username);
    }
}
