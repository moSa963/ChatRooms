<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Message;
use App\Models\Room;
use App\Models\UserRoom;
use App\Policies\RoomMessagePolicy;
use App\Policies\RoomPolicy;
use App\Policies\UserRoomPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Room::class => RoomPolicy::class,
        UserRoom::class => UserRoomPolicy::class,
        Message::class => RoomMessagePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
