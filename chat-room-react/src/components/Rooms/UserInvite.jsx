import { Button, ButtonGroup, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import request, { APP_URL } from "../../util/Request";
import DrawerItem from "../Drawer/DrawerItem";

const UserInvite = ({ room, setInvites, authUser, onAccepted }) => {
    const [processing, setProcessing] = React.useState(false);

    const handleDelete = () => {
        if (processing) return;
        remove(room, authUser.username, setInvites, setProcessing);
    };

    const handleAccept = () => {
        if (processing) return;
        accept(room, setInvites, onAccepted, setProcessing);
    };

    return (
        <DrawerItem
            fullWidth
            text={room?.name}
            to={`/dashboard/rooms/${room.id}/chat`}
            secondaryText={`@${room?.owner?.username}`}
            src={`${APP_URL}api/rooms/${room?.id}/image`}
        >
            {processing && <LinearProgress sx={{ width: 0.4 }}/>}
            <Box>
                <ButtonGroup size="small" variant="text">
                    <Button
                        color="error"
                        onClick={handleDelete}
                    >
                        delete
                    </Button>
                    <Button
                        onClick={handleAccept}
                    >
                        accept
                    </Button>
                </ButtonGroup>
            </Box>
        </DrawerItem>
    );
};

const accept = async (room, setInvites, onAccepted, setProcessing) => {
    setProcessing(true);
    const res = await request(
        "api/rooms/" + room?.id + "/invitations/accept",
        "POST"
    );
    setProcessing(false);

    if (res.ok) {
        setInvites((requests) => requests.filter((v) => v?.id !== room?.id));
        onAccepted && onAccepted(room);
    }
};

const remove = async (room, username, setInvites, setProcessing) => {
    setProcessing(true);
    const res = await request(
        "api/rooms/" + room?.id + "/users/" + username,
        "DELETE"
    );
    setProcessing(false);

    if (res.ok) {
        setInvites((requests) => requests.filter((v) => v?.id !== room?.id));
    }
};

export default UserInvite;
