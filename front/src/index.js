import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.css';

import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NavBar />
      <App />
  </BrowserRouter>
);
