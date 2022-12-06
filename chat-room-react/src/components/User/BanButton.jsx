import React from "react";
import request from "../../util/Request";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BanButton = ({ user, room }) => {
    const nav = useNavigate();
    const [processing, setProcessing] = React.useState(false);

    const handleClick = () => {
        if (processing) return;

        setProcessing(true);
        banUser(room, user, nav);
    };

    return (
        <Button
            disabled={processing}
            variant="outlined"
            color="error"
            onClick={handleClick}
        >
            BAN
        </Button>
    );
};

const banUser = async (room, user, nav) => {
    const res = await request(
        `api/rooms/${room.id}/bans/${user.username}`,
        "POST"
    );

    if (res.ok) {
        nav(`/dashboard/rooms/${room.id}/settings/bans`, { replace: true });
    }
};

export default BanButton;
