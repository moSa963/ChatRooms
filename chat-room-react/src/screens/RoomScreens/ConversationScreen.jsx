import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import ChatBox from "../../components/ChatBox/ChatBox";
import RoomUsersList from "../../components/Rooms/RoomUsersList";
import { selectSelectedRoom } from "../../features/rooms/roomsSlice";

const ConversationScreen = () => {
    const room = useSelector(selectSelectedRoom);
    const matches = useMediaQuery("(min-width:600px)");

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                overflow: "hidden",
            }}
        >
            {room && <ChatBox room={room} />}
            {room && matches && <RoomUsersList room={room} />}
        </Box>
    );
};

export default ConversationScreen;
