import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AvatarLink = ({ to, width = 40, height = 40, src }) => {
    return (
        <Link to={to}>
            <Avatar
                sx={{
                    width: width,
                    height: height,
                    ":hover": {
                        border: "1px solid",
                        borderColor: "primary.dark",
                        transform: "scale(1.1)",
                        filter: "brightness(95%)",
                    },
                }}
                src={src}
            />
        </Link>
    );
};

export default AvatarLink;
