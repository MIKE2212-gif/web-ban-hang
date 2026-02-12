import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 THÊM DÒNG NÀY
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>   {/* 👈 BỌC APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
