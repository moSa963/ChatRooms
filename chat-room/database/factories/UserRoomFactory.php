<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Database\Eloquent\Factories\Factory;


class UserRoomFactory extends Factory
{

    public function definition()
    {
        return [
            "user_id" => 0,
            "room_id" => 0,
            "owner" => false,
            "verified_at" => $this->faker->date(),
            "user_verified_at" => $this->faker->date(),
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (UserRoom $model) {
            if ($model->user_id == 0) {
                $model->user_id = User::factory()->create()->id;
            }
            if ($model->room_id == 0) {
                $model->room_id = Room::factory()->create()->id;
            }
        });
    }
}
