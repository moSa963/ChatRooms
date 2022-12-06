import { LinearProgress, Paper } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import RoomsList from "../components/Rooms/RoomsList";
import {
    loadAuthAsync,
    selectAuth,
    selectAuthStatus,
} from "../features/auth/authSlice";
import { loadRoomsAsync } from "../features/rooms/roomsSlice";
import ErrorScreen from "./ErrorScreen";

const DashboardScreen = () => {
    const matches = useMediaQuery("(max-width:600px)");
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();
    const authStatues = useSelector(selectAuthStatus);

    React.useEffect(() => {
        dispatch(loadAuthAsync());
    }, [dispatch]);

    React.useEffect(() => {
        auth?.id && dispatch(loadRoomsAsync());
    }, [auth?.id, dispatch]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                bgcolor: "background.paper",
            }}
        >
            <AppBar />

            {authStatues?.loading && (
                <LinearProgress color="primary" sx={{ width: 1 }} />
            )}

            {authStatues?.error_status && (
                <ErrorScreen
                    status={authStatues?.error_status}
                    errorText={authStatues?.statusText}
                />
            )}

            {!authStatues?.loading && !authStatues?.error_status && (
                <Box
                    sx={{
                        width: "100%",
                        flex: 1,
                        display: "flex",
                        flexDirection: matches ? "column" : "row",
                        overflow: "hidden",
                    }}
                >
                    <RoomsList row={matches} />

                    <Paper
                        sx={{
                            position: "relative",
                            flex: 1,
                            height: "100%",
                            borderRadius: 0,
                            backgroundColor: "background.default",
                            overflow: "hidden",
                        }}
                    >
                        <Outlet />
                    </Paper>
                </Box>
            )}
        </Box>
    );
};

export default DashboardScreen;
