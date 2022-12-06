import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import RoomHeader from "../../components/Rooms/RoomHeader";
import { selectAuth } from "../../features/auth/authSlice";
import { selectSelectedRoom, setSelectedRoom } from "../../features/rooms/roomsSlice";
import Permissions from "../../util/Permissions";
import Screen from "../Screen";

const RoomSettingsNav = () => {
    const [value, setValue] = React.useState(0);
    const nav = useNavigate();
    const { pathname } = useLocation();
    const room = useSelector(selectSelectedRoom);
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    React.useEffect(() => {
        Object.keys(links).forEach(
            (e, i) => pathname.endsWith(e) && setValue(i)
        );
    }, [pathname, nav, room, auth]);

    const handleChange = (e, v) => {
        nav(Object.keys(links)[v]);
        setValue(v);
    };

    return (
        <Screen>
            <Box sx={{ pt: 2 }}>
                <RoomHeader room={room} noSettings />

                <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 5 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab
                            label="Settings"
                            disabled={!links[""](room, auth)}
                        />
                        <Tab
                            label="Users"
                            disabled={!links["users"](room, auth)}
                        />
                        <Tab
                            label="Requests"
                            disabled={!links["requests"](room, auth)}
                        />
                        <Tab
                            label="Band users"
                            disabled={!links["bans"](room, auth)}
                        />
                        <Tab
                            label="Theme"
                            disabled={!links["theme"](room, auth)}
                        />
                    </Tabs>
                </Box>
            </Box>

            {links[Object.keys(links)[value]](room, auth) && (
                <Outlet context={[room, (room) => dispatch(setSelectedRoom(room))]} />
            )}
        </Screen>
    );
};

const links = {
    "": Permissions.manage_room,
    "users": Permissions.manage_members,
    "requests": Permissions.manage_members,
    "bans": Permissions.manage_members,
    "theme": Permissions.manage_room,
};

export default RoomSettingsNav;
