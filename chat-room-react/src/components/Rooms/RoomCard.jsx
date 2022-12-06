import { Card, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import JoinButton from "./JoinButton";
import Room from "./Room";

const RoomCard = ({ room, setRooms }) => {
    const handleJoin = (r) => {
        setRooms((rooms) => {
            const index = rooms.findIndex((v) => v.id === r.id);
            if (index < 0) return rooms;
            rooms[index] = { ...rooms[index], ...r };
            return [...rooms];
        });
    };

    return (
        <Card
            sx={{
                p: 1,
                width: "100%",
                maxWidth: { xs: "100%", sm: 250 },
                m: 0.5,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Room room={room} noLastMessage fullWidth />
            <Typography>{room?.is_private ? "Private" : "Public"}</Typography>
            <Divider sx={{ my: 1 }} />
            <Box
                sx={{
                    height: 75,
                    overflow: "auto",
                    "::-webkit-scrollbar": { display: "none" },
                    scrollbarWidth: "none",
                    textAlign: "center",
                }}
            >
                <Typography sx={{ wordWrap: "break-word" }}>
                    {room?.description}
                </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <JoinButton room={room} onChange={handleJoin} />
        </Card>
    );
};

export default RoomCard;
