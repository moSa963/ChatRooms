import { IconButton } from "@mui/material";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PreviewCard from "./PreviewCard";

const ChatInputFile = ({ onPicked, file, setFile }) => {
    const handleChange = (f) => {
        setFile(f);
    };

    return (
        <React.Fragment>
            {file && <PreviewCard file={file} setFile={setFile} />}

            <IconButton
                size="small"
                onClick={(e) => e.currentTarget.children[0].click()}
            >
                <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleChange(e.currentTarget.files[0])}
                ></input>
                <AttachFileIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default ChatInputFile;
