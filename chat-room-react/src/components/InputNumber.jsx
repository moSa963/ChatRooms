import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const InputNumber = ({ initValue, onChange, adornment }) => {
    const [value, setValue] = React.useState(initValue);

    React.useEffect(() => {
        if (!value) return;

        const id = setTimeout(
            () => onChange && onChange(parseInt(value)),
            1000
        );

        return () => clearTimeout(id);
    }, [value, onChange]);

    return (
        <TextField
            type="number"
            min={0}
            size="small"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">{adornment}</InputAdornment>
                ),
            }}
        />
    );
};

export default InputNumber;
