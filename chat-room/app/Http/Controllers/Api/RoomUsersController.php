<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Http\Resources\RoomUserResource;
use App\Http\Resources\ShowRoomResource;
use App\Http\Resources\UserResource;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RoomUsersController extends Controller
{
    public function index(Request $request, Room $room)
    {
        $this->authorize("view", $room);

        $users = $room->users()
            ->where("username", "like", "%{$request->query('key', '')}%")
            ->selectRaw("(SELECT COUNT(id) FROM user_room_permissions where user_room_id = users_rooms.id) as permissionsCount")
            ->orderBy("permissionsCount", "DESC")
            ->simplePaginate(10)
            ->withQueryString();

        return UserResource::collection($users);
    }

    public function show(Request $request, Room $room, $username)
    {
        $this->authorize("view", $room);

        $user = User::where("username", $username)->firstOrFail();

        $user = $room->users_room()->where("user_id", $user->id)->firstOrFail();

        return new RoomUserResource($user);
    }

    public function destroy(Request $request, Room $room, $username)
    {
        $user = User::where("username", $username)->firstOrFail();

        $user_room = $user->user_rooms()->where("room_id", $room->id)->firstOrFail();

        $this->authorize("delete", $user_room);

        $user_room->delete();

        return new ShowRoomResource($room);
    }
}
