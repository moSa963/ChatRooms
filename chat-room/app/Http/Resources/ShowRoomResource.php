<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShowRoomResource extends JsonResource
{
    public function toArray($request)
    {
        $user_room = $request->user()?->user_rooms()?->where("room_id", $this->id)->first();

        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "is_private" => $this->is_private,
            "slow_mode" => $this->slow_mode,
            "created_at" => $this->created_at,
            "locked" => $this->locked,
            "read_only" => $this->read_only,
            "members" => $this->users()->count(),
            "background" => $this?->background_path ? "api/rooms/{$this->id}/background/{$this?->background_path}" : null,
            "owner" => new UserResource($this->owner()->first()),
            "user_status" => $this->getStatus($this, $request->user(), $user_room),
            "permissions" => PermissionResource::collection($user_room?->permissions()->get() ?: []),
        ];
    }

    private function getStatus($res, $user, $user_room)
    {
        if (!$user_room) {
            return $res->banned_users()->where("users.id", $user->id)->exists() ? "banned" : "join";
        }

        if ($user_room->owner) {
            return "owner";
        }

        if ($user_room?->verified_at) {
            if ($user_room?->user_verified_at) {
                return "joined";
            }
            return "invited";
        }

        return "requested";
    }
}
