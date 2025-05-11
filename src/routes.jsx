import Admin from "./pages/Admin/Admin";
import Auth from "./pages/Auth";
import Equipment from "./pages/Equipment/Equipment";
import Home from "./pages/HomePage";
import Profile from "./pages/Profile";
import Climb from "./pages/Climb";

import {
  ADMIN_ROUTE,
  EQUIPMENT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  CLIMB_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: EQUIPMENT_ROUTE,
    Component: Equipment,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: CLIMB_ROUTE + "/:id",
    Component: Climb,
  },
];
