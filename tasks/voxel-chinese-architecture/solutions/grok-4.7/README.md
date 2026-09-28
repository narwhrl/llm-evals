# Voxel Chinese Architecture

A static Three.js courtyard: mountain gate, front court, double-eave main hall, side halls, pagodas, and a rear cloister wall. Blocks are colored voxels merged into boxes.

## Commands

From this directory:

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run dev` opens the scene immediately. Drag to orbit and scroll to zoom; the first frame is already the full courtyard, and orbit does not move that opening view.

`npm run build` runs `vite build`. Hosting may pass `--base` and `--outDir`; Vite accepts both. The config default `base: "./"` keeps a local `dist/` preview working when those flags are absent.

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```
