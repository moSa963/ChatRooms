import { Paper, List as MuiList, alpha, LinearProgress } from "@mui/material";
import React from "react";

const Drawer = ({ children, processing }) => {
    const [opacity, setOpacity] = React.useState(0);

    return (
        <Paper sx={{ borderRadius: 0, boxShadow: 0, zIndex: 1 }}>
            <MuiList
                onMouseEnter={() => setOpacity(0.5)}
                onMouseLeave={() => setOpacity(0)}
                sx={{
                    width: "fit-content",
                    height: "100%",
                    overflow: "auto",
                    overflowX: "hidden",
                    "::-webkit-scrollbar-thumb": {
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.dark, opacity),
                    },
                }}
            >
                {processing && <LinearProgress />}
                {children}
            </MuiList>
        </Paper>
    );
};

export default Drawer;
