<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Message;
use App\Models\User;
use App\Models\UserRoom;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::factory()->create(["username" => "admin"]);

        //create room that the admin own
        $rooms = UserRoom::factory(5)->create(["user_id" => $admin->id, "owner" => true,]);

        //for each room let a user join it
        foreach ($rooms as $room) {
            $users = UserRoom::factory(5)->create(["room_id" => $room->id]);
            foreach ($users as $user) {
                //let this user has two messages
                Message::factory(2)->create([
                    "room_id" => $room->room_id,
                    "user_id" => $user->user_id,
                ]);
            }
        }

        //create 20 room
        UserRoom::factory(20)->create(["owner" => true]);

        //create 20 room that the admin joined
        $users = UserRoom::factory(20)->create(["owner" => true]);
        foreach ($users as $user) {
            UserRoom::factory()->create(["user_id" => $admin->id, "room_id" => $user->room_id]);
        }

        //create 20 room that the admin got invited to join
        $users = UserRoom::factory(20)->create(["owner" => true]);
        foreach ($users as $user) {
            UserRoom::factory()->create(["user_id" => $admin->id, "room_id" => $user->room_id, "user_verified_at" => null]);
        }

        //create 20 room that the admin requested to join
        $users = UserRoom::factory(20)->create(["owner" => true]);
        foreach ($users as $user) {
            UserRoom::factory()->create(["user_id" => $admin->id, "room_id" => $user->room_id, "verified_at" => null]);
        }
    }
}
