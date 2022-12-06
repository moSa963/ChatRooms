import React from "react";
import Drawer from "../Drawer/Drawer";
import DrawerHeader from "../Drawer/DrawerHeader";
import ModeIcon from "@mui/icons-material/Mode";
import List from "../List";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Room from "./Room";
import { useSelector } from "react-redux";
import { selectRooms } from "../../features/rooms/roomsSlice";
import { alpha, Box } from "@mui/system";
import { Collapse, IconButton, Paper } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const RoomsList = ({ row }) => {
    const [hidden, setHidden] = React.useState(false);

    if (!row) {
        return (
            <Drawer>
                <Content />
            </Drawer>
        );
    }

    return (
        <Paper
            elevation={0}
            onClick={(e) => setHidden(false)}
            sx={{
                position: "relative",
                overflow: "auto",
                "::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
                p: 0.3,
                boxShadow: (theme) =>
                    `inset 0 0 ${hidden ? 5 : 10}px ${alpha(
                        theme.palette.text.primary,
                        0.3
                    )}`,
                borderRadius: 0,
            }}
        >
            <IconButton
                size="small"
                onClick={(e) => {
                    setHidden((v) => !v);
                    e.stopPropagation();
                }}
                sx={{ position: "absolute", bgcolor: "backgroung.default" }}
            >
                <KeyboardArrowUpIcon />
            </IconButton>
            <Collapse in={!hidden} collapsedSize={5}>
                <Box
                    sx={{
                        display: "flex",
                        visibility: hidden ? "hidden" : "visible",
                    }}
                >
                    <Content noHeaders row />
                </Box>
            </Collapse>
        </Paper>
    );
};

const Content = ({ row }) => {
    const [collapse, setCollapse] = React.useState(false);
    const rooms = useSelector(selectRooms);

    return (
        <React.Fragment>
            {!row && (
                <DrawerHeader collapse={collapse} onChange={setCollapse} />
            )}

            <List
                row={row}
                count={row ? 3 : 5}
                collapse={collapse}
                title="JOINED"
                icon={<FavoriteBorderIcon />}
                items={rooms?.filter((v) => !v.isOwner)}
                sort={sortRooms}
                map={(v, i) => (
                    <Room row={row} key={v?.id} collapse={collapse} room={v} />
                )}
            />

            <List
                row={row}
                count={row ? 3 : 5}
                collapse={collapse}
                title="MY ROOMS"
                icon={<ModeIcon />}
                items={rooms?.filter((v) => v.isOwner)}
                sort={sortRooms}
                map={(v, i) => (
                    <Room row={row} key={v?.id} collapse={collapse} room={v} />
                )}
            />
        </React.Fragment>
    );
};

export const sortRooms = (a, b) => {
    if (!a?.updated_at || a?.updated_at < b?.updated_at) return 1;
    if (!b?.updated_at || a?.updated_at > b?.updated_at) return -1;
    if (a?.updated_at === b?.updated_at) return 0;
};

export default RoomsList;
