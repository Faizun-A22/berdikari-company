import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import PortfolioDetailApp from '../apps/PortfolioDetailApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioDetailApp />
  </StrictMode>
);
