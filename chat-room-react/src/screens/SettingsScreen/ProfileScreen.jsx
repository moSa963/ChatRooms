import React from "react";
import UpdateImage from "../../components/UpdateImage";
import { APP_URL } from "../../util/Request";
import ProfileUpdateForm from "../../components/Forms/ProfileUpdateForm";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import LogoutButton from "../../components/User/LogoutButton";

const ProfileScreen = () => {
    const auth = useSelector(selectAuth);

    return (
        <React.Fragment>
            <UpdateImage
                src={`${APP_URL}api/users/${auth?.username}/image`}
                link="api/user/image"
                caption="Must be JPEG, PNG, or GIF and cannot exceed 10MB"
            />

            <ProfileUpdateForm />

            <LogoutButton />
        </React.Fragment>
    );
};

export default ProfileScreen;
