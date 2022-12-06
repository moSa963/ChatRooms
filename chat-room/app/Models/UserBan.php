<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBan extends Model
{
    use HasFactory;
    public $table = "user_ban";

    public $fillable = [
        "created_by",
        "user_id",
        "room_id",
    ];
}
