import { Typography, Icon, Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const DrawerTitle = ({ title, collapse, icon, mt = 0, onClick }) => {
    if (collapse) {
        return (
            <Box sx={{ textAlign: "center" }}>
                <IconButton size="small" onClick={onClick}>
                    <Icon title={title}>{icon}</Icon>
                </IconButton>
            </Box>
        );
    }

    return (
        <Button
            sx={{
                display: "flex",
                userSelect: "none",
                cursor: "pointer",
                px: 1,
                justifyContent: "center",
                alignItems: "center",
                mt: mt,
                width: 1,
            }}
            onClick={onClick}
        >
            <Typography variant="caption" sx={{ flex: 1 }}>
                {title}
            </Typography>
        </Button>
    );
};

export default DrawerTitle;
