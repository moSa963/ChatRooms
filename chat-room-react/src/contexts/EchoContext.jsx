import Echo from "laravel-echo";
import React, { useContext } from "react";
import { createContext } from "react";
import Pusher from "pusher-js";
import { APP_URL, TOKEN } from "../util/Request";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, addRoomMessage, selectRooms, updateSelectedRoom } from "../features/rooms/roomsSlice";
import { addMessage, updateMessage } from "../features/messages/messagesSlice";
import { selectAuth } from "../features/auth/authSlice";
import { addNotification } from "../features/notifications/notificationsSlice";

const Context = createContext();

window.Pusher = Pusher;

const EchoProvider = ({ children }) => {
    const [echo, setEcho] = React.useState(null);
    const rooms = useSelector(selectRooms);
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    React.useEffect(() => {
        const key = document.querySelector("meta[name=pusher]").content;

        if (!key || key === "") return;

        const options = {
            broadcaster: "pusher",
            key: key,
            cluster: "eu",
            authEndpoint: APP_URL + "broadcasting/auth",
            forceTLS: true,
        };

        TOKEN && (options["auth"] = { headers: { Authorization: TOKEN } });

        var res = null;

        try{
            res = new Echo(options);
        } catch {}

        setEcho(res);

        return () => res && res.disconnect();
    }, []);

    React.useEffect(() => {
        if (!echo || !auth?.id) return;

        subscribe(rooms, echo, auth?.id, dispatch);
    }, [echo, rooms, dispatch, auth?.id]);

    React.useEffect(() => {
        if (!echo || !auth?.id) return;

        echo.private(`App.Models.User.${auth.id}`).notification((e) => {
            dispatch(addNotification({ type: e.type, data: e.data }));
        });

        return () => {
            echo && echo.leave(`App.Models.User.${auth.id}`);
        };
    }, [echo, dispatch, auth?.id]);

    return <Context.Provider value={echo}>{children}</Context.Provider>;
};


export const subscribe = (rooms, echo, auth_id, dispatch) => {
    for (var i = 0; i < rooms.length; ++i) {
        const room = rooms[i];

        if (room["channel"]) continue;

        const channel = echo.private(`rooms.${rooms[i]?.id}`);

        channel.listen(".new-message", ({ data }) => {
            if (data.user_id === auth_id) return;

            dispatch(addMessage(data));
            dispatch(addRoomMessage(data));
        });

        channel.listen(".update-room", ({ data }) => {
            dispatch(updateSelectedRoom(data));
        });

        channel.listen(".deleted-message", ({ data }) => {
            dispatch(
                updateMessage({
                    message: data,
                    update: { deleted: true, title: "deleted message" },
                })
            );
        });

        dispatch(addRoom({ id: room.id, channel: true }));
    }
};

export default EchoProvider;

export const useEcho = () => useContext(Context);
