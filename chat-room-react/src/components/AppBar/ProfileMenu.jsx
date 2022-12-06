import { Box, Divider, Menu, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SelectThemeMode from "../../screens/SettingsScreen/SelectThemeMode";
import SettingsIcon from "@mui/icons-material/Settings";

const ProfileMenu = ({ anchorEl, setAnchorEl }) => {
    return (
        <Menu
            sx={{ userSelect: "none" }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClick={() => setAnchorEl(null)}
            onClose={() => setAnchorEl(null)}
        >
            <Box>
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ p: 1 }}
                >
                    <Typography>Theme: </Typography>
                    <SelectThemeMode />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Link to="/dashboard/settings">
                    <Stack direction="row" sx={{ p: 1 }}>
                        <SettingsIcon /> Settings
                    </Stack>
                </Link>
            </Box>
        </Menu>
    );
};

export default ProfileMenu;
