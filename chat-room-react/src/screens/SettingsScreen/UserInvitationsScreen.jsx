import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../../components/PaginationList";
import UserInvite from "../../components/Rooms/UserInvite";
import { selectAuth } from "../../features/auth/authSlice";
import { addRoom } from "../../features/rooms/roomsSlice";

const UserInvitationsScreen = () => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    const handleAccepted = (room) => {
        dispatch(addRoom(room));
    };

    return (
        <Box>
            <List
                url={"api/user/invitations"}
                generator={([data, setData]) =>
                    data.map((v, i) => (
                        <UserInvite
                            key={v?.id}
                            authUser={auth}
                            room={v}
                            setInvites={setData}
                            onAccepted={handleAccepted}
                        />
                    ))
                }
            />
        </Box>
    );
};

export default UserInvitationsScreen;
