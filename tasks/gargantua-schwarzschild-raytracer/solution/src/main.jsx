import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// No StrictMode: double-mounting would create and tear down a second WebGL context.
createRoot(document.getElementById('root')).render(<App />);
