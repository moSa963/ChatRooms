<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoomMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RoomMessagesController extends Controller
{
    public function index(Request $request, Room $room)
    {
        $this->authorize("viewAny", [Message::class, $room]);

        $messages = $room->messages()
            ->orderBy('created_at', 'desc')
            ->with("user")->cursorPaginate(10)->withQueryString();

        return MessageResource::collection($messages);
    }

    public function store(StoreRoomMessageRequest $request, Room $room)
    {
        $this->authorize("create", [Message::class, $room]);

        $user = $request->user();

        $message = $request->store($room, $user);

        return new MessageResource($message);
    }

    public function destroy(Request $request, Room $room, Message $message)
    {
        $this->authorize("manage_messages", $room);

        abort_if($message->room_id !== $room->id, 404);

        if ($message->path && Storage::exists("files/{$message->path}")) {
            Storage::delete("files/{$message->path}");
        }

        $message->update([
            "deleted" => true,
            "title" => "deleted message",
            "path" => null,
        ]);

        return response()->noContent();
    }
}
