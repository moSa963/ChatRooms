<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StoreUserImageRequest extends FormRequest
{

    public function authorize()
    {
        return Auth::check();
    }

    public function store()
    {
        Storage::delete("users/" . $this->user()->username);
        Storage::putFileAs("users", $this->validated("image"), $this->user()->username);
    }

    public function rules()
    {
        return [
            "image" => ['required', 'image', "max:10000", 'mimetypes:image/png,image/jpeg,image/gif'],
        ];
    }
}
