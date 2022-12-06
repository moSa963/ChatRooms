import { Box } from "@mui/system";
import React from "react";
import { Divider, LinearProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import RoomHeader from "../../components/Rooms/RoomHeader";
import UserBanner from "../../components/User/UserBanner";
import UserLogs from "../../components/User/UserLogs";
import UserPermisions from "../../components/User/UserPermissions";
import request from "../../util/Request";
import Screen from "../Screen";
import BanButton from "../../components/User/BanButton";
import Permissions from "../../util/Permissions";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import ErrorScreen from "../ErrorScreen";
import { selectSelectedRoom } from "../../features/rooms/roomsSlice";

const ShowRoomsUserScreen = () => {
    const { username } = useParams();
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);
    const room = useSelector(selectSelectedRoom);
    const auth = useSelector(selectAuth);

    React.useEffect(() => {
        room?.id && getUser(room?.id, username, setUser, setError);
    }, [username, room?.id]);

    if (error) {
        return (
            <ErrorScreen
                status={error.status}
                errorText={error.errorText}
                to="../"
                toText="GO BACK"
            />
        );
    }

    return (
        <Screen>
            <RoomHeader room={room} />
            <Divider sx={{ my: 3 }} />
            {!user && <LinearProgress color="primary" />}

            <Box>
                {user && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                        }}
                    >
                        <Box sx={{ width: "100%", maxWidth: 350 }}>
                            <UserBanner
                                user={user}
                                owner={user?.isOwner}
                                column
                            />
                        </Box>
                        <Box
                            sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2, sm: 0 } }}
                        >
                            {!Permissions.manage_members(room, user) &&
                                Permissions.manage_members(room, auth) && (
                                    <Box sx={{ my: 1 }}>
                                        <BanButton room={room} user={user} />
                                    </Box>
                                )}
                            <UserPermisions
                                disabled={
                                    !Permissions.manage_permissions(room, auth)
                                }
                                user={user}
                                room={room}
                                setUser={setUser}
                            />
                        </Box>
                    </Box>
                )}

                {user && (
                    <Box sx={{ my: 5 }}>
                        <Typography variant="h4">User log: </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                overflow: "hidden",
                                width: "100%",
                                height: 400,
                                justifyContent: "center",
                            }}
                        >
                            <UserLogs room={room} user={user} />
                        </Box>
                    </Box>
                )}
            </Box>
        </Screen>
    );
};

const getUser = async (room_id, username, setUser, setError) => {
    const res = await request(`api/rooms/${room_id}/users/${username}`);

    if (res.ok) {
        const js = await res.json();
        setUser(js.data);
        setError(null);
        return;
    }

    setError({ status: res.status, errorText: res.statusText });
};

export default ShowRoomsUserScreen;
