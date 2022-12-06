<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\Permission;
use App\Models\Room;
use App\Models\User;
use App\Services\RoomSlowMode;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;


class RoomMessagePolicy
{
    use HandlesAuthorization;


    public function viewAny(User $user, Room $room)
    {
        $ru = $room->users_room()->where("user_id", $user->id)->first();

        return boolval($ru);
    }


    public function create(User $user, Room $room)
    {

        $ru = $room->users_room()->where("user_id", $user->id)->first();
        return $ru &&
            ($ru->owner ||
                ($ru->permissions()->where("permissions.id", Permission::$WRITE)->exists()
                    && RoomSlowMode::check($room, $user)));
    }
}
