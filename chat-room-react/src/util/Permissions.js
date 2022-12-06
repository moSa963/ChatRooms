const permissions = {
    manage_room: (room, auth) => {
        return room && auth && (room?.owner?.id === auth?.id || Boolean(room?.permissions?.find((p) => p?.name === "Manage room")));
    },
    manage_members: (room, auth) => {
        return room && auth && (room?.owner?.id === auth?.id || Boolean(room?.permissions?.find((p) => p?.name === "Manage members")));
    },
    manage_permissions: (room, auth) => {
        return room && auth && (room?.owner?.id === auth?.id || Boolean(room?.permissions?.find((p) => p?.name === "Manage permissions")));
    },
    manage_messages: (room, auth) => {
        return room && auth && (room?.owner?.id === auth?.id || Boolean(room?.permissions?.find((p) => p?.name === "Manage messages")));
    },
    write: (room, auth) => {
        return room && auth && (room?.owner?.id === auth?.id || Boolean(room?.permissions?.find((p) => p?.name === "Write")));
    },
    read: (room, auth) => {
        return room && auth && (room?.owner?.id === auth?.id || room?.user_status === "joined");
    },
    owner: (room, auth) => {
        return auth && room?.owner?.id === auth?.id;
    },
}


export default permissions;