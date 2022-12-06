import React from "react";
import { useOutletContext } from "react-router-dom";
import UserBanner from "../../components/User/UserBanner";
import Screen from "../Screen";

const UserScreen = () => {
    const [user] = useOutletContext();

    return (
        <Screen>
            <UserBanner user={user} />
        </Screen>
    );
};

export default UserScreen;
