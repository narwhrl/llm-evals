import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

// Deliberately not wrapped in StrictMode: its development-only double-invoked effects would create
// two WebGLRenderer instances on the same canvas (getContext returns the existing context), and the
// two engines would then fight over one GL context.
const container = document.getElementById('root')
createRoot(container).render(<App />)
