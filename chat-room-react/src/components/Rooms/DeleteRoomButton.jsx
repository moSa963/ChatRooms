import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../features/auth/authSlice";
import permissions from "../../util/Permissions";
import request from "../../util/Request";
import ConfirmCard from "../ConfirmCard";
import { useDispatch, useSelector } from "react-redux";
import { removeRoom } from "../../features/rooms/roomsSlice";

const DeleteRoomButton = ({ room }) => {
    const auth = useSelector(selectAuth);
    const [open, setOpen] = React.useState();
    const nav = useNavigate();
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {open && (
                <ConfirmCard
                    open={true}
                    action={() => deleteRoom(room, nav, dispatch)}
                    message="Are you sure you want to delete this room? this action is irreversible"
                    onClose={() => setOpen(false)}
                />
            )}
            {permissions.owner(room, auth) && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpen(true)}
                >
                    DELETE
                </Button>
            )}
        </React.Fragment>
    );
};

const deleteRoom = async (room, nav, dispatch) => {
    const res = await request("api/rooms/" + room.id, "DELETE");

    if (res.ok) {
        dispatch(removeRoom(room));
        nav("/dashboard/rooms");
    }
};

export default DeleteRoomButton;
