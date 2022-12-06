<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }

    private function update_username($user, $new_username)
    {
        $old = $user->username;

        $user->update(["username" => $new_username]);

        Storage::move("users/{$old}", "users/{$new_username}");
    }

    private function update_email($user, $new_email)
    {
        $user->update(['email' => $new_email]);
        $user->email_verified_at = null;
        $user->save();
    }

    public function update($user)
    {
        if ($this->exists("username")) {
            $this->update_username($user, $this->validated("username"));
        }

        if ($this->exists("name")) {
            $user->update(['name' => $this->validated("name")]);
        }

        if ($this->exists("email")) {
            $this->update_email($user, $this->validated("email"));
        }
    }

    public function rules()
    {
        return [
            "name" => ['string', 'max:255', "min:3", 'regex:/^[A-Za-z]+([ ._-]?[A-Za-z0-9]+)*$/'],
            "username" => ['string', 'max:255', 'unique:users', "min:3", 'regex:/^[A-Za-z]+([._-]?[A-Za-z0-9]+)*$/'],
            "email" => ['string', 'email', 'max:255', 'unique:users'],
        ];
    }
}
