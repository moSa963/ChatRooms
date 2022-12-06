import { IconButton, Menu, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import data, { categories } from "./data";
import { Box } from "@mui/system";

const EmojiPicker = ({ onPicked }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selected, setSelected] = React.useState(categories[0].name);

    return (
        <React.Fragment>
            <Menu
                sx={{ mt: -4, userSelect: "none" }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <Tabs value={0} centered>
                    <Tab value={0} label="emojis" />
                    <Tab value={1} label="Room emojis" />
                </Tabs>
                <Box
                    sx={{ width: "100%", p: 1, justifyContent: "space-evenly" }}
                >
                    {categories.map((e, i) => (
                        <IconButton
                            sx={{ width: "12%" }}
                            key={i}
                            size="small"
                            color={selected === e.name ? "info" : "default"}
                            onClick={() => setSelected(e.name)}
                        >
                            <e.Icon />
                        </IconButton>
                    ))}
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        maxWidth: 300,
                        height: 300,
                        justifyContent: "space-around",
                        fontSize: 25,
                        textAlign: "center",
                        overflow: "auto",
                        overflowX: "hidden",
                    }}
                >
                    {data[selected].map(
                        (e, i) =>
                            e.a < 13 && (
                                <Emoji key={i} emoji={e} onPicked={onPicked} />
                            )
                    )}
                </Box>
            </Menu>
            <IconButton
                size="small"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <InsertEmoticonIcon />
            </IconButton>
        </React.Fragment>
    );
};

const Emoji = ({ emoji, onPicked }) => {
    const epoint = String.fromCodePoint(parseInt(emoji.u.split("-")[0], 16));

    return (
        <Box
            title={emoji.n[0]}
            onClick={() => onPicked(epoint)}
            sx={{ width: "15%", cursor: "pointer" }}
        >
            <Paper
                sx={{
                    mt: 1,
                    ":hover": {
                        transform: "scale(1.1)",
                        boxShadow: (theme) => theme.shadows[3],
                    },
                }}
            >
                {epoint}
            </Paper>
        </Box>
    );
};

export default EmojiPicker;
