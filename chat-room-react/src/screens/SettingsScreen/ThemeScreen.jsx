import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import SelectThemeMode from "./SelectThemeMode";

const ThemeScreen = () => {
    return (
        <Paper>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ p: 2 }}
            >
                <Typography>Theme mode</Typography>
                <SelectThemeMode />
            </Stack>
        </Paper>
    );
};

export default ThemeScreen;
