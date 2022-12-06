<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;
    public $table = "permissions";

    public $fillable = [
        "name",
    ];


    public static $WRITE = 1;
    public static $MANAGE_ROOM = 2;
    public static $MANAGE_MEMBERS = 3;
    public static $MANAGE_PERMISSIONS = 4;
    public static $MANAGE_MESSAGES = 5;
}
