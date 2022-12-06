import React from "react";
import { Box } from "@mui/system";
import MessagesList from "../../components/ChatBox/MessagesList";
import request from "../../util/Request";

const UserLogs = ({ room, user }) => {
    const [messages, setMessages] = React.useState([]);
    const [next, setNext] = React.useState(null);
    const [procrssing, setProcessing] = React.useState(false);

    React.useEffect(() => {
        const controller = new AbortController();

        room &&
            user &&
            loadMessages(
                `api/rooms/${room?.id}/logs/${user?.username}`,
                setMessages,
                setNext,
                setProcessing,
                false,
                controller
            );

        return () => {
            controller.abort();
        }
    }, [user, room]);

    const loadNext = () => {
        if (procrssing || !next) return;
        loadMessages(next, setMessages, setNext, setProcessing, true);
    };

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 600,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <MessagesList
                messages={messages}
                room={room}
                loadMessages={loadNext}
                next={next}
            />
        </Box>
    );
};

const loadMessages = async (
    url,
    setMessages,
    setNext,
    setProcessing,
    append,
    controller
) => {
    setProcessing(true);

    const res = await request(url, undefined, null, controller);

    if (res.ok) {
        const js = await res.json();
        append
            ? setMessages((ms) => [...ms, ...js.data])
            : setMessages(js.data);
        setNext(js.links.next);
        setProcessing(false);
    }
};
export default UserLogs;
