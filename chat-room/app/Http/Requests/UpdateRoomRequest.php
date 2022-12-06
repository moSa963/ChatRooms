<?php

namespace App\Http\Requests;

use App\Models\Room;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateRoomRequest extends FormRequest
{

    public function authorize()
    {
        return Auth::check();
    }

    public function update(Room $room)
    {
        return $room->update($this->validated());
    }

    public function rules()
    {
        return [
            "name" => ['string', "max:255"],
            "description" => ['string', 'max:500'],
            "is_private" => ['boolean'],
            "slow_mode" => ['integer', "min:0", "max:10000"],
            "read_only" => ['boolean'],
            "locked" => ['boolean'],
        ];
    }
}
