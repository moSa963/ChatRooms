import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMessageReducer, updateMessageReducer } from "./messageReducers";
import { fetchMessages, sendMessage } from "./messagesApi";

const initialState = {
    value: {},
    loading: false,
};

export const loadMessagesAsync = createAsyncThunk("messages/loadMessages", async (payload, { getState }) => {
    const state = getState().messages;
    if (!payload || state.value[payload]?.next !== undefined) return;
    const res = await fetchMessages(payload);
    return { resault: res, room_id: payload };
});

export const loadNextMessagesAsync = createAsyncThunk("messages/loadNextMessages", async (payload, { getState }) => {
    const state = getState().messages;
    const next = state.value[payload]?.next;

    if (!payload || !next) return;

    const res = await fetchMessages(payload, next);

    return { resault: res, room_id: payload };
});


export const sendMessageAsync = createAsyncThunk("messages/sendMessage", async (payload, { dispatch }) => {
    return sendMessage(payload, (message) => dispatch(addMessage(message)), (data) => dispatch(updateMessage(data)));
});

const messagesSlice = createSlice({
    name: "messages",
    initialState: initialState,

    reducers: {
        addMessage: addMessageReducer,
        updateMessage: updateMessageReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMessagesAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadMessagesAsync.fulfilled, (state, actions) => {
                state.loading = false;

                if (!actions.payload) return;
                const { room_id, resault } = actions.payload;
                state.value[room_id] = {
                    data: resault.data,
                    next: resault.links.next,
                };

            })
            .addCase(loadNextMessagesAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadNextMessagesAsync.fulfilled, (state, actions) => {
                state.loading = false;
                if (!actions.payload) return;
                const { room_id, resault } = actions.payload;
                state.value[room_id] = {
                    data: [...state.value[room_id].data, ...resault.data],
                    next: resault.links.next,
                };
            });
    }
});

export const selectMessages = room => (state) => {
    if (!room?.id || !state.messages.value[room.id]) return {};

    return { messages: state.messages.value[room?.id], loading: state.messages.loading };
};

export const selectMessagesLoading = (state) => state.messages.loading;

export const { addMessage, updateMessage } = messagesSlice.actions;

export default messagesSlice.reducer;