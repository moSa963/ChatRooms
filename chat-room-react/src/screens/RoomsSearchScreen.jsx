import { Divider } from "@mui/material";
import React from "react";
import List from "../../components/PaginationList";
import Room from "../components/Rooms/Room";
import Screen from "./Screen";

const RoomUsersScreen = () => {
    return (
        <Screen>
            <List
                url={"api/rooms/search"}
                generator={([data]) =>
                    data.map((room) => (
                        <React.Fragment key={room?.id}>
                            <Room noLastMessage room={room} />
                            <Divider sx={{ my: 1 }} />
                        </React.Fragment>
                    ))
                }
            />
        </Screen>
    );
};

export default RoomUsersScreen;
