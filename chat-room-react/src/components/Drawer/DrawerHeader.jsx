import { IconButton, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import UploadIcon from "@mui/icons-material/Upload";

const DrawerHeader = ({ title, collapse, onChange, right }) => {
    const matches = useMediaQuery("(max-width:800px)");

    React.useEffect(() => {
        matches && onChange && onChange(true);
    }, [matches, onChange]);

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                justifyContent: "center",
                zIndex: 2,
                position: "sticky",
                top: 0,
                alignItems: "center",
                flexDirection: right ? "row-reverse" : "row",
            }}
        >
            {!collapse && (
                <Typography variant="caption" sx={{ flex: 1 }}>
                    {title}
                </Typography>
            )}

            <IconButton
                size="small"
                onClick={() => onChange && onChange(!collapse)}
            >
                <UploadIcon
                    sx={{
                        transition: "transform 600ms",
                        transform: `rotate(${
                            collapse ? (right ? -90 : 90) : right ? 90 : -90
                        }deg)`,
                    }}
                />
            </IconButton>
        </Stack>
    );
};

export default DrawerHeader;
