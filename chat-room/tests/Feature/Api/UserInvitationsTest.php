<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserInvitationsTest extends TestCase
{
    use RefreshDatabase;


    public function test_user_can_get_invites_list()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->create();

        $user = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $user->id, "user_verified_at" => null]);

        Sanctum::actingAs($user);

        $response = $this->get("/api/user/invitations");

        $response->assertSuccessful();
        $response->assertJsonCount(1, "data");
    }

    public function test_owner_can_send_invite()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        $member = User::factory()->create();

        Sanctum::actingAs($owner);

        $response = $this->post("/api/rooms/{$room->id}/invitations/{$member->username}");

        $response->assertSuccessful();
        $this->assertTrue(UserRoom::where("room_id", $room->id)->where("user_id", $member->id)->exists());
    }

    public function test_user_can_accept_an_invite()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "owner" => true]);

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $user->id, "user_verified_at" => null]);
        Sanctum::actingAs($user);

        $response = $this->post("/api/rooms/{$room->id}/invitations/accept");

        $response->assertSuccessful();
    }
}
