<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use App\Models\UserRoomPermission;
use Illuminate\Http\Request;

class UserPermissionsController extends Controller
{
    public function store(Request $request, Room $room, $username, Permission $permission)
    {
        $this->authorize("manage_permissions", $room);

        $user = User::where("username", $username)->firstOrFail();

        $user = $room->users_room()->where("user_id", $user->id)->firstOrFail();

        abort_if($user->owner, 403);

        UserRoomPermission::firstOrCreate([
            "user_room_id" => $user->id,
            "permission_id" => $permission->id,
        ]);

        return new PermissionResource($permission);
    }

    public function destroy(Request $request, Room $room, $username, Permission $permission)
    {
        $this->authorize("manage_permissions", $room);

        $user = User::where("username", $username)->firstOrFail();

        $user = $room->users_room()->where("user_id", $user->id)->firstOrFail();

        abort_if($user->owner, 403);

        UserRoomPermission::where("user_room_id", $user->id)
            ->where("permission_id", $permission->id)
            ->delete();

        return response()->noContent();
    }
}
