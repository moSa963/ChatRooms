import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRoom, fetchRooms, loadRoom } from "./roomsApi";
import { addRoomMessageReducer, addRoomReducer, removeRoomReducer, setRoomsReducer, setSelectedRoomReducer, updateSelectedRoomReducer } from "./reducers";

const initialState = {
    value: [],
    selectedRoom: {
        value: null,
        status: {
            error: null,
            errorText: null,
            loading: false,
        }
    },
    loading: false,
};

export const loadRoomsAsync = createAsyncThunk("rooms/fetchRooms", fetchRooms);
export const createRoomAsync = createAsyncThunk("rooms/createRoom", createRoom);

export const loadSelectedRoomAsync = createAsyncThunk("rooms/loadRoom", async (payload) => {
    const res = await loadRoom(payload);
    return res;
});

const roomSlice = createSlice({
    name: "rooms",
    initialState: initialState,
    reducers: {
        setRooms: setRoomsReducer,
        addRoom: addRoomReducer,
        removeRoom: removeRoomReducer,
        setSelectedRoom: setSelectedRoomReducer,
        updateSelectedRoom: updateSelectedRoomReducer,
        addRoomMessage: addRoomMessageReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadRoomsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadRoomsAsync.fulfilled, (state, action) => {
                if (!action.payload) return;
                setRoomsReducer(state, action);
                state.loading = false;
            })
            .addCase(createRoomAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRoomAsync.fulfilled, addRoomReducer)
            .addCase(loadSelectedRoomAsync.pending, (state) => {
                state.selectedRoom.value = null;
                state.selectedRoom.status = { error: null, errorText: null, loading: true, };
            })
            .addCase(loadSelectedRoomAsync.fulfilled, (state, action) => {
                if (!action.payload.ok) {
                    state.selectedRoom.value = null;
                    state.selectedRoom.status = { error: action.payload.error, errorText: action.payload.errorText, loading: false, };
                    return;
                }

                state.selectedRoom.status = { error: null, errorText: null, loading: false, };
                state.selectedRoom.value = action.payload.data;
                const room = state.value.find(v => v.id === action.payload.data?.id);
                room && (room["unwatched"] = false);
                return;
            })
    }
});

export const selectRooms = (state) => state.rooms.value;
export const selectSelectedRoom = (state) => state.rooms.selectedRoom.value;
export const selectSelectedRoomStatus = (state) => state.rooms.selectedRoom.status;
export const selectRoomsLoading = (state) => state.rooms.loading;

export const { addRoom, removeRoom, setRooms, setSelectedRoom, addRoomMessage, updateSelectedRoom } = roomSlice.actions;

export default roomSlice.reducer;