import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import request from "../../util/Request";

const JoinButton = ({ room, onChange }) => {
    const [processing, setProcessing] = React.useState(false);
    const auth = useSelector(selectAuth);
    const status =
        room?.user_status === "join"
            ? room?.locked
                ? "locked"
                : "join"
            : room?.user_status;

    const handleClick = () => {
        joinRequest(room, status, setProcessing, auth, onChange);
    };

    return (
        <Button
            disabled={
                processing ||
                status === "owner" ||
                status === "banned" ||
                status === "locked"
            }
            variant="outlined"
            onClick={handleClick}
            color={status === "join" ? "error" : "primary"}
        >
            {status}
        </Button>
    );
};

const joinRequest = async (room, status, setProcessing, auth, onChange) => {
    setProcessing(true);

    var res = null;

    if (status === "requested" || status === "joined") {
        res = await request(
            `api/rooms/${room?.id}/users/${auth.username}`,
            "DELETE"
        );
    } else if (status === "invited") {
        res = await request(`api/rooms/${room?.id}/invitations/accept`, "POST");
    } else if (status === "join") {
        res = await request(`api/rooms/${room?.id}/requests`, "POST");
    }

    if (res?.ok) {
        const js = await res.json();
        onChange(js.data, status);
        setProcessing(false);
    }
};

export default JoinButton;
