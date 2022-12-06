<?php

namespace App\Http\Requests;

use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StoreRoomMessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    public function store(Room $room, User $user)
    {
        $data = [
            "room_id" => $room->id,
            "user_id" => $user->id,
            "title" => Str($this->validated("title"))->replace('\\n', ' ')->squish(),
        ];

        if ($this->exists("file")) {
            $file = $this->file("file");

            if ($file) {
                $path = $file->store("files", 'local');

                if ($path) {
                    $data["path"] = explode("/", $path, 2)[1];
                    $data["name"] = $this->name;
                    $data["size"] = Storage::size($path);
                    $data["mime_type"] = $file->getClientMimeType() ?: Storage::mimeType($path);
                }
            }
        }

        return Message::create($data);
    }

    public function rules()
    {
        return [
            "title" => ["required_if:file,null", "string", "max:1500"],
            "file" => ["file", "max:40960"],
            "name" => ["required_unless:file,null"],
        ];
    }
}
