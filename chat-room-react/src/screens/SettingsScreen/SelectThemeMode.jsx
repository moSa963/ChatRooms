import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useThemeMode } from "../../contexts/ThemeContext";

const SelectThemeMode = () => {
    const { themeMode, setThemeMode } = useThemeMode();

    return (
        <Select
            size="small"
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value)}
        >
            <MenuItem value={"device"}>Device theme</MenuItem>
            <MenuItem value={"light"}>Light Theme</MenuItem>
            <MenuItem value={"dark"}>Dark Theme</MenuItem>
        </Select>
    );
};

export default SelectThemeMode;
