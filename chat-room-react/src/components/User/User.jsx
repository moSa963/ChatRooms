import React from "react";
import { APP_URL } from "../../util/Request";
import DrawerItem from "../Drawer/DrawerItem";

const User = ({ children, user, collapse, room, fullWidth }) => {
    return (
        <DrawerItem
            fullWidth={fullWidth}
            collapse={collapse}
            text={user?.name}
            secondaryText={"@" + user?.username}
            to={room && `/dashboard/rooms/${room?.id}/users/${user.username}`}
            src={`${APP_URL}api/users/${user?.username}/image`}
        >
            {children}
        </DrawerItem>
    );
};

export default User;
