import { Link, Typography } from "@mui/material";
import { Box, alpha } from "@mui/system";
import React from "react";

const MessageTitle = ({ title, right }) => {
    const [hidden, setHidden] = React.useState(true);

    return (
        <Box onClick={() => setHidden(false)}
            sx={{
                position: "relative",
                border: "1px solid",
                bgcolor: (theme) =>
                    alpha(theme.palette.background.default, 0.8),
                borderColor: (theme) =>
                    right
                        ? alpha(theme.palette.primary.dark, 0.3)
                        : alpha(theme.palette.divider, 0.3),
                p: 0.5,
            }}
        >
            <Typography
                sx={{
                    wordBreak: "break-word",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    overflow: "hidden",
                    display: hidden ? "-webkit-box" : "block",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: "15",
                }}
            >
                {mapText(title)}

            </Typography>
        </Box>
    );
};

const mapText = (title = "") => {
    const reg =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;

    const res = title.split(" ");

    res.forEach((v, i) => {
        if (reg.test(v)) {
            res[i] = (
                <Link key={i} href={res[i]}>
                    {v}
                </Link>
            );
        } else {
            res[i] += " ";
        }
    });

    return res;
};

export default MessageTitle;
