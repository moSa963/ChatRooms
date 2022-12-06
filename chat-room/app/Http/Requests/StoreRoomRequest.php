<?php

namespace App\Http\Requests;

use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StoreRoomRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }


    public function store(User $user): Room
    {
        $room = DB::transaction(function () use ($user) {
            $room = Room::create($this->validated());

            UserRoom::create([
                "user_id" => $user->id,
                "room_id" => $room->id,
                "owner" => true,
                "verified_at" => Carbon::now(),
                "user_verified_at" => Carbon::now(),
            ]);

            return $room;
        });

        return $room;
    }


    public function rules()
    {
        return [
            "name" => ["required", "string", "max:255"],
            "description" => ['string'],
        ];
    }
}
