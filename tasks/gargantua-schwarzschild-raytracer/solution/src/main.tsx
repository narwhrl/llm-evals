import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// bounded console/error collector for acceptance diagnostics
// (surfaced via window.__GARGANTUA_DEBUG__.errors)
const errors: string[] = [];
const record = (msg: string) => {
  if (errors.length < 50 && !errors.includes(msg)) errors.push(msg);
};
window.addEventListener('error', (e) => record(`error: ${e.message}`));
window.addEventListener('unhandledrejection', (e) => record(`rejection: ${String(e.reason)}`));
const origError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  record(`console.error: ${args.map(String).join(' ')}`);
  origError(...args);
};
window.__GARGANTUA_DEBUG__ = { ...window.__GARGANTUA_DEBUG__, errors };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
