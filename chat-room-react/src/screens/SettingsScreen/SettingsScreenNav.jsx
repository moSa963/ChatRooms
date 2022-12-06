import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Screen from "../Screen";

const SettingsScreenNav = () => {
    const [value, setValue] = React.useState(0);
    const nav = useNavigate();
    const { pathname } = useLocation();

    React.useEffect(() => {
        links.forEach((e, i) => {
            if (pathname.endsWith(e)) {
                setValue(i);
            }
        });
    }, [pathname]);

    const handleChange = (e, v) => {
        nav(links[v]);
        setValue(v);
    };

    return (
        <Screen>
            <Typography variant="h4">Settings</Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Profile" />
                    <Tab label="Theme" />
                    <Tab label="Invitations" />
                </Tabs>
            </Box>
            <Outlet />
        </Screen>
    );
};

const links = ["", "theme", "invitations"];

export default SettingsScreenNav;
