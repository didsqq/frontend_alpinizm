import Admin from "./pages/Admin/Admin";
import Equipment from "./pages/Equipment/Equipment";
import Profile from "./pages/Profile/Profile";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/HomePage";

import {
    ADMIN_ROUTE, 
    EQUIPMENT_ROUTE, 
    PROFILE_ROUTE, 
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    HOME_ROUTE
} from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: EQUIPMENT_ROUTE,
        Component: Equipment
    },
    {
        path:     PROFILE_ROUTE,
        Component: Profile
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path:     HOME_ROUTE,
        Component: Home
    },
]