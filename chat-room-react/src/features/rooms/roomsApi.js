import request from "../../util/Request";



export const fetchRooms = async () => {
    const res = await request("api/rooms");

    if (res.ok) {
        const js = await res.json();
        return js?.data;
    }
}

export const createRoom = async (payload) => {
    const room = payload.room;

    const res = await request("api/rooms", "POST", room);

    if (res.ok) {
        const js = await res.json();
        payload.action && payload.action(js?.data);
        return js?.data;
    }
}

export const updateRoom = async (payload) => {
    const { room, update } = payload.room;

    const res = await request("api/rooms/" + room?.id, "POST", update);

    if (res.ok) {
        const js = await res.json();
        return js?.data;
    }
}


export const loadRoom = async (id) => {
    const res = await request("api/rooms/" + id);
    
    if (res.ok) {
        const js = await res.json();
        return { data: js.data, ok: true, error: res.status, errorText: res.statusText };
    }

    return { data: null, ok: false, error: res.status, errorText: res.statusText };

}