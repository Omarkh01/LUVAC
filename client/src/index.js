import { React, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./index.css"; 

import { StateContext } from './context/StateContext';
import App from './App';

const app = (
  <StrictMode>
    <BrowserRouter>
      <StateContext>
          <App />
      </StateContext>
    </BrowserRouter>
  </StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(app); 