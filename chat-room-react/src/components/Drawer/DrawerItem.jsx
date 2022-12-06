import React from "react";
import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const DrawerItem = ({
    to,
    src,
    text,
    collapse,
    secondaryText,
    fullWidth,
    children,
    row,
    glowing,
}) => {
    const [value, setValue] = React.useState(glowing ? 5 : 0);

    React.useEffect(() => {
        const id =
            glowing &&
            setInterval(() => {
                setValue((v) => (v === 13 ? 5 : 13));
            }, 2500);

        return () => id && clearInterval(id);
    }, [glowing]);

    return (
        <Box sx={{ width: 1, display: "flex" }}>
            <Link to={to} style={{ flex: "1", minWidth: "0px" }} title={text}>
                <Box
                    sx={{
                        width: 1,
                        height: row ? "100%" : "unset",
                        display: "flex",
                        flexDirection: row ? "column" : "row",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 0.7,
                        px: 0.5,
                        ":hover": !collapse && { bgcolor: "action.hover" },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            borderRadius: "50%",
                            ":hover": collapse && { opacity: 0.7 },
                        }}
                    >
                        <Avatar
                            src={src}
                            sx={{
                                border: (t) =>
                                    `${glowing ? 2 : 0}px solid ${
                                        t.palette.primary.dark
                                    }`,
                                boxShadow: (t) =>
                                    glowing && `0 0 ${value}px ${t.palette.primary.dark}`,
                                transition: "2s",
                            }}
                        >
                            {text?.at(0)?.toUpperCase()}
                        </Avatar>
                    </Box>
                    {!collapse && (
                        <Box
                            sx={{
                                width: fullWidth ? 1 : 130,
                                ml: 1,
                                overflow: "hidden",
                                textAlign: row ? "center" : "start",
                            }}
                        >
                            <Typography noWrap sx={{ lineHeight: "unset" }}>
                                {text}
                            </Typography>
                            <Typography
                                noWrap
                                color="GrayText"
                                sx={{ lineHeight: 0 }}
                            >
                                <Typography variant="caption">
                                    {secondaryText}
                                </Typography>
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Link>
            {children}
        </Box>
    );
};

export default DrawerItem;
