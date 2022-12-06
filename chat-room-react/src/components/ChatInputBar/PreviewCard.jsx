import React from "react";
import { IconButton } from "@mui/material";
import { Box, alpha } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import File from "../File/File";

const PreviewCard = ({ file, setFile }) => {
    return (
        <Box
            sx={{
                position: "absolute",
                width: "100%",
                height: "45vh",
                maxHeight: 300,
                p: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                bgcolor: (theme) =>
                    alpha(theme.palette.background.default, 0.5),
                backdropFilter: "blur(5px)",
                left: 0,
                right: 0,
                bottom: "100%",
            }}
        >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                <IconButton size="small" onClick={(e) => setFile(null)}>
                    <CloseIcon color="error" />
                </IconButton>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    height: "100%",
                    position: "relative",
                    width: "100%",
                    maxWidth: 400,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: "1",
                        overflow: "hidden",
                    }}
                >
                    <File
                        src={URL.createObjectURL(file)}
                        name={file.name}
                        type={file.type}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PreviewCard;
