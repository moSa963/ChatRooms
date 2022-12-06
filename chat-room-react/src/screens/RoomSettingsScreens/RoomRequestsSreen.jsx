import { Box } from "@mui/system";
import React from "react";
import { useOutletContext } from "react-router-dom";
import List from "../../components/PaginationList";
import UserRequest from "../../components/Rooms/UserRequest";

const RoomRequestsSreen = () => {
    const [room] = useOutletContext();

    return (
        <Box>
            <List
                url={`api/rooms/${room?.id}/requests`}
                generator={([data, setData]) =>
                    data.map((v, i) => (
                        <UserRequest
                            key={v?.id}
                            req={v}
                            room={room}
                            setRequests={setData}
                        />
                    ))
                }
            />
        </Box>
    );
};

export default RoomRequestsSreen;
