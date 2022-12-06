import React from "react";
import { Routes, Route } from "react-router-dom";
import ConversationScreen from "./screens/RoomScreens/ConversationScreen";
import RoomsScreen from "./screens/RoomScreens/RoomsScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import CreateRoomScreen from "./screens/RoomScreens/CreateRoomScreen";
import ProfileScreen from "./screens/SettingsScreen/ProfileScreen";
import SettingsScreenNav from "./screens/SettingsScreen/SettingsScreenNav";
import ThemeScreen from "./screens/SettingsScreen/ThemeScreen";
import UserScreen from "./screens/UsersScreens/UserScreen";
import RoomBaseScreen from "./screens/RoomScreens/RoomBaseScreen";
import RoomSettingsScreen from "./screens/RoomSettingsScreens/RoomSettingsScreen";
import ShowRoomScreen from "./screens/RoomScreens/ShowRoomScreen";
import RoomRequestsSreen from "./screens/RoomSettingsScreens/RoomRequestsSreen";
import RoomSettingsNav from "./screens/RoomSettingsScreens/RoomSettingsNav";
import RoomUsersScreen from "./screens/RoomSettingsScreens/RoomUsersScreen";
import RoomBansScreen from "./screens/RoomSettingsScreens/RoomBansScreen";
import UserInvitationsScreen from "./screens/SettingsScreen/UserInvitationsScreen";
import ShowRoomsUserScreen from "./screens/RoomScreens/ShowRoomsUserScreen";
import ErrorScreen from "./screens/ErrorScreen";
import UserBaseScreen from "./screens/UsersScreens/UserBaseScreen";
import RoomThemeScreen from "./screens/RoomSettingsScreens/RoomThemeScreen";

const App = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<DashboardScreen />}>
                <Route index element={<HomeScreen />} />
                <Route path="rooms">
                    <Route index element={<RoomsScreen />} />
                    <Route path="new" element={<CreateRoomScreen />} />
                    <Route path=":id" element={<RoomBaseScreen />}>
                        <Route index element={<ShowRoomScreen />} />
                        <Route path="settings" element={<RoomSettingsNav />}>
                            <Route index element={<RoomSettingsScreen />} />
                            <Route
                                path="requests"
                                element={<RoomRequestsSreen />}
                            />
                            <Route path="users" element={<RoomUsersScreen />} />
                            <Route path="bans" element={<RoomBansScreen />} />
                            <Route path="theme" element={<RoomThemeScreen />} />
                        </Route>
                        <Route
                            path="users/:username"
                            element={<ShowRoomsUserScreen />}
                        />
                        <Route path="chat" element={<ConversationScreen />} />
                    </Route>
                </Route>
                <Route path="settings" element={<SettingsScreenNav />}>
                    <Route index element={<ProfileScreen />} />
                    <Route path="theme" element={<ThemeScreen />} />
                    <Route
                        path="invitations"
                        element={<UserInvitationsScreen />}
                    />
                </Route>
                <Route path="users">
                    <Route path=":username" element={<UserBaseScreen />} >
                        <Route index element={<UserScreen />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<ErrorScreen status={404} errorText="Sorry. this page does not exist" to={"/dashboard"} toText="HOMR PAGE" />} />
        </Routes>
    );
};

export default App;
