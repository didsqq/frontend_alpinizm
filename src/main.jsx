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
import ParticlesBackground from "./components/background/particles-background";

const user = new UserStore();
const store = new MainStore();

const root = createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ user, store }}>
    <BrowserRouter>
      <div className="relative min-h-screen">
        <div className="fixed top-0 left-0 w-full h-full -z-10">
          <ParticlesBackground />
        </div>
      <NavBar />
      <AppRouter />
      <Footer />
      </div>
    </BrowserRouter>
  </Context.Provider>
);

