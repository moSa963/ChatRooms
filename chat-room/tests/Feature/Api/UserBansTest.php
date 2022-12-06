<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\User;
use App\Models\UserBan;
use App\Models\UserRoom;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserBansTest extends TestCase
{
    use RefreshDatabase;


    public function test_room_owner_can_get_a_list_of_banned_users()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->create();
        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        UserBan::create([
            "created_by" => $owner->id,
            "user_id" => User::factory()->create()->id,
            "room_id" => $room->id,
        ]);

        Sanctum::actingAs($owner);

        $response = $this->get("/api/rooms/{$room->id}/bans");

        $response->assertSuccessful();
        $response->assertJsonCount(1, "data");
    }

    public function test_room_owner_can_ban_user()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->create();
        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        $user = User::factory()->create();

        Sanctum::actingAs($owner);

        $response = $this->post("/api/rooms/{$room->id}/bans/{$user->username}");

        $response->assertSuccessful();
        $this->assertTrue($room->banned_users()->where("user_id", $user->id)->exists());
    }

    public function test_room_owner_can_unban_user()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->create();
        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        $user = User::factory()->create();

        UserBan::create([
            "created_by" => $owner->id,
            "user_id" => $user->id,
            "room_id" => $room->id,
        ]);

        Sanctum::actingAs($owner);
        $response = $this->delete("/api/rooms/{$room->id}/bans/{$user->username}");

        $response->assertSuccessful();
        $this->assertFalse($room->banned_users()->where("user_id", $user->id)->exists());
    }
}
