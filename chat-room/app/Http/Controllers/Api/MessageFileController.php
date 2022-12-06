<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Room;
use GuzzleHttp\Psr7\Response as Psr7Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class MessageFileController extends Controller
{
	public function show(Request $request, Room $room, $id)
	{
		//$this->authorize("view", $room);

		$message = $room->messages()->where("path", $id)->firstOrFail();

		abort_if(!Storage::exists("files/{$message->path}"), 404);

		$range = $request->header('Range', false);

		if ($range) {
			return $this->streamFile($message->type, Storage::path("files/{$message->path}"), $range, $message->name);
		}

		return Storage::response("files/{$message->path}", $message->name);
	}

	private function streamFile($contentType, $path, $range, $name)
	{
		$fullsize = filesize($path);
		$size = $fullsize;

		$stream = fopen($path, "r");

		abort_if($stream == false, 404);

		$response_code = 200;
		$headers = ["Content-type" => $contentType];
		$headers["Content-Disposition"] = "inline; filename=" . '"' . $name . '"';

		if ($range != null) {
			list($unit, $val) = explode("=", $range);
			list($start, $end) = explode("-", $val);

			$end = $end == "" ? $fullsize - 1 : $end;

			$success = fseek($stream, $start);

			if ($success == 0) {
				$size = $fullsize - $start;
				$response_code = 206;
				$headers["Accept-Ranges"] = $unit;
				$headers["Content-Range"] = $unit . " " . $start . "-" . $end . "/" . $fullsize;
			}
		}

		$headers["Content-Length"] = $size;

		return Response::stream(function () use ($stream) {
			fpassthru($stream);
		}, $response_code, $headers);
	}
}
