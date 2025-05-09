import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../context";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

import { Github } from "lucide-react"

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-[#E0E1DD] backdrop-blur supports-[backdrop-filter]:bg-[#E0E1DD]/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <a href="/" className="mr-6 flex items-center space-x-2 no-underline">
          <span className="font-bold text-[#0D1B2A]">Alter Ego</span>
        </a>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <a href="/solutions" className="transition-colors hover:text-primary no-underline text-[#0D1B2A]">
            Solutions
          </a>
          <a href="/industries" className="transition-colors hover:text-primary no-underline text-[#0D1B2A]">
            Industries
          </a>
          <a href="/about" className="transition-colors hover:text-primary no-underline text-[#0D1B2A]">
            About Us
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(LOGIN_ROUTE)}
            className="text-[#0D1B2A] border-none inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
            Sign in
          </button>
          <button 
            onClick={() => navigate(REGISTRATION_ROUTE)}
            className="text-[#FFFFFF] border-none inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#778DA9] hover:bg-[#778DA9]/90 h-9 px-4 py-2">
            Sign up
          </button>
        </div>
      </div>
    </header>
    // <Navbar bg="dark" variant="dark">
    //   <Container>
    //     <NavLink style={{ color: "white" }} to={HOME_ROUTE}>
    //       Alter Ego
    //     </NavLink>
    //     {user.isAuth ? (
    //       <Nav className="ml-auto" style={{ color: "white" }}>
    //         <Button
    //           variant={"outline-light"}
    //           onClick={() => navigate(ADMIN_ROUTE)}
    //           className="border-none focus:outline-none"
    //         >
    //           Админ панель
    //         </Button>
    //         <Button
    //           variant={"outline-light"}
    //           onClick={() => logOut()}
    //           className="ml-2 border-none focus-outline-none"
    //         >
    //           Выйти
    //         </Button>
    //       </Nav>
    //     ) : (
    //       <Nav className="ml-auto" style={{ color: "white" }}>
    //         <Button
    //           variant={"outline-light"}
    //           onClick={() => navigate(LOGIN_ROUTE)}
    //           className="border-none focus:outline-none"
    //         >
    //           Авторизация
    //         </Button>
    //       </Nav>
    //     )}
    //   </Container>
    // </Navbar>
  );
});

export default NavBar;