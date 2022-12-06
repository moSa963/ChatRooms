<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomRequestResource;
use App\Http\Resources\ShowRoomResource;
use App\Models\Room;
use App\Models\UserRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RoomRequestsController extends Controller
{
    public function index(Request $request, Room $room)
    {
        $this->authorize("manage_members", $room);

        $users = $room->requests()
            ->select("users_rooms.*", "users.username as username")
            ->join("users", "users_rooms.user_id", "=", "users.id")
            ->where("users.username", "like", "%{$request->query('key', '')}%")
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10);

        return RoomRequestResource::collection($users);
    }

    public function store(Request $request, Room $room)
    {
        $banned = $room->banned_users()->where("user_id", $request->user()->id)->exists();

        abort_if($banned, 403, "you are banned from this room");

        abort_if($room->locked, 403, "This room does not accept any new requests");

        abort_if($banned, 403, "you are banned from this room");

        abort_if($room->all_users_room()->where("user_id", $request->user()->id)->exists(), 403, "you are already in the room");

        UserRoom::firstOrCreate([
            "user_id" => $request->user()->id,
            "room_id" => $room->id,
            "verified_at" => $room->is_private ? null : Carbon::today(),
            "user_verified_at" => Carbon::today(),
        ]);

        return new ShowRoomResource($room);
    }

    public function update(Request $request, Room $room, $req_id)
    {
        $req = $room->requests()->where("id", $req_id)->firstOrFail();

        $this->authorize("manage_members", $room);

        $req->verified_at = Carbon::today();
        $req->save();

        return response()->noContent();
    }

    public function destroy(Request $request, Room $room)
    {
        $user_room = UserRoom::where("room_id", $room->id)->where("user_id", $request->user()->id)->firstOrFail();

        $this->authorize("delete", $user_room);

        $user_room->delete();

        return new ShowRoomResource($room);
    }
}
