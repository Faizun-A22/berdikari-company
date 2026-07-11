import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import NewsDetailApp from '../apps/NewsDetailApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsDetailApp />
  </StrictMode>
);
