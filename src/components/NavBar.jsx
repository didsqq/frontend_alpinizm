import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, RESERVATION_ROUTE, ABOUT_ROUTE } from "../utils/consts";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur bg-[#0D1B2A]/70">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <NavLink to={HOME_ROUTE} className="mr-6 flex items-center space-x-2 no-underline">
          <span className="font-bold text-[#E0E1DD]">Alter Ego</span>
        </NavLink>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
        {user.isAuth ? (
          <>
          <NavLink to={RESERVATION_ROUTE} className={({isActive}) => 
            `transition-colors hover:text-primary no-underline text-[#E0E1DD] ${isActive ? 'text-white' : ''}`
          }>
            Reservation
          </NavLink>
          <NavLink to={ABOUT_ROUTE} className={({isActive}) => 
            `transition-colors hover:text-primary no-underline text-[#E0E1DD] ${isActive ? 'text-white' : ''}`
          }>
            About Us
          </NavLink>
          </>
        ) : (
          <>
          <NavLink to="/about" className={({isActive}) => 
            `transition-colors hover:text-primary no-underline text-[#E0E1DD] ${isActive ? 'text-white' : ''}`
          }>
            About Us
          </NavLink>
          </>
        )}
        </nav>
        <div className="flex items-center space-x-4">
        {!user.isAuth ? (
          <>
            <button 
              onClick={() => navigate(LOGIN_ROUTE)}
              className="border-none text-[#0D1B2A] bg-[#E0E1DD] rounded-md font-medium px-4 py-2 h-9 hover:bg-[#E0E1DD]/80 flex items-center justify-center">
              Sign in
            </button>
            <button 
              onClick={() => navigate(REGISTRATION_ROUTE)}
              className="border-none text-white bg-[#778DA9] rounded-md font-medium px-4 py-2 h-9 hover:bg-[#778DA9]/80 flex items-center justify-center">
              Sign up
            </button>
          </>
        ) : (
          <button 
            onClick={() => logOut()}
            className="border-none text-white bg-[#778DA9] rounded-md font-medium px-4 py-2 h-9 hover:bg-[#778DA9]/90 flex items-center justify-center">
            Sign out
          </button>
        )}
        </div>
      </div>
    </header>
  );
});

export default NavBar;