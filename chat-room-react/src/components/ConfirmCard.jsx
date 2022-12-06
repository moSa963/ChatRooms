import React from "react";
import { Backdrop, Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const ConfirmCard = ({ action, open, onClose, message }) => {
    const handleYes = () => {
        action && action();
        onClose && onClose();
    };

    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 5 }}
            open={open}
        >
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 5,
                    p: 2,
                }}
            >
                <Typography variant="h5"> {message}</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        width: "100%",
                    }}
                >
                    <Button onClick={onClose}>No</Button>
                    <Button color="error" onClick={handleYes}>
                        Yes
                    </Button>
                </Box>
            </Paper>
        </Backdrop>
    );
};

export default ConfirmCard;
