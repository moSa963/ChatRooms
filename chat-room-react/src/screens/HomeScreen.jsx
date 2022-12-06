import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import List from "../components/PaginationList";
import RoomCard from "../components/Rooms/RoomCard";
import Screen from "./Screen";

const HomeScreen = () => {
    return (
        <Screen>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Link to="/dashboard/rooms/new">
                    <Button>CREATE ROOM</Button>
                </Link>
                <Link to="/dashboard/rooms">
                    <Button>MY ROOMS</Button>
                </Link>
                <Link to="/dashboard/settings">
                    <Button>Settings</Button>
                </Link>
            </Box>

            <Divider sx={{ my: 2 }} />

            <List
                row
                url={"api/search/rooms"}
                generator={([data, setRooms]) =>
                    data.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            setRooms={setRooms}
                        />
                    ))
                }
            />
        </Screen>
    );
};

export default HomeScreen;
