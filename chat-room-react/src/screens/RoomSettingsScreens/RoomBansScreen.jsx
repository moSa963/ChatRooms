import React from "react";
import { useOutletContext } from "react-router-dom";
import List from "../../components/PaginationList";
import { Button } from "@mui/material";
import request from "../../util/Request";
import User from "../../components/User/User";

const RoomBansScreen = () => {
    const [room] = useOutletContext();

    const handleUnban = (v, setData) => {
        unban(room, v, setData);
    };

    return (
        <List
            url={`api/rooms/${room?.id}/bans`}
            generator={([data, setData]) =>
                data.map((v, i) => (
                    <User key={v?.id} user={v} fullWidth>
                        <Button onClick={() => handleUnban(v, setData)}>
                            UNBAN
                        </Button>
                    </User>
                ))
            }
        />
    );
};

const unban = async (room, user, setData) => {
    const res = await request(
        `api/rooms/${room.id}/bans/${user?.username}`,
        "DELETE"
    );

    if (res.ok) {
        setData((data) => data.filter((v) => v?.id !== user?.id));
    }
};

export default RoomBansScreen;
