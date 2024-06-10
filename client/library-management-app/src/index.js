import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js'; // Ajoutez .js ici

const root=ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
