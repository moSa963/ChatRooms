<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


class RoomFactory extends Factory
{
    public function definition()
    {
        return [
            "name" => $this->faker->word(),
            "description" => $this->faker->sentence(),
            "slow_mode" => $this->faker->numberBetween(0, 5),
            "is_private" => $this->faker->boolean(),
            "read_only" => false,
        ];
    }
}
