<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoomImageTest extends TestCase
{

    use RefreshDatabase, WithFaker;

    public function test_user_can_add_a_room_image()
    {
        $user = UserRoom::factory()->create([
            "user_id" => User::factory()->create()->id,
            "owner" => true,
        ]);

        Sanctum::actingAs($user->user);

        $response = $this->post("/api/rooms/{$user->room_id}/image", [
            "image" => UploadedFile::fake()->image("myimage.png"),
        ]);

        $response->assertSuccessful();

        $this->assertTrue(Storage::exists("rooms/{$user->room_id}"));

        Storage::delete("rooms/" . $user->room_id);
    }
}
