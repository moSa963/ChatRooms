import React from "react";
import { IconButton, Typography } from "@mui/material";
import { Box, alpha } from "@mui/system";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const UnknownFile = ({ src, name }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.2),
                borderRadius: 5,
                aspectRatio: "3/2",
                maxWidth: 300,
            }}
        >
            <a target="_blank" rel="noreferrer" href={src}>
                <IconButton sx={{ width: 50, height: 50 }}>
                    <TextSnippetIcon sx={{ width: 50, height: 50 }} />
                </IconButton>
            </a>
            <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ wordBreak: "break-word" }}>{name}</Typography>
            </Box>
        </Box>
    );
};

export default UnknownFile;
