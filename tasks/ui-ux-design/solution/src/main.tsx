import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/noto-serif-sc/400.css';
import '@fontsource/noto-serif-sc/700.css';
import './styles/global.css';
import './styles/app.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
