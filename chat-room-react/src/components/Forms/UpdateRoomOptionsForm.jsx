import { Switch } from "@mui/material";
import React from "react";
import request from "../../util/Request";
import FormGrid from "./FormGrid";
import FormItem from "./FormItem";
import InputNumber from "../InputNumber";

const UpdateRoomOptionsForm = ({ room, setRoom }) => {
    return (
        <FormGrid title="Room options">
            <FormItem label="Slow Mode:">
                <InputNumber
                    initValue={room?.slow_mode}
                    onChange={(v) =>
                        v !== room?.slow_mode &&
                        update(room, { slow_mode: v }, setRoom)
                    }
                    adornment="Second"
                />
            </FormItem>
            <FormItem label="Private:">
                <Switch
                    checked={Boolean(room?.is_private)}
                    onClick={() =>
                        update(
                            room,
                            { is_private: room?.is_private ? 0 : 1 },
                            setRoom
                        )
                    }
                />
            </FormItem>
            <FormItem
                label="Locked:"
                description="When the room is locked, users cannot join or request to join"
            >
                <Switch
                    checked={Boolean(room?.locked)}
                    onClick={() =>
                        update(room, { locked: room?.locked ? 0 : 1 }, setRoom)
                    }
                />
            </FormItem>
            <FormItem
                label="Read only:"
                noDivider
                description="In read-only mode, new members will not get write permission automatically."
            >
                <Switch
                    checked={Boolean(room?.read_only)}
                    onClick={() =>
                        update(
                            room,
                            { read_only: room?.read_only ? 0 : 1 },
                            setRoom
                        )
                    }
                />
            </FormItem>
        </FormGrid>
    );
};

const update = async (room, data, setRoom) => {
    const res = await request(`api/rooms/${room?.id}`, "POST", data);

    if (res.ok) {
        const js = await res.json();
        setRoom(js.data);
        return;
    }
};

export default UpdateRoomOptionsForm;
