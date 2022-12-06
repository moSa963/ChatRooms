import React from "react";
import AppBar from "@mui/material/AppBar";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ProfileAvatar from "./ProfileAvatar";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NotificationsLink from "./NotificationsLink";

const Bar = () => {
    return (
        <AppBar
            elevation={1}
            position="relative"
            sx={{
                zIndex: 10,
                justifyContent: "center",
                bgcolor: "background.paper",
                color: "text.primary",
            }}
        >
            <Toolbar variant="dense">
                <Link to="/dashboard">
                    <Typography variant="h5">Chat</Typography>
                </Link>

                <Link to="rooms">
                    <Typography
                        sx={{ pl: 2, ":hover": { color: "primary.dark" } }}
                        variant="button"
                    >
                        Rooms
                    </Typography>
                </Link>

                <Box sx={{ flex: 1 }} />

                <Link to="/dashboard/rooms/new" title="create new room">
                    <IconButton size="small">
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Link>

                <NotificationsLink />

                <ProfileAvatar />
            </Toolbar>
        </AppBar>
    );
};

export default Bar;
