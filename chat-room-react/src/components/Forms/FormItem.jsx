import { Box, Divider, Typography } from "@mui/material";
import React, { Fragment } from "react";

const FormItem = ({ children, label, noDivider, p = 2, description }) => {
    return (
        <Fragment>
            <Box
                sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    display: "flex",
                    width: "100%",
                    p: p,
                    alignItems: { xs: "normal", sm: "center" },
                }}
            >
                <Box sx={{ minWidth: 100 }}>
                    <Typography>{label}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                    {children}
                    {description && (
                        <Typography color="GrayText">{description}</Typography>
                    )}
                </Box>
            </Box>
            {!noDivider && <Divider />}
        </Fragment>
    );
};

export default FormItem;
