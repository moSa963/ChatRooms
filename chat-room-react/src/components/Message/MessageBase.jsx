import React from "react";
import { Box } from "@mui/system";
import { Icon, Stack, Typography, LinearProgress } from "@mui/material";
import { APP_URL } from "../../util/Request";
import AvatarLink from "../AvatarLink";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteMessageButton from "./DeleteMessageButton";
import Link from "../Link";

const MessageBase = ({ message, right, children, manageMessage }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                py: 1,
                display: "flex",
                justifyContent: right ? "end" : "start",
            }}
        >
            <Stack
                direction={right ? "row-reverse" : "row"}
                spacing={1}
                sx={{ maxWidth: { xs: "95%", md: "85%" } }}
            >
                <Stack spacing={1} sx={{ alignItems: "center" }}>
                    <AvatarLink
                        to={`/dashboard/rooms/${message?.room_id}/users/${message?.user?.username}`}
                        src={`${APP_URL}api/users/${message?.user?.username}/image`}
                    />
                    {manageMessage &&
                        !message?.deleted &&
                        !message?.progress && (
                            <DeleteMessageButton message={message} />
                        )}
                    {message?.error && (
                        <Icon>
                            <ErrorIcon color="error" />
                        </Icon>
                    )}
                </Stack>

                <Box
                    sx={{
                        overflow: "hidden",
                        maxWidth: "100%",
                        minWidth: "10%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: right ? "end" : "start",
                        }}
                    >
                        <Typography variant="caption" noWrap>
                            <Link
                                to={`/dashboard/users/${message?.user?.username}`}
                            >
                                {message?.user.username}
                            </Link>
                            .
                            {new Date(message?.created_at).toLocaleTimeString()}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            p: 0.5,
                        }}
                    >
                        {message?.progress && (
                            <LinearProgress
                                variant="determinate"
                                value={message.progress}
                            />
                        )}
                        {message?.deleted ? (
                            <Typography color="error">
                                deleted message
                            </Typography>
                        ) : (
                            children
                        )}
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
};

export default MessageBase;
