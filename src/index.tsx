/*
 * @Author: zhaosigui
 * @Date: 2024-01-19 14:28:33
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-04 13:33:45
 * @FilePath: \antd\zntd\src\index.tsx
 * @Description: 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
