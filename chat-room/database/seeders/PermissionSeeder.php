<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::factory()->create(["name" => "Write"]);
        Permission::factory()->create(["name" => "Manage room"]);
        Permission::factory()->create(["name" => "Manage members"]);
        Permission::factory()->create(["name" => "Manage permissions"]);
        Permission::factory()->create(["name" => "Manage messages"]);
    }
}
