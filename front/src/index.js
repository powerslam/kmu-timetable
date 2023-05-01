import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.css';

import { HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
      <NavBar />
      <App />
  </HashRouter>
);
