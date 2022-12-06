<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    public $table = "rooms";

    public $fillable = [
        "name",
        "description",
        "slow_mode",
        "is_private",
        "read_only",
        "locked",
        "background_path",
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, UserRoom::class)
            ->wherePivotNotNull("verified_at")
            ->wherePivotNotNull("user_verified_at");
    }

    public function owner()
    {
        return $this->belongsToMany(User::class, UserRoom::class)->wherePivot("owner", "=", true);
    }

    public function users_room()
    {
        return $this->hasMany(UserRoom::class)
            ->whereNotNull("verified_at")
            ->whereNotNull("user_verified_at");
    }

    public function banned_users()
    {
        return $this->belongsToMany(User::class, UserBan::class);
    }

    public function requests()
    {
        return $this->hasMany(UserRoom::class)->whereNull("verified_at");
    }

    public function invited_users()
    {
        return $this->hasMany(UserRoom::class)->whereNull("user_verified_at");
    }

    public function all_users_room()
    {
        return $this->hasMany(UserRoom::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
