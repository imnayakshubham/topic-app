import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import defaultTheme from "./default.json"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider theme={defaultTheme}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>
);
