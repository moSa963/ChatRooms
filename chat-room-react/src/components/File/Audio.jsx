import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const StyledAudio = styled("audio")({
    width: "100%",
});

const Audio = ({ src, type, paused, onPlay }) => {
    const ref = React.useRef();

    React.useEffect(() => {
        paused && ref.current && ref.current.pause();
    }, [paused]);

    return (
        <Box sx={{ width: "100%" }}>
            <StyledAudio
                controls
                sx={{ padding: "10px" }}
                preload="metadata"
                ref={ref}
                onPlay={onPlay}
            >
                {src && <source src={src} type={type} />}
                Your browser does not support the audio element.
            </StyledAudio>
        </Box>
    );
};

export default Audio;
