import request, { requestWithProgress } from "../../util/Request"



export const fetchMessages = async (room_id, next) => {
    const res = await request(next || "api/rooms/" + room_id + "/messages");

    if (res.ok) {
        const js = await res.json();
        return js;
    }
}


export const sendMessage = async (message, addMessage, updateMessage) => {
    const form = new FormData();

    message?.title && form.append("title", message.title);
    message?.src && form.append("file", message.src);
    message?.src && form.append("name", message.src.name);

    message?.src && (message.src = URL.createObjectURL(message?.src))

    message["progress"] = 1;

    addMessage(message);

    return await (new Promise((rs, rg) => {
        requestWithProgress(`api/rooms/${message.room_id}/messages`, form,
            (e) => {
                const progress = (e.loaded / e.total) * 100;
                updateMessage({ message: message, update: { progress: progress } });
            },
            (data) => {
                if (data) {
                    updateMessage({ message: message, update: { id: data.data.id, progress: null } });
                } else {
                    updateMessage({ message: message, update: { error: true, progress: null } });
                }
                rs(true);
            },
            (error) => {
                updateMessage({ message: message, update: { error: true, progress: null } });
                rs(true);
            }
        );
    }));
}