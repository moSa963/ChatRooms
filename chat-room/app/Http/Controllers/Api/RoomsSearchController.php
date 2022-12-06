<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomResource;
use App\Http\Resources\ShowRoomResource;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomsSearchController extends Controller
{
    public function index(Request $request)
    {
        $rooms = Room::where("name", "like", "%{$request->query('key', '')}%")
            ->orderBy('created_at', 'desc')
            ->simplePaginate(10)->withQueryString();

        return ShowRoomResource::collection($rooms);
    }
}
