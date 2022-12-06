<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoomTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_get_rooms_list()
    {
        $user = User::factory()->create();

        UserRoom::factory()->create([
            "user_id" => $user->id,
            "owner" => true,
        ]);

        UserRoom::factory()->create([
            "user_id" => $user->id,
        ]);

        UserRoom::factory()->create([
            "user_id" => $user->id,
            "owner" => true,
        ]);

        UserRoom::factory()->create([
            "user_id" => $user->id,
            "verified_at" => null,
        ]);

        Sanctum::actingAs($user);

        $response = $this->get('/api/rooms');

        $response->assertSuccessful();

        $response->assertJsonCount(3, "data");
    }

    public function test_user_can_view_a_room()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();

        UserRoom::factory()->create([
            "user_id" => $user->id,
            "room_id" => $room->id,
            "owner" => true,
            "verified_at" => Carbon::today(),
        ]);

        Sanctum::actingAs($user);

        $response = $this->get("/api/rooms/{$room->id}");

        $response->assertSuccessful();
    }


    public function test_user_can_create_a_new_room()
    {
        $user = User::factory()->create();

        $data = [
            "name" => "myRoom",
            "description" => "this is my room",
        ];

        Sanctum::actingAs($user);

        $response = $this->post('/api/rooms', $data);

        $response->assertSuccessful();
        $response->assertJsonPath("data.name", $data["name"]);
        $this->assertTrue(Room::where("name", $data["name"])->exists());
    }

    public function test_user_can_delete_his_room()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();

        UserRoom::factory()->create([
            "user_id" => $user->id,
            "room_id" => $room->id,
            "owner" => true,
            "verified_at" => Carbon::today(),
        ]);

        Sanctum::actingAs($user);

        $response = $this->delete("/api/rooms/{$room->id}");

        $response->assertSuccessful();

        $this->assertFalse(Room::where('id', $room->id)->exists());
    }

    public function test_user_can_not_delete_other_user_room()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();
        $user1 = User::factory()->create();

        UserRoom::factory()->create([
            "user_id" => $user->id,
            "room_id" => $room->id,
            "owner" => true,
            "verified_at" => Carbon::today(),
        ]);

        Sanctum::actingAs($user1);

        $response = $this->delete("/api/rooms/{$room->id}");

        $response->assertForbidden();

        $this->assertTrue(Room::where('id', $room->id)->exists());
    }
}
