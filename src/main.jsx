import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/approuter/AppRouter";
import NavBar from "./components/NavBar";
import UserStore from "./store/UserStore";
import MainStore from "./store/MainStore";
import { Context } from "./context";
import Footer from "./components/Footer";
const user = new UserStore();
const store = new MainStore();

const root = createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ user, store }}>
    <BrowserRouter>
      <NavBar />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  </Context.Provider>
);

