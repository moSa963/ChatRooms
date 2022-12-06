import { configureStore } from "@reduxjs/toolkit";
import messagesReducers from "../features/messages/messagesSlice";
import roomReducers from "../features/rooms/roomsSlice";
import authReducers from "../features/auth/authSlice";
import notificationsReducers from "../features/notifications/notificationsSlice";

export const store = configureStore({
    reducer: {
        "messages": messagesReducers,
        "rooms": roomReducers,
        "auth": authReducers,
        "notifications": notificationsReducers,
    },
});