import React from "react";
import { APP_URL } from "../../util/Request";
import DrawerItem from "../Drawer/DrawerItem";

const Room = ({ children, room, collapse, noLastMessage, fullWidth, row }) => {
    return (
        <DrawerItem
            fullWidth={fullWidth}
            row={row}
            collapse={collapse}
            text={room?.name}
            to={`/dashboard/rooms/${room.id}/chat`}
            secondaryText={!noLastMessage && room?.last_message}
            src={`${APP_URL}api/rooms/${room?.id}/image`}
            glowing={room?.unwatched}
        >
            {children}
        </DrawerItem>
    );
};

export default Room;
