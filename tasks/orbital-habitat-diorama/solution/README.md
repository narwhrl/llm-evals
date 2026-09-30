# Orbital Home

```sh
npm install
npm run dev -- --port 5173
npm run build
npm run preview -- --port 4183 --strictPort
npm run build -- --base=/orbital-habitat-diorama/gpt-6.1-sol/ --outDir=dist-subpath
```

On Git Bash, prefix the last command with `MSYS_NO_PATHCONV=1` to prevent conversion of the URL base into a Windows path. All assets are local in `public/assets/`.

Drag to rotate the orthographic view within the cutaway's useful viewing range; wheel/pinch to zoom. Click the desk, sleeping bag, plants, seat or exercise bike to focus; click again or on empty space to return. Click the large Earth porthole to toggle 15-second/90-second cycles. Drag in that porthole to scrub time; releasing resumes the orbit. Click the floor strip for night cruise, the grow-light bar for plant lighting, and the floating pen for a spin. The pen also avoids pointer proximity.

`npm run test:e2e` requires this production preview and the connected browser-extension bridge at 127.0.0.1:10086. It uses browser control only and calls no other model. It records actual pointer interactions, required 1440 × 900 captures, mobile DPR 2, two full 90-second cycles, console and local resource checks. `window.__HABITAT__` exposes deterministic time and projected object coordinates for repeatable tests without swapping rendering or geometry.

Earth day imagery is NASA Blue Marble; night lights and cloud maps are distributed with Three.js examples. Provenance and limitations are in RESULTS.md. All other maps are original canvas-generated materials and lettering. The code-generated SVG Earth draft maps are retained as asset-generation evidence but are not used at runtime.
