import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectRooms } from "../../features/rooms/roomsSlice";

const ChatInputButton = ({ onSend, disabled, room, setDisabled }) => {
    const [counter, setCounter] = React.useState(0);
    const text = React.useMemo(
        () => (counter <= 0 ? "Send" : counter),
        [counter]
    );
    const rooms = useSelector(selectRooms);
    const r = React.useMemo(
        () => rooms.find((v) => v.id === room.id),
        [rooms, room]
    );

    React.useEffect(() => {
        setDisabled(counter > 0);
    }, [counter, setDisabled]);

    React.useEffect(() => {
        setCounter(0);

        if (!r?.user_last_update || !room.slow_mode || r?.isOwner) return;

        var id = null;

        const time_passed = Math.ceil(
            (Date.now() - Date.parse(r.user_last_update + " UTC")) / 1000
        );

        if (room.slow_mode - time_passed > -1) {
            setCounter(room.slow_mode + 2 - time_passed);

            id = setInterval(() => {
                setCounter((c) => {
                    if (c <= 0) {
                        id && clearInterval(id);
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);
        }

        return () => id && clearInterval(id);
    }, [r, room.slow_mode]);

    return (
        <Button
            onClick={() => onSend && onSend()}
            variant="contained"
            disabled={disabled}
        >
            {text}
        </Button>
    );
};

export default ChatInputButton;
