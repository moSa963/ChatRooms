import { Typography } from "@mui/material";
import { Box, alpha } from "@mui/system";
import React from "react";

const MessageSectionDate = ({ date }) => {
    return (
        <Box
            sx={{
                px: 1,
                borderRadius: 9999,
                bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.6),
            }}
        >
            <Typography variant="caption">{date}</Typography>
        </Box>
    );
};

export default MessageSectionDate;
