# GARGANTUA — Schwarzschild Black Hole Raytracer

```sh
npm install
npm run dev -- --port 5173
npm run build
npm run preview -- --port 4172 --strictPort
```

The preview runs the built static `dist/` project. A gallery build accepts `npm run build -- --base=/gargantua-schwarzschild-raytracer/gpt-6.1-sol/ --outDir=dist-subpath`. All library code, assets and shader sources are local. No server API, account or runtime network resource is required.

The fullscreen shader integrates the null-geodesic Binet equation with Schwarzschild radius 1: `u'' = -u + 1.5 u²`, state `u = 1/r`, `du/dphi`, `phi`. A static observer's initial impact parameter is `b = r sin(alpha) / sqrt(1 - 1/r)`. RK4 stepping follows the ray's orbital plane, detects the horizon at `r <= 1.002`, and terminates after outward escape. Segment/plane intersections accumulate disk emission front to back; multiple crossings produce secondary images. The disk models orbit Doppler shift, gravitational redshift, radial temperature and animated turbulence. The procedural sky is sampled along the integrated escaping tangent. A half-float target stores HDR radiance, followed by bloom sampling and explicit ACES tone mapping.

The controls expose 21 parameters, 4 camera presets and ten diagnostic views. `0–9`: diagnostics, `Shift+1–4`: presets, `Space`: camera loop, `H`: HUD, `R`: reset, `Q`: quality. Drag cancels the movie camera and restores manual control. Settings are saved as schema version 1 in `gargantua.v1` localStorage. No audio is implemented.

Capture example: `http://127.0.0.1:4172/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`. Wait for `document.documentElement.dataset.gargantuaReady === 'true'`. `window.__GARGANTUA__` provides the task's validated state methods.

`npm run test:e2e` uses the connected local browser-extension bridge at port 10086 and the production preview at 4172. It controls the browser only, with no calls to Kimi or another model. It checks actual rendering, parameter count, 40 preset/debug states, quality budgets, persistence/reset, keyboard shortcuts, manual camera takeover, loss/restoration of WebGL, invalid URL recovery, mobile DPR 2 and local-only runtime requests. Captures and recorded evidence are under `evidence/`.
