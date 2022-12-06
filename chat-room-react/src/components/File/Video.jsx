import { Box } from "@mui/system";
import React from "react";

const Video = ({ src, type, paused = false, onPlay }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        paused && ref?.current && ref.current.pause();
    }, [paused]);

    return (
        <Box sx={{ width: "100%", objectFit: "contain", overflow: "hidden" }}>
            <video
                width="100%"
                controls
                preload="metadata"
                ref={ref}
                onPlay={onPlay}
            >
                {src && <source src={src} type={type} />}
                Your browser does not support the video tag.
            </video>
        </Box>
    );
};

export default Video;
