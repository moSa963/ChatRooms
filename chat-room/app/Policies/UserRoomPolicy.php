<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserRoomPolicy
{
    use HandlesAuthorization;

    public function delete(User $user, UserRoom $userRoom)
    {
        $u = $userRoom->room->users_room()->where("user_id", $user->id)->first();

        return  ! $userRoom->owner && ($user->id == $userRoom->user_id || ( $u && ( $u->owner ||  $u->permissions()->where("id", Permission::$MANAGE_MEMBERS)->exists()) ));
    }
}
