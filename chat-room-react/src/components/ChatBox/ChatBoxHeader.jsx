import {
    LinearProgress,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import React from "react";
import { APP_URL } from "../../util/Request";
import AvatarLink from "../AvatarLink";

const ChatBoxHeader = ({ room }) => {
    return (
        <Paper elevation={1} sx={{ borderRadius: 0,  zIndex: 2 }}>
            {!room && <LinearProgress />}
            <ListItem disablePadding sx={{ p: 1 }}>
                <ListItemAvatar>
                    <AvatarLink
                        width={45}
                        height={45}
                        to="../"
                        src={`${APP_URL}api/rooms/${room?.id || 0}/image`}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography noWrap>{room?.name}</Typography>}
                />
            </ListItem>
        </Paper>
    );
};

export default ChatBoxHeader;
