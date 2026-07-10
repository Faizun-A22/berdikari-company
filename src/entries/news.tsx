import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import NewsApp from '../apps/NewsApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsApp />
  </StrictMode>
);
