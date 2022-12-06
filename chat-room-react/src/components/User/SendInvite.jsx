import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import request from "../../util/Request";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

const SendInvite = ({ room }) => {
    const [input, setInput] = React.useState("");
    const [status, setStatus] = React.useState({ error: false, message: "" });
    const [processing, setProcessing] = React.useState(false);

    const handleSend = () => {
        if (processing) return;
        sendInvite(room, input, setInput, setStatus, setProcessing);
    };

    return (
        <Box>
            <Typography variant="caption">Send an invitation:</Typography>
            <Paper
                sx={{
                    flex: 1,
                    width: "100%",
                    borderRadius: 2,
                    display: "flex",
                    overflow: "hidden",
                }}
            >
                <InputBase
                    onKeyUp={(e) => e.key === "Enter" && handleSend}
                    value={input}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    placeholder="Username..."
                    sx={{ width: "100%", px: 2 }}
                />
                <Button
                    onClick={handleSend}
                    disabled={input === ""}
                    title="send invite"
                >
                    <SendIcon />
                </Button>
            </Paper>
            <Typography
                sx={{ mb: 3, pl: 2 }}
                color={status.error ? "error" : "green"}
            >
                {status.message}
            </Typography>
        </Box>
    );
};

const sendInvite = async (
    room,
    username,
    setInput,
    setStatus,
    setProcessing
) => {
    setProcessing(true);

    const res = await request(
        `api/rooms/${room.id}/invitations/${username}`,
        "POST"
    );

    if (res.ok) {
        setInput("");
        setStatus({ error: false, message: "invite sent successfully" });
        setProcessing(false);
        return;
    }

    const js = await res.json();
    setStatus({ error: true, message: js.message });
    setProcessing(false);
};

export default SendInvite;
