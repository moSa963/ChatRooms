<?php

namespace App\Notifications;

use App\Models\Room;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RoomInviteNotification extends Notification implements ShouldQueue
{
    use Queueable;
    private $room;

    public function __construct(Room $room)
    {
        $this->room = $room;
    }

    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function broadcastType()
    {
        return 'invitation';
    }

    public function toArray($notifiable)
    {
        return [
            "data" => [
                "id" => $this->room->id,
                "name" => $this->room->name,
            ]
        ];
    }
}
