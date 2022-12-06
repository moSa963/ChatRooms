<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\MessageFileController;
use App\Http\Controllers\Api\RoomBackgroundController;
use App\Http\Controllers\Api\RoomImageController;
use App\Http\Controllers\Api\RoomMessagesController;
use App\Http\Controllers\Api\RoomRequestsController;
use App\Http\Controllers\Api\RoomsController;
use App\Http\Controllers\Api\RoomsSearchController;
use App\Http\Controllers\Api\RoomUserLogController;
use App\Http\Controllers\Api\RoomUsersController;
use App\Http\Controllers\Api\UserBansController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserImageController;
use App\Http\Controllers\Api\UserInvitationsController;
use App\Http\Controllers\Api\UserPermissionsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(ApiAuthController::class)
    ->group(function () {
        Route::post("/register", "register");
        Route::post("/login", "login");
        Route::post("/logout", "logout")->middleware("auth:sanctum");;
    });


Route::controller(UserController::class)
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get("/user", "index");
        Route::get("/users/{username}", "show");
        Route::post("/user/update", "update");
    });

Route::controller(UserImageController::class)
    ->group(function () {
        Route::get("/users/{username}/image", "show")->withoutMiddleware('throttle:api');
        Route::post("/user/image", "store")->middleware("auth:sanctum");
    });


Route::controller(RoomsSearchController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("search/rooms", "index");
    });

Route::controller(RoomsController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/rooms", "index");
        Route::get("/rooms/{room}", "show");
        Route::post("/rooms", "store");
        Route::post("/rooms/{room}", "update");
        Route::delete("/rooms/{room}", "destroy");
    });

Route::controller(RoomImageController::class)
    ->group(function () {
        Route::get("/rooms/{room}/image", "show")->withoutMiddleware('throttle:api');;
        Route::post("/rooms/{room}/image", "store")->middleware("auth:sanctum");
    });

Route::controller(RoomUsersController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/rooms/{room}/users", "index");
        Route::get("/rooms/{room}/users/{username}", "show");
        Route::delete("/rooms/{room}/users/{username}", "destroy");
    });

Route::controller(UserInvitationsController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/user/invitations", "index");
        Route::post("/rooms/{room}/invitations/accept", "update");
        Route::post("/rooms/{room}/invitations/{username}", "store");
    });

Route::controller(RoomRequestsController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/rooms/{room}/requests", "index");
        Route::post("/rooms/{room}/requests", "store");
        Route::post("/rooms/{room}/requests/{request}/accept", "update");
        Route::delete("/rooms/{room}/requests", "destroy");
    });

Route::controller(UserPermissionsController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::post("/rooms/{room}/users/{username}/permissions/{permission}", "store");
        Route::delete("/rooms/{room}/users/{username}/permissions/{permission}", "destroy");
    });

Route::controller(UserBansController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/rooms/{room}/bans", "index");
        Route::post("/rooms/{room}/bans/{username}", "store");
        Route::delete("/rooms/{room}/bans/{username}", "destroy");
    });

Route::controller(RoomMessagesController::class)
    ->middleware("auth:sanctum")
    ->group(function () {
        Route::get("/rooms/{room}/messages", "index");
        Route::post("/rooms/{room}/messages", "store");
        Route::delete("/rooms/{room}/messages/{message}", "destroy");
    });

Route::controller(MessageFileController::class)
    ->middleware('web')
    ->group(function () {
        Route::get("/rooms/{room}/files/{id}", "show");
    });

Route::controller(RoomUserLogController::class)
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get("/rooms/{room}/logs/{username}", "index");
    });

Route::controller(RoomBackgroundController::class)
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get("/rooms/{room}/background/{key}", "show");
        Route::post("/rooms/{room}/background", "store")->middleware('auth:sanctum');
        Route::delete("/rooms/{room}/background", "destroy");
    });

