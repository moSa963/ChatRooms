import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    createRoomAsync,
    selectRoomsLoading,
} from "../../features/rooms/roomsSlice";
import Validator from "../../util/Validator";
import Screen from "../Screen";

const validator = new Validator({
    name: { min: 3, max: 50, match: /^[A-Za-z]+([ ._-]?[A-Za-z0-9]+)*$/s },
    description: { min: 8, max: 50 },
});

const CreateRoomScreen = () => {
    const [inputs, setInputs] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const loading = useSelector(selectRoomsLoading);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleInput = (key, value) => {
        inputs[key] = value;
        setInputs({ ...inputs });
        errors[key] = validator.validateOne(key, inputs);
        setErrors({ ...errors });
    };

    const handleCreate = () => {
        if (loading) return;

        const errs = validator.validate(inputs);

        if (errs) {
            setErrors(errs);
            return;
        }

        dispatch(
            createRoomAsync({
                room: inputs,
                action: (r) =>
                    nav("/dashboard/rooms/" + r.id + "/settings", {
                        replace: true,
                    }),
            })
        );
    };

    return (
        <Screen>
            <Box>
                <Typography variant="h4">Create a room: </Typography>
                <Divider sx={{ mb: 3 }}></Divider>
            </Box>
            <Paper
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    mt: 1,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography>Room name: </Typography>
                    <TextField
                        fullWidth
                        placeholder="Name..."
                        size="small"
                        onChange={(e) =>
                            handleInput("name", e.currentTarget.value)
                        }
                        value={inputs["name"] || ""}
                        error={Boolean(errors["name"])}
                        helperText={errors["name"]}
                    />
                    <Typography variant="caption" color="GrayText">
                        the name of the room other will see or search for
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography>Room description: </Typography>
                    <TextField
                        fullWidth
                        placeholder="Description..."
                        size="small"
                        onChange={(e) =>
                            handleInput("description", e.currentTarget.value)
                        }
                        value={inputs["description"] || ""}
                        error={Boolean(errors["description"])}
                        helperText={errors["description"]}
                    />
                </Box>
                <Divider />

                <Button
                    onClick={handleCreate}
                    disabled={loading}
                    variant="text"
                    sx={{ float: "right" }}
                >
                    Create
                </Button>
            </Paper>
        </Screen>
    );
};
export default CreateRoomScreen;
