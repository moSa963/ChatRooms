<?php

namespace App\Observers;

use App\Events\RoomMessagesDeletedEvent;
use App\Events\RoomMessagesEvent;
use App\Models\Message;
use Exception;

class RoomMessageObserver
{
    public function created(Message $message)
    {
        try {
            broadcast(new RoomMessagesEvent($message))->toOthers();
        } catch (Exception $e) {
        }
    }

    public function updated(Message $message)
    {
        if ($message->deleted) {
            try {
                broadcast(new RoomMessagesDeletedEvent($message))->toOthers();
            } catch (Exception $e) {
            }
        }
    }
}
