import React from "react";
import {
    Avatar,
    Button,
    ButtonGroup,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import request from "../util/Request";
import { Box } from "@mui/system";

const UpdateImage = ({ src, caption, link, enableDelete }) => {
    const [processing, setProcessing] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [file, setFile] = React.useState(null);

    const handleChange = (f) => {
        if (processing) return;
        f && setFile(URL.createObjectURL(f));
        uploadImage(f, setProcessing, link, setError);
    };

    const handleDelete = () => {
        if (processing) return;
        setFile(null);
        remove(link, setProcessing, setError);
    };

    return (
        <Paper
            sx={{
                width: "100%",
                display: "flex",
                p: 1,
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Avatar
                sx={{ width: 90, height: 90, mr: 5 }}
                src={file || src}
            ></Avatar>
            <Stack spacing={2}>
                <Box>
                    <ButtonGroup size="small">
                        <Button
                            disabled={processing}
                            onClick={(e) => e.currentTarget.children[0].click()}
                            color={error ? "error" : "primary"}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) =>
                                    handleChange(e.currentTarget.files[0])
                                }
                            ></input>
                            UPDATE
                        </Button>
                        {enableDelete && (
                            <Button
                                disabled={processing || !src}
                                color="error"
                                onClick={handleDelete}
                            >
                                DELETE
                            </Button>
                        )}
                    </ButtonGroup>
                </Box>
                <Typography variant="caption">{caption}</Typography>
            </Stack>
        </Paper>
    );
};

const uploadImage = async (file, setProcessing, link, setError) => {
    setProcessing(true);

    const res = await request(link, "POST", { image: file });

    !res.ok && setError(true);

    setProcessing(false);
};

const remove = async (link, setProcessing) => {
    setProcessing(true);

    await request(link, "DELETE");

    setProcessing(false);
};

export default UpdateImage;
