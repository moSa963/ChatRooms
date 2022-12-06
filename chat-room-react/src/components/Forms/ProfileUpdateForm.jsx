import { Icon, InputAdornment, TextField } from "@mui/material";
import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import request from "../../util/Request";
import FormGrid from "../Forms/FormGrid";
import FormItem from "../Forms/FormItem";
import { selectAuth, updateAuth } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfileUpdateForm = () => {
    const auth = useSelector(selectAuth);
    const [input, setInput] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [processing, setProcessing] = React.useState(false);
    const dispatch = useDispatch();

    const handleChange = (k, v) => {
        input[k] = v;
        setInput({ ...input });
    };

    const handleSave = () => {
        update(input, setErrors, dispatch, setProcessing, setInput);
    };

    return (
        <FormGrid
            onSave={handleSave}
            title="Profile Settings"
            processing={processing}
        >
            <FormItem label="Name">
                <TextField
                    size="small"
                    fullWidth
                    value={input?.name || auth?.name || ""}
                    onChange={(e) =>
                        handleChange("name", e.currentTarget.value)
                    }
                    error={Boolean(errors?.name)}
                    helperText={errors?.name?.at(0)}
                />
            </FormItem>
            <FormItem label="Username">
                <TextField
                    size="small"
                    fullWidth
                    value={input?.username || auth?.username || ""}
                    onChange={(e) =>
                        handleChange("username", e.currentTarget.value)
                    }
                    error={Boolean(errors?.username)}
                    helperText={errors?.username?.at(0)}
                />
            </FormItem>
            <FormItem label="Email">
                <TextField
                    size="small"
                    fullWidth
                    value={input?.email || auth?.email || ""}
                    onChange={(e) =>
                        handleChange("email", e.currentTarget.value)
                    }
                    error={Boolean(errors?.email)}
                    helperText={errors?.email?.at(0)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IsVerified
                                    verified={auth?.email_verified_at}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
            </FormItem>
        </FormGrid>
    );
};

const IsVerified = ({ verified }) => {
    return verified ? (
        <Icon title="this email is verified" color="info">
            <CheckBoxIcon />
        </Icon>
    ) : (
        <Icon title="this email is not verified" color="error">
            <CancelPresentationIcon />
        </Icon>
    );
};

const update = async (data, setErrors, dispatch, setProcessing, setInput) => {
    setProcessing(true);

    const res = await request("api/user/update", "POST", data);

    setProcessing(false);

    setErrors(null);

    const js = await res.json();

    if (res.ok) {
        setInput({});
        dispatch(updateAuth(js.data));
        return;
    }

    setErrors(js.errors);
};

export default ProfileUpdateForm;
