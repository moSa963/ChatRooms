import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useOutletContext } from "react-router-dom";
import List from "../../components/PaginationList";
import SendInvite from "../../components/User/SendInvite";
import User from "../../components/User/User";

const RoomUsersScreen = () => {
    const [room] = useOutletContext();

    return (
        <Box>
            <SendInvite room={room} />
            <List
                url={`api/rooms/${room?.id}/users`}
                generator={([data]) =>
                    data.map((v, i) => (
                        <React.Fragment key={v?.id}>
                            <User user={v} room={room} fullWidth />
                            <Divider sx={{ my: 1 }} />
                        </React.Fragment>
                    ))
                }
            />
        </Box>
    );
};

export default RoomUsersScreen;
