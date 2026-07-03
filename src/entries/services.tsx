import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import ServicesApp from '../apps/ServicesApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServicesApp />
  </StrictMode>
);
