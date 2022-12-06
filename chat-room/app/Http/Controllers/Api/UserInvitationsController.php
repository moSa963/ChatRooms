<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\InviteResource;
use App\Http\Resources\RoomRequestResource;
use App\Http\Resources\RoomResource;
use App\Http\Resources\ShowRoomResource;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserInvitationsController extends Controller
{
    public function index(Request $request)
    {
        $users = $request->user()
            ->invites()
            ->where("name", "like", "%{$request->query('key', '')}%")
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10);

        return InviteResource::collection($users);
    }

    public function store(Request $request, Room $room, $username)
    {
        $this->authorize("manage_members", $room);

        $user = User::where("username", $username)->first();

        abort_if(!$user, 404, "this user does not exist.");

        abort_if($room->banned_users()->where("user_id", $user->id)->exists(), 403, "this user is banned.");

        UserRoom::firstOrcreate(
            [
                "user_id" => $user->id,
                "room_id" => $room->id,
            ],
            [
                "verified_at" => Carbon::today(),
                "user_verified_at" => null,
            ]
        );

        return response()->noContent();
    }


    public function update(Request $request, Room $room)
    {
        $req = $room->invited_users()->where("user_id", $request->user()->id)->firstOrFail();

        $req->user_verified_at = Carbon::today();
        $req->save();

        return new ShowRoomResource($room);
    }
}
