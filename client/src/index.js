import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CarsContextProvider } from './context/carContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CarsContextProvider>
          <App />
      </CarsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
