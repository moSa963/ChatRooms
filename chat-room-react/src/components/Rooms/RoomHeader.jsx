import React from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Link } from "react-router-dom";
import { APP_URL } from "../../util/Request";
import ChatIcon from "@mui/icons-material/Chat";

const RoomHeader = ({ room, noSettings }) => {
    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "start" },
            }}
        >
            <Avatar
                sx={{ width: 80, height: 80, mr: 2 }}
                src={`${APP_URL}api/rooms/${room?.id}/image`}
            />
            <Stack sx={{ width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            wordBreak: "break-word",
                            flex: 1,
                            fontSize: { xs: 15, sm: 35 },
                        }}
                    >
                        {room?.name}
                    </Typography>
                    <Box>
                        {!noSettings && (
                            <Link to={`/dashboard/rooms/${room?.id}/settings`}>
                                <IconButton>
                                    <SettingsRoundedIcon />
                                </IconButton>
                            </Link>
                        )}
                        <Link to={`/dashboard/rooms/${room?.id}/chat`}>
                            <IconButton>
                                <ChatIcon />
                            </IconButton>
                        </Link>
                    </Box>
                </Box>
                <Divider />
                <Typography
                    sx={{ mt: 2, wordBreak: "break-word", textAlign: "center" }}
                >
                    {room?.description}
                </Typography>
            </Stack>
        </Paper>
    );
};

export default RoomHeader;
