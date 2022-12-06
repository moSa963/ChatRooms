import { Fade, Icon, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const RecordingCard = ({ disabled }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const id = setInterval(() => {
            setCount && setCount((c) => c + 1);
        }, 1000);

        return () => id && clearInterval(id);
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Icon color="error" sx={{ width: 35, height: 35 }}>
                <Fade in={count % 2 === 0}>
                    {disabled ? (
                        <MicOffIcon sx={{ width: 35, height: 35 }} />
                    ) : (
                        <MicIcon sx={{ width: 35, height: 35 }} />
                    )}
                </Fade>
            </Icon>
            {disabled && (
                <Typography color="error">
                    cannot access the microphone
                </Typography>
            )}
            {!disabled && (
                <Typography>
                    {Math.floor(count / 60)}:{Math.floor(count % 60)}
                </Typography>
            )}
        </Box>
    );
};

export default RecordingCard;
