import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useOutletContext } from "react-router-dom";
import UpdateImage from "../../components/UpdateImage";
import { APP_URL } from "../../util/Request";

const RoomThemeScreen = () => {
    const [room] = useOutletContext();

    return (
        <Box>
            <Typography variant="h6" sx={{ my: 1 }}>
                Background
            </Typography>

            <UpdateImage
                enableDelete
                src={room?.background && APP_URL + room?.background}
                link={`api/rooms/${room?.id}/background`}
                caption="Must be JPEG, PNG, or GIF and cannot exceed 10MB"
            />
        </Box>
    );
};

export default RoomThemeScreen;
