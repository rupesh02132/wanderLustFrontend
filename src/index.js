import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import App from './App';
import {store }from './state/store';
import { persistor } from './state/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";

// Create MUI theme (can customize later)
const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
