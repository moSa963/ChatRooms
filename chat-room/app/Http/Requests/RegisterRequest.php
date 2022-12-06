<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;


class RegisterRequest extends FormRequest
{
    public function authorize()
    {
        return !Auth::check();
    }

    public function register()
    {
        $user = User::create([
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'password' => Hash::make($this->password),
        ]);

        event(new Registered($user));

        return $user;
    }


    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255', "min:3", 'regex:/^[A-Za-z]+([ ._-]?[A-Za-z0-9]+)*$/'],
            'username' => ['required', 'string', 'max:255', "min:3", 'unique:users', 'regex:/^[A-Za-z]+([._-]?[A-Za-z0-9]+)*$/'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
