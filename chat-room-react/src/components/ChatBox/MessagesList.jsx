import { CircularProgress, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import { selectMessagesLoading } from "../../features/messages/messagesSlice";
import permissions from "../../util/Permissions";
import Message from "../Message/Message";
import MessageSectionDate from "../Message/MessageSectionDate";

const MessagesList = ({ messages, loadMessages, room }) => {
    const auth = useSelector(selectAuth);
    const [clientRect, setClientRect] = React.useState(null);
    const [timeoutId, setTimeoutId] = React.useState(null);
    const loading = useSelector(selectMessagesLoading);

    const handleScroll = ({ currentTarget }) => {
        if (
            currentTarget.scrollHeight + currentTarget.scrollTop <=
            currentTarget.offsetHeight + 1
        ) {
            loadMessages();
        }

        if (timeoutId) return;

        setTimeoutId(
            setTimeout(() => {
                setClientRect(currentTarget.getBoundingClientRect());
                setTimeoutId(null);
            }, 2000)
        );
    };

    return (
        <Box
            aria-label="message list box"
            sx={{
                position: "relative",
                flex: 1,
                alignItems: "center",
                height: "100%",
                display: "flex",
                overflow: "auto",
                overflowX: "hidden",
                p: 1,
                flexDirection: "column-reverse",
                "::-webkit-scrollbar": { display: "none" },
                scrollbarWidth: "none",
            }}
            onScroll={handleScroll}
        >
            {!messages && <LinearProgress color="primary" sx={{ width: 1 }} />}

            {messages && mapMessages(messages, auth, clientRect, room)}

            {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
        </Box>
    );
};

const mapMessages = (messages, auth, scroll, room) => {
    return messages.map((v, i) => {
        const perDate =
            i <= messages.length - 1
                ? new Date(messages[i + 1]?.created_at).toLocaleDateString()
                : "";
        const date = new Date(v?.created_at).toLocaleDateString();

        return (
            <React.Fragment key={v?.id}>
                <Message
                    message={v}
                    right={auth?.id === v?.user_id}
                    scroll={scroll}
                    manageMessage={permissions.manage_messages(room, auth)}
                />
                {perDate !== date && <MessageSectionDate date={date} />}
            </React.Fragment>
        );
    });
};

export default MessagesList;
