<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public $table = "messages";

    protected $hidden = [
        'path',
    ];

    public $fillable = [
        "room_id",
        "user_id",
        "title",
        "path",
        "size",
        "mime_type",
        "name",
        "deleted",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
