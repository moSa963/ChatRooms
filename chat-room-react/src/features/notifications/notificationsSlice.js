import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    unread_count: 0,
}

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        addNotification: (state, action) => {
            state.value.push({
                type: action.payload.type,
                data: action.payload.data,
            });

            state.unread_count += 1;
        },
        setAsRead: (state) => {
            state.unread_count += 0;
        }
    }
});

export const selectNotifications = state => state.notifications.value;
export const selectNotificationsUnreadCount = state => state.notifications.unread_count;

export const { addNotification, setAsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;