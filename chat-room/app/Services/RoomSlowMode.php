<?php

namespace App\Services;

use App\Models\Room;
use App\Models\User;
use Illuminate\Support\Carbon;

class RoomSlowMode
{

    public static function check(Room $room, User $user): bool
    {
        $message = $user->messages()->where("room_id", $room->id)->latest("created_at")->first();

        return !$message || Carbon::now()->diffInSeconds(new Carbon($message->created_at)) >= $room->slow_mode;
    }
}
