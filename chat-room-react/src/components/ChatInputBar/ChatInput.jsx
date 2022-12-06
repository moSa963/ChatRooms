import { Paper, Stack, TextField } from "@mui/material";
import { Box, alpha } from "@mui/system";
import React from "react";
import { textDirection } from "../../util/TextDirection";
import EmojiPicker from "../Emojis/EmojiPicker";
import ChatInputButton from "./ChatInputButton";
import ChatInputFile from "./ChatInputFile";
import VoiceRecorder from "./VoiceRecorder";

const ChatInput = ({ onSend, room, loading }) => {
    const [value, setValue] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [disabled, setDisabled] = React.useState(false);
    const [opacity, setOpacity] = React.useState(.8);

    const handleSend = (e) => {
        if (!room || disabled || (value === "" && file === null) || loading)
            return;

        onSend({ title: value, file: file });
        setValue("");
        setFile(null);
    };

    return (
        <Paper
            onMouseEnter={()=>setOpacity(1)}
            onMouseLeave ={()=>setOpacity(.8)}
            elevation={1}
            sx={{
                p: 0.5,
                bgcolor: t => alpha(t.palette.background.paper, opacity),
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                borderRadius: 0,
            }}
            onKeyUp={(e) => e.key === "Enter" && handleSend()}
        >
            <Box sx={{ display: "flex", height: "fit-content", px: 1 }}>
                <EmojiPicker onPicked={(v) => setValue(value + v)} />
                <ChatInputFile file={file} setFile={setFile} />
                <VoiceRecorder file={file} setFile={setFile} />
            </Box>

            <Stack direction="row" sx={{ flex: 1 }} spacing={1}>
                <TextField
                    fullWidth
                    placeholder="Message..."
                    autoComplete="off"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    size="small"
                    variant="outlined"
                    sx={{ p: 0, m: 0, direction: textDirection(value) }}
                />

                <ChatInputButton
                    room={room}
                    onSend={handleSend}
                    disabled={
                        !room ||
                        disabled ||
                        loading ||
                        !(value !== "" || file !== null)
                    }
                    setDisabled={setDisabled}
                />
            </Stack>
        </Paper>
    );
};

export default ChatInput;
