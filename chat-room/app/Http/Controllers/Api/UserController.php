<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return [
            "data" =>  $request->user(),
        ];
    }

    public function show(Request $request, $username)
    {
        return new UserResource(User::where("username", $username)->firstOrFail());
    }

    public function update(UpdateUserRequest $request)
    {
        $request->update($request->user());

        return [
            "data" => $request->user(),
        ];
    }
}
