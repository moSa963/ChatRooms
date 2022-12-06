<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomImageRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoomImageController extends Controller
{
    public function show(Request $reuset, Room $room)
    {
        abort_if(!Storage::exists("rooms/{$room->id}"), 204);

        return Storage::response("rooms/{$room->id}");
    }

    public function store(StoreRoomImageRequest $reuset, Room $room)
    {
        $this->authorize("manage_room", $room);

        $reuset->store($room);

        return response()->noContent();
    }
}
