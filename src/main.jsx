import { createRoot } from 'react-dom/client';
import { LayoutComponent } from './Layout';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LayoutComponent/>
  </BrowserRouter>
); 