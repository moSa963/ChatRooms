<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\Room;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RoomPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Room $room)
    {
        return $room->is_private == false || $room->users_room()->where("user_id", $user->id)->exists();
    }

    public function manage_room(User $user, Room $room)
    {
        $u = $room->users_room()->where("user_id", $user->id)->first();

        return $u && ($u->owner || $u->permissions()->where("permissions.id", Permission::$MANAGE_ROOM)->exists());
    }

    public function manage_members(User $user, Room $room)
    {
        $u = $room->users_room()->where("user_id", $user->id)->first();

        return $u && ($u->owner || $u->permissions()->where("permissions.id", Permission::$MANAGE_MEMBERS)->exists());
    }

    public function manage_permissions(User $user, Room $room)
    {
        $u = $room->users_room()->where("user_id", $user->id)->first();

        return $u && ($u->owner || $u->permissions()->where("permissions.id", Permission::$MANAGE_PERMISSIONS)->exists());
    }

    public function manage_messages(User $user, Room $room)
    {
        $u = $room->users_room()->where("user_id", $user->id)->first();

        return $u && ($u->owner || $u->permissions()->where("permissions.id", Permission::$MANAGE_MESSAGES)->exists());
    }

    public function delete(User $user, Room $room)
    {
        return $room->users_room()->where("user_id", $user->id)->where("owner", true)->exists();
    }
}
