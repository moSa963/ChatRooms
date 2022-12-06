import { LinearProgress } from "@mui/material";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import request from "../../util/Request";
import ErrorScreen from "../ErrorScreen";

const UserBaseScreen = () => {
    const { username } = useParams();
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        getUser(username, setUser, setError);
    }, [username]);

    if (error) {
        return (
            <ErrorScreen
                status={error.status}
                errorText={error.errorText}
                to="../"
                toText="GO BACK"
            />
        );
    }

    return (
        <React.Fragment>
            {!user && <LinearProgress />}
            {user && <Outlet context={[user, setUser]} />}
        </React.Fragment>
    );
};

const getUser = async (username, setUser, setError) => {
    const res = await request("api/users/" + username);

    if (res.ok) {
        const js = await res.json();
        setUser(js.data);
        setError(null);
        return;
    }

    setError({ status: res.status, errorText: res.statusText });
};

export default UserBaseScreen;
