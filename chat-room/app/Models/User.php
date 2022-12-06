<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function rooms()
    {
        return $this->belongsToMany(Room::class, UserRoom::class)
            ->select("rooms.*", "users_rooms.owner")
            ->selectRaw("(SELECT title FROM messages WHERE messages.room_id = rooms.id ORDER by created_at DESC LIMIT 1) as last_message")
            ->selectRaw("(SELECT created_at FROM messages WHERE messages.room_id = rooms.id ORDER by created_at DESC LIMIT 1) as message_created_at")
            ->selectRaw("(SELECT created_at FROM messages WHERE messages.room_id = rooms.id AND messages.user_id = ? ORDER by created_at DESC LIMIT 1) as user_last_update", [$this->id])
            ->wherePivotNotNull("verified_at")
            ->wherePivotNotNull("user_verified_at");
    }

    public function invites()
    {
        return $this->belongsToMany(Room::class, UserRoom::class)->wherePivotNull("user_verified_at");
    }

    public function user_rooms()
    {
        return $this->hasMany(UserRoom::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
