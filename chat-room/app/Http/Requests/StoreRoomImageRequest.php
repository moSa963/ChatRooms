<?php

namespace App\Http\Requests;

use App\Models\Room;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StoreRoomImageRequest extends FormRequest
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

    public function store(Room $room)
    {
        $file = $this->validated("image");

        Storage::delete("rooms/{$room->id}");
        Storage::putFileAs("rooms", $file, $room->id);
    }

    public function rules()
    {
        return [
            "image" => ["required", "image", "max:10000", 'mimetypes:image/png,image/jpeg,image/gif'],
        ];
    }
}
