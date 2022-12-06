<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomRequest;
use App\Http\Requests\UpdateRoomRequest;
use App\Http\Resources\RoomRequestResource;
use App\Http\Resources\RoomResource;
use App\Http\Resources\ShowRoomResource;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RoomsController extends Controller
{
    public function index(Request $request)
    {
        $rooms = $request->user()->rooms()->get();

        return RoomResource::collection($rooms);
    }

    public function show(Request $request, Room $room)
    {
        return new ShowRoomResource($room);
    }

    public function store(StoreRoomRequest $request)
    {
        //$this->authorize("create", Room::class);

        $room = $request->store($request->user());
        $room->owner = "1";
        return new RoomResource($room);
    }

    public function update(UpdateRoomRequest $request, Room $room)
    {
        $this->authorize("manage_room", $room);

        $request->update($room);

        return new ShowRoomResource(Room::findOrFail($room->id));
    }

    public function destroy(Request $request, Room $room)
    {
        $this->authorize("delete", $room);

        $files = $room->messages()->select("path")->where("path", "!=", null)->pluck("path")->toArray();

        if ($room->delete()) {
            Storage::delete(array_map(function ($v) {
                return "files/" . $v;
            }, $files));

            if ($room->background_path) {
                Storage::delete("room_backgrounds/{$room->background_path}");
            }
        }

        return response()->noContent();
    }
}
