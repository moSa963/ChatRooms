<?php

namespace Tests\Feature\Api;

use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RoomMessageTest extends TestCase
{
    use RefreshDatabase;

    public function test_room_member_can_get_list_of_messages()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();

        $user_room = UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $user->id]);

        Message::factory()->times(3)->create(["user_id" => $user->id, "room_id" => $room->id]);

        Sanctum::actingAs($user);

        $response = $this->get("/api/rooms/{$room->id}/messages");

        $response->assertSuccessful();
        $response->assertJsonCount(3, "data");
    }


    public function test_room_member_can_send_a_message()
    {

        $room = Room::factory()->create();
        $owner = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $owner->id, "owner" => true]);

        $data = [
            "title" => "this is the message",
        ];

        Sanctum::actingAs($owner);

        $response = $this->post("/api/rooms/{$room->id}/messages", $data);

        $response->assertSuccessful();
        $this->assertTrue($room->messages()->where("user_id", $owner->id)->exists());
    }

    public function test_user_cannot_send_a_message_in_a_room_he_has_not_joined()
    {

        $room = Room::factory()->create();
        $user = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "owner" => true]);

        $data = [
            "title" => "this is the message",
        ];

        Sanctum::actingAs($user);

        $response = $this->post("/api/rooms/{$room->id}/messages", $data);

        $response->assertForbidden();
        $this->assertTrue(!$room->messages()->where("user_id", $user->id)->exists());
    }

    public function test_owner_can_delete_message()
    {
        $room = Room::factory()->create();
        $user = User::factory()->create();

        UserRoom::factory()->create(["room_id" => $room->id, "user_id" => $user->id, "owner" => true]);

        $message = Message::factory()->create(["room_id" => $room->id]);

        Sanctum::actingAs($user);

        $response = $this->delete("/api/rooms/{$room->id}/messages/{$message->id}");

        $response->assertSuccessful();
        $this->assertTrue(boolval((Message::find($message->id))?->deleted));
    }
}
