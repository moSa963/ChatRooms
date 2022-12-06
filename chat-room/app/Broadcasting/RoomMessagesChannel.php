<?php

namespace App\Broadcasting;

use App\Models\Room;
use App\Models\User;
use App\Policies\RoomPolicy;

class RoomMessagesChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\User  $user
     * @return array|bool
     */
    public function join(User $user, $room_id)
    {
        $room = Room::findOrFail($room_id);
        $policy = new RoomPolicy();

        return $room && $policy->view($user, $room);
    }
}
