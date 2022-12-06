<?php

namespace App\Events;

use App\Http\Resources\RoomResource;
use App\Http\Resources\ShowRoomResource;
use App\Models\Room;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoomUpdateEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $data;
    
    public function __construct(Room $room)
    {
        $this->data = [
            "id" => $room->id,
            "name" => $room->name,
            "description" => $room->description,
            "is_private" => $room->is_private,
            "slow_mode" => $room->slow_mode,
            "locked" => $room->locked,
            "read_only" => $room->read_only,
            "background" => $room?->background_path ? "api/rooms/{$room->id}/background/{$room?->background_path}" : null,
        ];
    }

    public function broadcastOn()
    {
        return new PrivateChannel("rooms.{$this->data['id']}");
    }

    public function broadcastAs()
    {
        return 'update-room';
    }
}
