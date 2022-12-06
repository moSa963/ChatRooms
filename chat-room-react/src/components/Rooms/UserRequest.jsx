import { Box, Button, ButtonGroup, LinearProgress } from "@mui/material";
import React from "react";
import request, { APP_URL } from "../../util/Request";
import DrawerItem from "../Drawer/DrawerItem";

const UserRequest = ({ req, room, setRequests }) => {
    const [processing, setProcessing] = React.useState(false);

    const handleDelete = () => {
        if (processing) return;
        remove(req, room, setRequests, setProcessing);
    };

    const handleAccept = () => {
        if (processing) return;
        accept(req, room, setRequests, setProcessing);
    };

    return (
        <DrawerItem
        fullWidth
        text={req?.user.name}
        to={`/dashboard/users/${req?.user.username}`}
        secondaryText={`@${req?.user.username}`}
        src={`${APP_URL}api/users/${req?.user?.username}/image`}
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
    )
};

const accept = async (req, room, setRequests, setProcessing) => {
    setProcessing(true);
    const res = await request(
        `api/rooms/${room?.id}/requests/${req?.id}/accept`,
        "POST"
    );
    setProcessing(false);
    if (res.ok) {
        setRequests((requests) => requests.filter((v) => v?.id !== req?.id));
    }
};

const remove = async (req, room, setRequests, setProcessing) => {
    setProcessing(true);
    const res = await request(
        `api/rooms/${room?.id}/users/${req?.user.username}`,
        "DELETE"
    );
    setProcessing(false);
    if (res.ok) {
        setRequests((requests) => requests.filter((v) => v?.id !== req?.id));
    }
};

export default UserRequest;
