<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoomRequestsTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_get_requests_list()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->Create();


        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->create()->id, "verified_at" => null]);
        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->create()->id, "verified_at" => null]);
        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->create()->id, "verified_at" => null]);

        Sanctum::actingAs($owner);

        $response = $this->get("/api/rooms/{$room->id}/requests");

        $response->assertSuccessful();
        $response->assertJsonCount(3, "data");
    }


    public function test_user_can_join_a_public_room()
    {
        $room = Room::factory()->create(["is_private" => false]);
        $user = User::factory()->Create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->Create()->id, "owner" => true]);

        Sanctum::actingAs($user);

        $response = $this->post("/api/rooms/{$room->id}/requests");

        $response->assertSuccessful();

        $member = UserRoom::where("user_id", $user->id)->where("room_id", $room->id)->first();

        $this->assertTrue($member && $member->verified_at != null);
    }

    public function test_user_can_send_a_request_for_a_private_room()
    {
        $room = Room::factory()->create(["is_private" => true]);
        $user = User::factory()->Create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->Create()->id, "owner" => true]);

        Sanctum::actingAs($user);

        $response = $this->post("/api/rooms/{$room->id}/requests");

        $response->assertSuccessful();

        $member = UserRoom::where("user_id", $user->id)->where("room_id", $room->id)->first();

        $this->assertTrue($member && $member->verified_at == null);
    }

    public function test_owner_can_accept_a_request_to_join_a_room()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->Create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        $member = UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->create()->id, "verified_at" => null]);

        Sanctum::actingAs($owner);

        $response = $this->post("/api/rooms/{$room->id}/requests/{$member->id}/accept");

        $response->assertSuccessful();

        $member = UserRoom::find($member->id);

        $this->assertTrue($member && $member->verified_at != null);
    }
}
