import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { APP_URL } from "../../util/Request";
import Button from "@mui/material/Button";
import AvatarLink from "../AvatarLink";

const UserBanner = ({ user, owner, column }) => {
    return (
        <Paper
            sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: column ? "column" : { xs: "column", sm: "row" },
                alignItems: column ? "center" : { xs: "center", sm: "start" },
                textAlign: column ? "center" : { xs: "center", sm: "start" },
            }}
        >
            <AvatarLink
                width={80}
                height={80}
                to={`/dashboard/users/${user?.username}`}
                src={`${APP_URL}api/users/${user?.username}/image`}
            />
            <Stack sx={{ width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: column
                            ? "column"
                            : { xs: "column", sm: "row" },
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            wordBreak: "break-word",
                            flex: 1,
                            fontSize: { xs: 15, sm: 35 },
                        }}
                    >
                        {user?.name}
                    </Typography>
                    {owner && <Button variant="text">owner</Button>}
                </Box>
                <Divider />
                <Typography sx={{ mt: 2, wordBreak: "break-word" }}>
                    @{user?.username}
                </Typography>
            </Stack>
        </Paper>
    );
};

export default UserBanner;
