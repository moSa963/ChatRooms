import { IconButton } from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import request from "../../util/Request";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../features/messages/messagesSlice";

const DeleteMessageButton = ({ message }) => {
    const [processing, setProcessing] = React.useState(false);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (processing) return;

        deleteMessage(message, setProcessing, dispatch);
    };

    return (
        <IconButton size="small" onClick={handleClick} title="delete">
            <HighlightOffIcon />
        </IconButton>
    );
};

const deleteMessage = async (message, setProcessing, dispatch) => {
    setProcessing(true);

    const res = await request(
        `api/rooms/${message?.room_id}/messages/${message?.id}`,
        "DELETE"
    );

    if (res.ok) {
        dispatch(
            updateMessage({
                message: message,
                update: { deleted: true, title: "deleted message" },
            })
        );
    }

    setProcessing(false);
};

export default DeleteMessageButton;
