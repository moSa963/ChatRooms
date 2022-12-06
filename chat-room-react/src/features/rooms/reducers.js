

export const setRoomsReducer = (state, action) => {
    state.value = action.payload;
}

export const addRoomReducer = (state, action) => {
    const room = action.payload;

    if (!room) return;

    const index = state.value.findIndex((v) => v.id === room.id);

    if (index < 0) {
        state.value.push(room)
    } else {
        state.value[index] = { ...state.value[index], ...room };
    }

    state.loading = false;
}

export const removeRoomReducer = (state, action) => {
    const room = action.payload;
    if (!room) return;
    state.value = state.value.filter((v) => v.id !== room.id);
}

export const setSelectedRoomReducer = (state, action) => {
    const room = state.value.find((v) => v.id === action.payload?.id);

    if (room) {
        room["unwatched"] = false;
    }

    if (state.selectedRoom.value && action.payload) {
        state.selectedRoom.value = {...state.selectedRoom.value, ...action.payload};
        return;
    }

    state.selectedRoom.value = action.payload;
}


export const addRoomMessageReducer  = (state, action) => {
    const new_room = {
        id: action.payload?.room_id,
        last_message: action.payload?.title,
        updated_at: new Date(Date.now()).toUTCString(),
        unwatched: state?.selectedRoom?.value?.id !== action.payload?.room_id,
    };

    const index = state.value.findIndex((v) => v.id === new_room.id);

    if (index < 0) {
        state.value.push(new_room)
    } else {
        state.value[index] = { ...state.value[index], ...new_room };
    }
}


export const updateSelectedRoomReducer = (state, action) => {

    if (!state.selectedRoom.value || action.payload?.id !== state.selectedRoom.value?.id){
        return;
    }

    state.selectedRoom.value = {...state.selectedRoom.value, ...action.payload};
}