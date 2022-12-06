<?php

namespace App\Http\Requests;

use App\Models\Room;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StoreRoomBackgroundRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    public function store(Room $room)
    {
        $file = $this->validated("image");

        if ($file) {
            Storage::delete("room_backgrounds/{$room->background_path}");

            $path = $file->store("room_backgrounds", 'local');

            if ($path) {
                $room->update([
                    "background_path" => explode("/", $path, 2)[1],
                ]);
            }
        }

        return $room;
    }

    public function rules()
    {
        return [
            "image" => ["required", "image", "max:10000", 'mimetypes:image/png,image/jpeg,image/gif'],
        ];
    }
}
