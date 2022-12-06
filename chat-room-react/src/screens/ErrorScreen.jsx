import { Box } from "@mui/system";
import React from "react";
import { Button, Icon, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorScreen = ({ status, errorText, to, toText }) => {
    return (
        <Box
            sx={{
                width: 1,
                height: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "secondary.dark",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    width: "100%",
                    maxWidth: 500,
                    alignItems: "center",
                }}
            >
                <Icon sx={{ width: 150, height: 150 }}>
                    <ErrorOutlineIcon sx={{ width: 150, height: 150 }} />
                </Icon>
                <Stack spacing={1} sx={{}}>
                    <Typography>{status}</Typography>
                    <Typography variant="h5">{errorText}</Typography>
                    {to && (
                        <Link to={to}>
                            <Button variant="text">{toText}</Button>
                        </Link>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default ErrorScreen;
