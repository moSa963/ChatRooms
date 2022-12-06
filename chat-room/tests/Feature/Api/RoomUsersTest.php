<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoomUsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_get_rooms_members()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();

        UserRoom::factory()->create([
            "room_id" => $room->id,
            "user_id" => $user->id,
            "owner" => true,
        ]);

        UserRoom::factory()->create(["room_id" => $room->id]);
        UserRoom::factory()->create(["room_id" => $room->id]);
        UserRoom::factory()->create(["room_id" => $room->id]);
        UserRoom::factory()->create(["room_id" => $room->id, "verified_at" => null]);

        Sanctum::actingAs($user);

        $response = $this->get("/api/rooms/{$room->id}/users");

        $response->assertSuccessful();
        $response->assertJsonCount(4, "data");
    }

    public function test_user_can_cancel_joining_a_room()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();

        $member = UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $user->id]);
        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->create()->id, "owner" => true]);

        Sanctum::actingAs($user);


        $response = $this->delete("/api/rooms/{$room->id}/users/{$member->user->username}");

        $response->assertSuccessful();
        $this->assertFalse(UserRoom::where("id", $member->id)->exists());
    }

    public function test_room_owner_can_kick_user_out()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        $member = UserRoom::factory()->create(["room_id" => $room->id]);

        Sanctum::actingAs($owner);

        $response = $this->delete("/api/rooms/{$room->id}/users/{$member->user->username}");

        $response->assertSuccessful();
        $this->assertFalse(UserRoom::where("id", $member->id)->exists());
    }
}
