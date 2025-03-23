import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/approuter/AppRouter";
import NavBar from "./components/NavBar";
import MainStore from "./store/MainStore";
import UserStore from "./store/UserStore";
export const Context = createContext(null);

createRoot(document.getElementById("root")).render(
  <Context.Provider
    value={{
      user: new UserStore(),
      store: new MainStore(),
    }}
  >
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  </Context.Provider>
);
