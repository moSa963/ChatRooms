<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRoom extends Model
{
    use HasFactory;
    public $table = "users_rooms";

    public $fillable = [
        "user_id",
        "room_id",
        "owner",
        "user_verified_at",
        "verified_at",
    ];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, UserRoomPermission::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
