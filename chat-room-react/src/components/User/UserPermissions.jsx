import React from "react";
import { Paper, FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import request from "../../util/Request";
import Typography from "@mui/material/Typography";

const UserPermissions = ({ user, room, setUser, disabled }) => {
    const [processing, setProcessing] = React.useState(false);

    const handleChange = (id, v) => {
        if (processing) return;
        v
            ? addPermission(id, room, user.username, setUser, setProcessing)
            : removePermission(id, room, user.username, setUser, setProcessing);
    };

    return (
        <Paper sx={{ width: "100%", p: 1, mb: { xs: 5, sm: 5, md: 0 } }}>
            <Typography>Permissions: </Typography>
            <FormGroup sx={{ flexDirection: "row" }}>
                {permissions.map((v) => (
                    <FormControlLabel
                        key={v.id}
                        disabled={disabled || !user || user.isOwner}
                        control={
                            <Checkbox
                                checked={checked(v.id, user)}
                                onChange={(e, value) =>
                                    handleChange(v.id, value)
                                }
                            />
                        }
                        label={v.name}
                    />
                ))}
            </FormGroup>
        </Paper>
    );
};

const permissions = [
    { id: 1, name: "Write" },
    { id: 2, name: "Manage room" },
    { id: 3, name: "Manage members" },
    { id: 4, name: "Manage permissions" },
    { id: 5, name: "Manage messages" },
];

const checked = (id, user) => {
    return Boolean(
        user && (user.isOwner || user.permissions.find((v) => v.id === id))
    );
};

const addPermission = async (id, room, username, setUser, setProcessing) => {
    setProcessing(true);
    const res = await request(
        `api/rooms/${room?.id}/users/${username}/permissions/${id}`,
        "POST"
    );

    if (res.ok) {
        const js = await res.json();
        setUser((u) => ({ ...u, permissions: [...u.permissions, js.data] }));
    }
    setProcessing(false);
};

const removePermission = async (id, room, username, setUser, setProcessing) => {
    setProcessing(true);

    const res = await request(
        `api/rooms/${room?.id}/users/${username}/permissions/${id}`,
        "DELETE"
    );

    if (res.ok) {
        setUser((u) => ({
            ...u,
            permissions: u?.permissions?.filter((v) => v?.id !== id),
        }));
    }
    setProcessing(false);
};

export default UserPermissions;
