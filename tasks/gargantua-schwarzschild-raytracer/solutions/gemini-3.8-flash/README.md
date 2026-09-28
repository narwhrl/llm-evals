# GARGANTUA — Schwarzschild Black Hole Raytracer

Interactive, physically grounded Schwarzschild black hole null geodesic raytracer built with React 18, Vite, ES Modules, and locally vendored Three.js.

## Overview
- **Spacetime Metric**: Schwarzschild metric in natural units ($c = 1, G = 1, M = 0.5 \implies r_s = 2M = 1.0$).
- **Numerical Integration**: Exact 3D vector ODE Runge-Kutta 4th-order (RK4) integrator with adaptive step size.
- **Relativistic Optics**: Multi-crossing accretion disk intersections (path-sequential primary disk and curved secondary/higher-order Einstein arcs), Keplerian velocity field, Doppler boosting ($g^4$ relativistic beaming), gravitational redshift ($\sqrt{1 - r_s/r}$), Planck blackbody radiation curve, and Keplerian differential shear turbulence.
- **Procedural Sky**: Fully procedural celestial background (Milky Way core, galactic disc, interstellar dust absorption lanes, cellular starfield) without external textures or cubemaps.
- **Post-Processing**: Separable Gaussian blur HDR Bloom pyramid, ACES Filmic tonemapping, subtle chromatic aberration, vignette, and film grain.
- **Interstellar HUD**: Collapsible glassmorphism HUD featuring 21 reactive parameters, 4 camera presets, 10 diagnostic debug views, 3 quality profiles, versioned `localStorage` persistence, and procedural ambient audio synthesizer.
- **Context Loss Resilience**: Native handling and zero-reload restoration for WebGL context loss (`webglcontextlost` and `webglcontextrestored`).
- **Automation Contract**: Full compliance with the URL capture specification (`?capture=1...`), `document.documentElement.dataset.gargantuaReady = "true"`, and `window.__GARGANTUA__` API.

---

## Commands

### 1. Installation
Install project dependencies using locked versions:
```bash
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build
Compile and bundle the production assets into `dist/`:
```bash
npm run build
```

### 4. Static Preview Server
Serve the production build locally:
```bash
npm run preview
```
Open `http://localhost:4173/` in your browser.

### 5. Automated Verification Suite
Run the automated headless Chrome/Edge test suite:
```bash
node run_verification.cjs
```

---

## Keyboard Shortcuts
- `0` – `9`: Switch Diagnostic Debug Views (0: Final Composite, 1: Step Cost Heatmap, 2: Event Horizon Mask, 3: Disk Crossing Count, 4: Doppler & Redshift, 5: Deflection Map, 6: Isolated Sky, 7: Linear HDR Radiance, 8: Disk Temp & Turbulence, 9: Disk Velocity Field)
- `Shift + 1` – `Shift + 4`: Switch Camera Presets
- `Space`: Toggle Cinematic Camera Orbit (yields automatically on user drag/wheel)
- `H`: Toggle HUD visibility
- `Q`: Cycle Quality tier (`Standard` / `High` / `Cinematic`)
- `R`: Reset all 21 parameters and presets to defaults
- `M`: Toggle procedural ambient drone synthesizer
- `Mouse Drag / Touch`: OrbitControls camera rotation
- `Mouse Wheel / Pinch`: Dolly / Zoom camera distance

---

## URL Automation Parameters
```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```
- `capture=1`: Freezes simulation time at `time`, stops camera orbit, mutes sound, hides HUD if `hud=0`.
- `quality`: `'standard'`, `'high'`, or `'cinematic'`.
- `preset`: `0`, `1`, `2`, or `3`.
- `debug`: `0` through `9`.
- `time`: Finite non-negative float seconds.
- `hud`: `0` (hidden) or `1` (visible).

When ready, the page sets `document.documentElement.dataset.gargantuaReady = "true"` and provides `window.__GARGANTUA__`.
