# Freight Yard / 1:64

A local Three.js/Vite miniature of a deserted defusal-map freight yard. Drag to orbit, wheel or pinch to zoom. There is no scene UI and no runtime remote asset. Geometry and seeded canvas material textures are original procedural assets.

```sh
npm install
npm run dev -- --port 5173
npm run build
npm run preview -- --port 4171 --strictPort
```

The preview serves `dist/`, not development source. A subpath build is supported with `npm run build -- --base=/cs-pvp-diorama/gpt-6.1-sol/ --outDir=dist-subpath`.

`npm run test:e2e` expects the production preview on port 4171 and the locally installed, connected Kimi browser-extension bridge on port 10086. It uses that bridge only for browser control; it does not call a model. Tests cover render readiness, console errors, absent UI, pointer orbit, wheel zoom, mobile DPR 2, local resource loading and a 60-second continuous run. Evidence is captured from the actual scene.
