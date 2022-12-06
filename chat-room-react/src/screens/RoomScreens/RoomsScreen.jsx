import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import List from "../../components/List";
import Room from "../../components/Rooms/Room";
import { sortRooms } from "../../components/Rooms/RoomsList";
import SearchBar from "../../components/SearchBar";
import { selectRooms } from "../../features/rooms/roomsSlice";
import Screen from "../Screen";

const RoomsScreen = () => {
    const [value, setValue] = React.useState(0);
    const [key, setKey] = React.useState("");
    const rooms = useSelector(selectRooms);

    return (
        <Screen>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={(e, v) => setValue(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="JOINED" />
                    <Tab label="My rooms" />
                </Tabs>
            </Box>
            <Box>
                <SearchBar mb={2} onSearch={(v) => setKey(v)} sticky />
            </Box>
            <List
                key={value}
                sort={sortRooms}
                items={rooms?.filter(
                    (v) =>
                        v.name.includes(key) && (value ? v.isOwner : !v.isOwner)
                )}
                count={10}
                map={(v) => <Room key={v?.id} room={v} fullWidth />}
            />
        </Screen>
    );
};

export default RoomsScreen;
