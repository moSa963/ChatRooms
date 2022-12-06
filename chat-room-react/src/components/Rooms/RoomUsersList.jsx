import React from "react";
import Drawer from "../Drawer/Drawer";
import DrawerHeader from "../Drawer/DrawerHeader";
import DrawerTitle from "../Drawer/DrawerTitle";
import List from "../PaginationList";
import User from "../User/User";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const RoomUsersList = ({ room }) => {
    const [collapse, setCollapse] = React.useState(false);
    const [processing] = React.useState(false);

    return (
        <Drawer processing={processing}>
            <DrawerHeader right collapse={collapse} onChange={setCollapse} />
            <DrawerTitle
                title={"Members"}
                collapse={collapse}
                icon={<PersonOutlineIcon />}
                mt={1}
            />
            {room && (
                <List
                    noSearch
                    url={"api/rooms/" + room?.id + "/users"}
                    generator={([data]) =>
                        data.map((v, i) => (
                            <User
                                key={v.id}
                                room={room}
                                collapse={collapse}
                                user={v}
                            />
                        ))
                    }
                />
            )}
        </Drawer>
    );
};

export default RoomUsersList;
