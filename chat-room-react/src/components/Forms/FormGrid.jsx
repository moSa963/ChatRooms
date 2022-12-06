import { Button, LinearProgress, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FormItem from "./FormItem";

const FormGrid = ({ children, onSave, title, disabled, processing }) => {
    return (
        <Box>
            <Typography variant="h5">{title}</Typography>
            <Paper
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    mt: 1,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                {processing && <LinearProgress />}

                {children}
                {onSave && (
                    <FormItem noDivider p={0}>
                        <Button
                            disabled={disabled}
                            size="large"
                            sx={{ float: "right" }}
                            onClick={() => onSave()}
                        >
                            Save
                        </Button>
                    </FormItem>
                )}
            </Paper>
        </Box>
    );
};

export default FormGrid;
