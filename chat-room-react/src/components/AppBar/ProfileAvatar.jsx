import React from "react";
import { Avatar, IconButton } from "@mui/material";
import { APP_URL } from "../../util/Request";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";

const ProfileAvatar = () => {
    const auth = useSelector(selectAuth);
    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <React.Fragment>
            <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />

            <IconButton
                size="small"
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <Avatar
                    sx={{ width: 35, height: 35 }}
                    src={`${APP_URL}api/users/${auth?.username}/image`}
                />
            </IconButton>
        </React.Fragment>
    );
};

export default ProfileAvatar;
