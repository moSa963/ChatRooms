import React from "react";
import { Badge, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch, useSelector } from "react-redux";
import { selectNotificationsUnreadCount, setAsRead } from "../../features/notifications/notificationsSlice";

const NotificationsLink = () => {
    const unread = useSelector(selectNotificationsUnreadCount);
    const dispatch = useDispatch();


    return (
        <Link to="/dashboard/settings/invitations" onClick={() => dispatch(setAsRead())}>
            <IconButton size="small" >
                <Badge
                    badgeContent={unread}
                    max={99}
                    color="primary"
                >
                    <NotificationsNoneIcon />
                </Badge>
            </IconButton>
        </Link>
    );
};

export default NotificationsLink;
