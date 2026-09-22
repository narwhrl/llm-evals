import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './styles.css'
import { loadPersisted } from './state/store.js'
import { applyUrlContract } from './state/url.js'
import { installBridge } from './state/bridge.js'

// 1. Expose the automation surface first, still reporting ready === false.
installBridge()

// 2. Restore versioned state from localStorage (clamped onto the defaults).
loadPersisted()

// 3. Apply the URL capture contract exactly once, before any GL resource exists.
applyUrlContract(window.location.search)

// 4. Create the canvas the renderer will own. It lives directly under <body> so
//    React never manages (and therefore never removes) it while rendering the HUD.
const canvas = document.createElement('canvas')
canvas.id = 'gargantua-canvas'
canvas.setAttribute('aria-label', 'Schwarzschild black hole raytracer viewport')
document.body.appendChild(canvas)

createRoot(document.getElementById('root')).render(<App canvas={canvas} />)
