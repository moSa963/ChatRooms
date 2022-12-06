<?php

namespace App\Observers;

use App\Models\Permission;
use App\Models\UserRoom;
use App\Models\UserRoomPermission;
use App\Notifications\RoomInviteNotification;
use Exception;

class UserRoomObserver
{
    public function created(UserRoom $userRoom)
    {
        if ($userRoom->owner || ($userRoom->verified_at && $userRoom->user_verified_at && !$userRoom->room->read_only)) {
            UserRoomPermission::firstOrCreate([
                "user_room_id" => $userRoom->id,
                "permission_id" => Permission::$WRITE,
            ]);
        }

        if ($userRoom->verified_at && !$userRoom->user_verified_at) {
            try {
                $userRoom->user->notify(new RoomInviteNotification($userRoom->room));
            } catch (Exception $e) {
            }
        }
    }

    public function updated(UserRoom $userRoom)
    {
        if (!$userRoom->verified_at || !$userRoom->user_verified_at || $userRoom->room->read_only) {
            return;
        }

        UserRoomPermission::firstOrCreate([
            "user_room_id" => $userRoom->id,
            "permission_id" => Permission::$WRITE,
        ]);
    }
}
