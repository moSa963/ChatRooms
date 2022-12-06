import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Screen = ({ children }) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "auto",
                overflowX: "hidden",
                display: "flex",
                justifyContent: "center",
                py: 4,
                flex: 1,
                px: 1,
            }}
        >
            <Stack
                spacing={2}
                sx={{
                    width: "100%",
                    maxWidth: 800,
                }}
            >
                {children}
            </Stack>
        </Box>
    );
};

export default Screen;
