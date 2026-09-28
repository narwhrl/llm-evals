# 小雨マート — Rainy Konbini Diorama

A self-contained Three.js miniature of a rainy Japanese convenience-store corner. All scene geometry, signs, products, rain, and light effects are generated in the browser; no external asset service is required.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. Drag to orbit and use the mouse wheel or trackpad to zoom. The scene has no visible controls.

## Production build

```sh
npm run build
npm run preview
```

The build output is `dist/`. Vite's `--base` and `--outDir` options can be passed through to `npm run build` for the candidate gallery.
