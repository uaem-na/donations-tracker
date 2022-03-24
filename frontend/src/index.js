import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index-compiled.css';
import App from './App';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './components/profile/profile';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);