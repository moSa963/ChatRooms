<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class MessageFactory extends Factory
{

    public function definition()
    {
        return [
            "room_id" => 0,
            "user_id" => 0,
            "title" => $this->faker->sentence(),
            "created_at" => $this->faker->dateTime(),
        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (Message $model) {
            if ($model->user_id == 0) {
                $model->user_id = User::factory()->create()->id;
            }
            if ($model->room_id == 0) {
                $model->room_id = Room::factory()->create()->id;
            }
        });
    }
}
