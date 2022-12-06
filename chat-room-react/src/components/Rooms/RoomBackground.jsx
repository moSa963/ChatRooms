import { Box, styled } from "@mui/material";
import React from "react";
import { APP_URL } from "../../util/Request";

const StyledImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    overflow: "hidden",
});

const RoomBackground = ({ room }) => {
    if (!room?.background) return <></>;

    return (
        <Box sx={{ position: "absolute", inset: "0 0 0 0", opacity: 0.3 }}>
            <StyledImage src={APP_URL + room.background} />
        </Box>
    );
};

export default RoomBackground;
