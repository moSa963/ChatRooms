import { TextField } from "@mui/material";
import React from "react";
import request from "../../util/Request";
import FormGrid from "./FormGrid";
import FormItem from "./FormItem";

const UpdateRoomInfoForm = ({ room, setRoom }) => {
    const [input, setInput] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [processing, setProcessing] = React.useState(false);

    const handleChange = (k, v) => {
        input[k] = v;
        setInput({ ...input });
    };

    const handleSave = () => {
        update(room, input, setErrors, setRoom, setProcessing);
    };

    return (
        <FormGrid
            title="Room info"
            onSave={handleSave}
            disabled={processing}
            processing={processing}
        >
            <FormItem label="Name:">
                <TextField
                    size="small"
                    fullWidth
                    value={input?.name || room?.name || ""}
                    onChange={(e) =>
                        handleChange("name", e.currentTarget.value)
                    }
                    error={errors?.name?.at(0)}
                />
            </FormItem>
            <FormItem label="Description:">
                <TextField
                    size="small"
                    fullWidth
                    value={input?.description || room?.description || ""}
                    onChange={(e) =>
                        handleChange("description", e.currentTarget.value)
                    }
                    error={errors?.description?.at(0)}
                />
            </FormItem>
        </FormGrid>
    );
};

const update = async (room, data, setErrors, setRoom, setProcessing) => {
    setProcessing(true);

    const res = await request("api/rooms/" + room?.id, "POST", data);

    setProcessing(false);

    if (res.ok) {
        const js = await res.json();
        setRoom(js.data);
        return;
    }

    const js = await res.json();
    setErrors(js.errors);
};

export default UpdateRoomInfoForm;
