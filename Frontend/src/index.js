import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'; // 👈 THÊM DÒNG NÀY
=======
>>>>>>> a10a021fcec50b7386dcd97d13d2859ec46d40e8
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <BrowserRouter>   {/* 👈 BỌC APP */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

=======
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
>>>>>>> a10a021fcec50b7386dcd97d13d2859ec46d40e8
reportWebVitals();
