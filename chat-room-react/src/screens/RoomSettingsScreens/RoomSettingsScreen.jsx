import React from "react";
import { useOutletContext } from "react-router-dom";
import DeleteRoomButton from "../../components/Rooms/DeleteRoomButton";
import UpdateRoomInfoForm from "../../components/Forms/UpdateRoomInfoForm";
import UpdateRoomOptionsForm from "../../components/Forms/UpdateRoomOptionsForm";
import UpdateImage from "../../components/UpdateImage";
import { APP_URL } from "../../util/Request";

const RoomSettingsScreen = () => {
    const [room, setRoom] = useOutletContext();

    return (
        <React.Fragment>
            <UpdateImage
                src={`${APP_URL}api/rooms/${room?.id}/image`}
                link={`api/rooms/${room?.id}/image`}
                caption="Must be JPEG, PNG, or GIF and cannot exceed 10MB"
            />

            <UpdateRoomInfoForm room={room} setRoom={setRoom} />

            <UpdateRoomOptionsForm room={room} setRoom={setRoom} />

            <DeleteRoomButton room={room} />
        </React.Fragment>
    );
};

export default RoomSettingsScreen;
