import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// No StrictMode: the WebGL engine is created once and owns the canvas.
createRoot(document.getElementById('root')).render(<App />);
