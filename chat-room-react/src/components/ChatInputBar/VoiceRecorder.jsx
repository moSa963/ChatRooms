import { IconButton } from "@mui/material";
import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import Recorder from "./Recorder";
const VoiceRecorder = ({ onPicked, file, setFile }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Recorder open={open} setFile={setFile} file={file} />
            <IconButton
                size="small"
                onMouseDown={() => setOpen(true)}
                onTouchStart={() => setOpen(true)}
                onTouchEnd={() => setOpen(false)}
                onMouseUp={() => setOpen(false)}
                onMouseLeave={() => setOpen(false)}
            >
                <MicIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default VoiceRecorder;
