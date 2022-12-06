import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DrawerTitle from "./Drawer/DrawerTitle";
import { Collapse } from "@mui/material";

const List = ({
    items = [],
    count,
    map = (v, i) => v,
    filter = (v, i) => v,
    sort = (x, y) => 1,
    row,
    collapse,
    title,
    icon,
}) => {
    const [max, setMax] = React.useState(count);
    const [appears, setAppears] = React.useState(true);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: row ? "row" : "column",
                alignItems: row ? "center" : "normal",
            }}
        >
            {title && (
                <DrawerTitle
                    collapse={collapse || row}
                    title={title}
                    icon={icon}
                    onClick={() => setAppears((a) => !a)}
                />
            )}

            <Collapse
                in={appears}
                orientation={row ? "horizontal" : "vertical"}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: row ? "row" : "column",
                        height: row ? "100%" : "fit-content",
                        alignItems: "center",
                    }}
                >
                    {items
                        .filter(filter)
                        .sort(sort)
                        .map((v, i) => i < max && map(v, i))}

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {items.length - 1 > max && (
                            <Box>
                                <IconButton
                                    onClick={() => setMax(max + count)}
                                    size="small"
                                    title="more"
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Box>
                        )}

                        {max > count && (
                            <Box>
                                <IconButton
                                    onClick={() => setMax(count)}
                                    size="small"
                                    title="less"
                                >
                                    <RemoveCircleOutlineIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Collapse>
        </Box>
    );
};

export default List;
