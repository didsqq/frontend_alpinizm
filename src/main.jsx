import {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import AppRouter from './components/approuter/AppRouter';
import UserStore from "./store/UserStore"

export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  </Context.Provider>
); 