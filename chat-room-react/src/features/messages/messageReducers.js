


export const addMessageReducer = (state, action) => {
    const message = action.payload;

    if (!message) return;

    if (!state.value[message?.room_id]) {
        state.value[message?.room_id] = {
            data: [],
        };
    }

    state.value[message?.room_id].data = [message, ...state.value[message?.room_id].data];
}


export const updateMessageReducer = (state, action) => {
    const { message, update } = action.payload;

    if (!message || !update || !state.value[message?.room_id]) return;

    const index = state.value[message?.room_id].data.findIndex((v, i) => v?.id === message?.id);

    if (index < 0) return;

    state.value[message?.room_id].data[index] = { ...state.value[message?.room_id].data[index], ...update };
}