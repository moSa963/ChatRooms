import { Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JoinButton from "../../components/Rooms/JoinButton";
import RoomHeader from "../../components/Rooms/RoomHeader";
import { removeRoom, selectSelectedRoom, setSelectedRoom } from "../../features/rooms/roomsSlice";
import Screen from "../Screen";

const ShowRoomScreen = () => {
    const room = useSelector(selectSelectedRoom);
    const dispatch = useDispatch();

    const handleChange = (r) => {
        if (r.user_status !== "joined") {
            dispatch(removeRoom(r));
        }
        dispatch(setSelectedRoom(r));
    };

    return (
        <Screen>
            <RoomHeader room={room} />

            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <JoinButton room={room} onChange={handleChange} />
            </Box>

            <Paper sx={{ borderRadius: 2, p: 2 }}>
                <Typography>
                    {room?.is_private ? "Private" : "Public"} room
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                    Created by
                    <Link to={`/dashboard/users/${room?.owner?.username}`}>
                        @{room?.owner?.username}
                    </Link>
                    . {new Date(room.created_at).toDateString()}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>
                    Room has
                    {room?.members > 1
                        ? room.members + " members"
                        : " 1 member"}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography>Slow mode: {room?.slow_mode}s</Typography>
                {room?.locked === 1 && (
                    <React.Fragment>
                        <Divider sx={{ my: 1 }} />
                        <Typography>Room is locked</Typography>
                    </React.Fragment>
                )}
            </Paper>
        </Screen>
    );
};

export default ShowRoomScreen;
