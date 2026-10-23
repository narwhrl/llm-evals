# AOI — Rainy Konbini Diorama

A procedural Three.js miniature of a warm Japanese convenience store on a cool, rainy street corner. All geometry and textures are generated locally; no external assets or services are required.

## Run

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Drag to orbit, use the wheel or a pinch gesture to zoom, and right-drag to pan. The scene intentionally has no visible interface.

## Production

```sh
npm run build
npm run preview
```

The production output is written to `dist/`. The gallery build may additionally pass Vite's `--base` and `--outDir` options.

## Implementation

- `src/store.js`: furnished, illuminated store and animated storefront.
- `src/street.js`: square base, streets, exterior props, and lighting.
- `src/effects.js`: rain, eave drips, puddle ripples, and glass runoff.
- `src/main.js`: renderer, orbit camera, and animation lifecycle.
