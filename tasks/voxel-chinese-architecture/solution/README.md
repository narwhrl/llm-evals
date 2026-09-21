# Voxel Chinese Architecture

体素风格中国古典建筑群（Three.js + Vite）。打开页面即进入全景俯瞰：山门 → 庭院 → 主殿，两侧配殿、宝塔与钟鼓楼。

## Requirements

- Node.js 18+ and npm

## Install

```bash
cd tasks/voxel-chinese-architecture/solution
npm ci --no-audit --no-fund
```

If `package-lock.json` is missing, use `npm install --no-audit --no-fund` instead.

## Develop

```bash
npm run dev
```

Then open the printed local URL (default `http://localhost:5173/`).

## Production build

```bash
npm run build
```

Output goes to `dist/`. Preview with:

```bash
npm run preview
```

## Gallery / deploy build

The gallery builder invokes:

```bash
npm run build -- --base=/voxel-chinese-architecture/grok-bot/ --outDir=<abs-out> --emptyOutDir
```

## Controls

- Drag to orbit, scroll to zoom
- Default camera already frames the full courtyard complex
- Gentle auto-rotate is enabled

## Scene contents

| Building | Role |
| --- | --- |
| 主殿 Main hall | Largest volume on the central axis |
| 东/西配殿 Side halls | Symmetric flanking halls |
| 山门 Mountain gate | Front entrance with stone lions |
| 宝塔 Pagoda | Multi-tier tower east of the court |
| 钟楼 / 鼓楼 | Bell & drum towers flanking mid-court |

Style details: flying eaves, dougong brackets, columns, steps, red walls, glazed gold / blue-gray tiles, wood members, doors, lattice windows, lanterns, stone lions, axial paving, dusk lighting with shadows.
