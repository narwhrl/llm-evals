# Genshin Celestia — 原神·天空岛

Three.js + TypeScript + Vite, movie-grade 3D diorama of Celestia: giant central floating rock island with a tall ivory multi-tier spire topped by an interlocking gold armillary, ring of 8 floating islets joined by white arched bridges + gold ring-road traces, colonnades, suspended waterfalls, ruins, drifting debris, sea of clouds, god-ray shafts, and a distant Teyvat continent below.

## Run

```sh
npm install
npm run dev          # → http://localhost:5173/
```

## Build (sub-path deployment safe)

```sh
npm run build -- --base /genshin-celestia/crouton-alpha-max/ --outDir dist
npm run preview
```

Idle scene, no input needed: camera opens in a cinematic ¾ distant shot. Drag to orbit, wheel to zoom, right-drag to pan. Rings rotate, waterfalls scroll, debris drifts.
