<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
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
            "id" => $this->id,
            "room_id" => $this->room_id,
            "user_id" => $this->user_id,
            "title" => $this->title,
            "src" => (!$this->deleted && $this->path) ? "api/rooms/{$this->room_id}/files/{$this->path}" : null,
            "name" => $this->name,
            "deleted" => $this->deleted,
            "mime_type" => $this->mime_type,
            "created_at" => $this->created_at,
            "user" => new UserResource($this->user),
            "size" => $this->size,
        ];
    }
}
