import React from 'react';
import ReactDOM from 'react-dom/client';
import DemoApp from '../apps/DemoApp';
import '../index.css';

ReactDOM.createRoot(document.getElementById('demo-root') as HTMLElement).render(
  <React.StrictMode>
    <DemoApp />
  </React.StrictMode>,
);
