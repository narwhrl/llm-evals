# rainy-konbini-diorama / swe-2

Vite + Three.js miniature of a rainy-night Japanese convenience-store street corner, toon-shaded with anime-style outlines.

## Run

```bash
npm install
npm run dev      # local development server
npm run build    # production build into dist/
npm run preview  # serve the built app
```

The scene is a single WebGL canvas. Drag to orbit, scroll to zoom, right-drag to pan. All geometry, textures and animation are generated at runtime; no external assets are fetched.
