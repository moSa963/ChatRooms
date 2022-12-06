import { Box } from "@mui/system";
import React from "react";
import permissions from "../../util/Permissions";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxInput from "../ChatInputBar/ChatInput";
import MessagesList from "./MessagesList";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import {
    loadMessagesAsync,
    loadNextMessagesAsync,
    selectMessages,
    sendMessageAsync,
} from "../../features/messages/messagesSlice";
import { addRoom } from "../../features/rooms/roomsSlice";
import RoomBackground from "../Rooms/RoomBackground";

const ChatBox = ({ room }) => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();
    const { messages, loading } = useSelector(selectMessages(room));

    React.useEffect(() => {
        dispatch(loadMessagesAsync(room?.id));
    }, [room?.id, dispatch]);

    const loadNext = () => {
        if (!loading) {
            dispatch(loadNextMessagesAsync(room?.id));
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                userSelect: "text",
                overflow: "hidden",
            }}
        >
            <RoomBackground room={room} />

            {room && <ChatBoxHeader room={room} />}
            {room && (
                <MessagesList
                    messages={messages?.data}
                    room={room}
                    loadMessages={loadNext}
                    next={messages?.next}
                />
            )}

            {permissions.write(room, auth) && (
                <ChatBoxInput
                    key={room?.id}
                    loading={loading}
                    room={room}
                    onSend={(v) => sendMessage(room, v, auth, dispatch)}
                />
            )}
        </Box>
    );
};

export const sendMessage = async (room, message, user, dispatch) => {
    const new_message = {
        id: Math.random() * 1000 + "_" + Date.now(),
        user_id: user?.id,
        room_id: room.id,
        src: message?.file,
        name: message?.file?.name,
        mime_type: message?.file?.type,
        user: user,
        title: message?.title || "",
        created_at: new Date(Date.now()).toUTCString(),
    };

    const new_room = {
        id: room.id,
        isOwner: room.owner.id === user.id,
        name: room.name,
        last_message: message?.title,
        unwatched: false,
        updated_at: new Date(Date.now()).toUTCString(),
        user_last_update: new Date(Date.now()).toUTCString(),
    };

    dispatch(sendMessageAsync(new_message));
    dispatch(addRoom(new_room));
};

export default ChatBox;
