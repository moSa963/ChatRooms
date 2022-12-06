<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Room;
use App\Models\User;
use App\Models\UserBan;
use App\Models\UserRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserBansController extends Controller
{
    public function index(Request $request, Room $room)
    {
        $this->authorize("manage_members", $room);

        $users = $room->banned_users()
            ->where("username", "like", "%{$request->query('key', '')}%")
            ->simplePaginate(10);

        return UserResource::collection($users);
    }

    public function store(Request $request, Room $room, $username)
    {
        $this->authorize("manage_members", $room);

        $user = User::where("username", $username)->firstOrFail();

        $user_room = $room->users_room()->where("user_id", $user->id)->first();

        if ($user_room) {
            abort_if($user_room->owner, 403);
            $user_room->delete();
        }

        UserBan::create([
            "created_by" => $request->user()->id,
            "user_id" => $user->id,
            "room_id" => $room->id,
        ]);

        return response()->noContent();
    }

    public function destroy(Request $request, Room $room, $username)
    {
        $user = User::where("username", $username)->firstOrFail();

        $this->authorize("manage_members", $room);

        UserBan::where("user_id", $user->id)->where("room_id", $room->id)->delete();

        return response()->noContent();
    }
}
