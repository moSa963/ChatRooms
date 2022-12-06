<?php

namespace Tests\Feature\Api;

use App\Models\Permission;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use App\Models\UserRoomPermission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserPermissionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_give_permission_to_a_member()
    {
        $room = Room::factory()->create();
        $owner = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        $member = UserRoom::factory()->create(["room_id" => $room->id, "user_id" => User::factory()->create()->id]);

        $per = Permission::create(["name" => "somthing"]);

        Sanctum::actingAs($owner);

        $response = $this->post("/api/rooms/{$room->id}/users/{$member->user->username}/permissions/{$per->id}");

        $response->assertSuccessful();
        $this->assertTrue(UserRoomPermission::where("user_room_id", $member->id)->where("permission_id", $per->id)->exists());
    }
}
