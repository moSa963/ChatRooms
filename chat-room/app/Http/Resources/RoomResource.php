<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "isOwner" => $this->owner === "1",
            "last_message" => $this?->last_message,
            "updated_at" => $this?->message_created_at,
            "user_last_update" => $this?->user_last_update,
        ];
    }
}
