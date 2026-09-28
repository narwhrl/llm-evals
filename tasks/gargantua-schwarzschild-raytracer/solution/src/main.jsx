import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// No StrictMode: its development double-mount would create and tear down
// a second WebGL renderer on the same canvas.
createRoot(document.getElementById('root')).render(<App />);
