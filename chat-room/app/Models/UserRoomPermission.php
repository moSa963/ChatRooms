<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRoomPermission extends Model
{
    use HasFactory;
    public $table = "user_room_permissions";

    public $fillable = [
        "user_room_id",
        "permission_id",
    ];
}
