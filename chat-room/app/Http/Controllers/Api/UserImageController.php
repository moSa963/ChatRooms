<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserImageRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserImageController extends Controller
{
    public function show(Request $request, $username)
    {
        $user = User::where("username", $username)->first();
        abort_if(!$user || !Storage::exists("users/{$user->username}"), 204);
        return Storage::response("users/{$user->username}");
    }


    public function store(StoreUserImageRequest $request)
    {
        $request->store();
        return response()->noContent();
    }
}
