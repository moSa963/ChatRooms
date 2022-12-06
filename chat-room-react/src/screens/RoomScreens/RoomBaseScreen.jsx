import { Box } from "@mui/system";
import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import permissions from "../../util/Permissions";
import ErrorScreen from "../ErrorScreen";
import { loadSelectedRoomAsync, selectSelectedRoom, selectSelectedRoomStatus, setSelectedRoom } from "../../features/rooms/roomsSlice";

const RoomBaseScreen = () => {
    const { id } = useParams();
    const room = useSelector(selectSelectedRoom);
    const status = useSelector(selectSelectedRoomStatus);
    const auth = useSelector(selectAuth);
    const location = useLocation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        const promise = dispatch(loadSelectedRoomAsync(id));

        return () => {
            promise.abort();
            dispatch(setSelectedRoom(null));
        }
        
    }, [id, dispatch]);

    const authorize = () => {
        if (!permissions.read(room, auth)) {
            var path = location.pathname.split("/");
            if (path[path.length - 1] !== id && path[path.length - 1] !== "") {
                return false;
            }
        }
        return true;
    };

    if (status.error) {
        return (
            <ErrorScreen
                status={status.error}
                errorText={status.errorText}
                to="/dashboard/rooms"
                toText="BACK TO ROOMS"
            />
        );
    }

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                flex: 1,
                height: "100%",
                display: "flex",
            }}
        >
            {room &&
                auth &&
                (authorize() ? (
                    <Outlet />
                ) : (
                    <Navigate to={`/dashboard/rooms/${id}`} replace />
                ))}
            {!room && <LinearProgress color="primary" sx={{ flex: 1 }} />}
        </Box>
    );
};

export default RoomBaseScreen;
