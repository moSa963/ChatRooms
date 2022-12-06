import { Button } from "@mui/material";
import React from "react";
import request from "../../util/Request";

const LogoutButton = () => {
    return (
        <Button variant="contained" color="error" onClick={logout}>
            LOGOUT
        </Button>
    );
};

const logout = async () => {
    await request("logout", "POST");
    window.location.reload();
};

export default LogoutButton;
