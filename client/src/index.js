import { React, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css";
import { StateContext } from './context/StateContext';

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