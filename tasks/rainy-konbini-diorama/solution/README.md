# 雨のまち · Night Corner

```sh
npm install
npm run dev -- --port 5173
npm run build
npm run preview -- --port 4184 --strictPort
```

Drag to orbit; scroll or pinch to zoom. No UI or people. The production build is a static scene using local Three.js, procedural geometry and seeded canvas materials/signage. There are no external fonts, textures, audio or API requests.

The rear roof remains while the front roof is cut away, revealing merchandise shelves, drinks, bento, checkout, coffee and magazines through the glass-front structure. Puddles use real planar reflections; rain, eave drips, glass runoff, ripples, signage variation, sliding doors and the traffic signal animate.

Gallery build: `npm run build -- --base=/rainy-konbini-diorama/gpt-6.1-sol/ --outDir=dist-subpath` (on Git Bash, prefix `MSYS_NO_PATHCONV=1`).

`npm run test:e2e` requires the production preview at 4184 and the connected local browser-extension bridge on 10086. It controls the browser only, without another model. It tests actual pointer orbit, wheel zoom, desktop and mobile DPR2, door and signal changes, a 70-second continuous run, same-origin resources and console errors. Actual screenshots and state records are saved in `evidence/`.
