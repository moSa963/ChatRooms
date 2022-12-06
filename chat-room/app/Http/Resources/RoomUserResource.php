<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->user->id,
            "name" => $this->user->name,
            "username" => $this->user->username,
            "isOwner" => $this->owner === "1",
            "permissions" => PermissionResource::collection($this->permissions()->get() ?: []),
        ];
    }
}
