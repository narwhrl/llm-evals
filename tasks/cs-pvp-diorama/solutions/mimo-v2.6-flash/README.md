# CS PVP Diorama — Candidate Solution

A miniature rain-night diorama of a classic CS-style defusal map, rendered with
Three.js (toon shading + depth-based outline post pass) and presented as a
full-screen, UI-free physical sand table with orbit / drag / zoom controls.

## Run locally

```bash
npm install
npm run dev        # dev server (Vite prints the local URL)
```

## Production build

```bash
npm run build      # outputs dist/
npm run preview    # serves dist/ locally (default port 4173)
```

No credentials, network assets, or external services are required. All geometry
is procedural Three.js primitives and all textures are generated at runtime with
offscreen canvases.

## Initialization path

1. `index.html` loads the ES module bundle; there is no visible UI (canvas only).
2. `src/main.js` creates the renderer, camera (42° FOV), damped `OrbitControls`
   (drag = rotate, wheel = zoom, right-drag = pan; polar angle clamped so the
   camera stays above the base), and builds the whole scene synchronously from
   `src/scene/*`.
3. Dynamic effects (`src/effects/*`) are registered during the build and
   animated in the requestAnimationFrame loop together with light flicker,
   searchlight sway, police strobes, rolling-shutter vibration, and scrolling
   wall wetness.
4. Each frame is rendered through `src/post.js` (color+depth target →
   depth-discontinuity outline composite).

## Controls

- Left-drag: orbit
- Wheel: zoom (clamped 24–140)
- Right-drag: pan
