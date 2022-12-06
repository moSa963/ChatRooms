<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomBackgroundRequest;
use App\Http\Resources\ShowRoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoomBackgroundController extends Controller
{
    public function show(Request $reuset, Room $room, $key)
    {
        abort_if(!$room?->background_path || !Storage::exists("room_backgrounds/{$room->background_path}"), 204);

        return Storage::response("room_backgrounds/{$room->background_path}");
    }

    public function store(StoreRoomBackgroundRequest $reuset, Room $room)
    {
        $this->authorize("manage_room", $room);

        $room = $reuset->store($room);

        return new ShowRoomResource($room);
    }

    public function destroy(Request $reuset, Room $room)
    {
        $this->authorize("manage_room", $room);

        $room->update([
            "background_path" => null,
        ]);

        return new ShowRoomResource($room);
    }
}
