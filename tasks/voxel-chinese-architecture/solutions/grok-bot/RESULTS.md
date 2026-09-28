# Results — voxel-chinese-architecture / grok-bot

- **Model id:** `grok-bot`
- **Baseline SHA:** `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- **Branch:** `llm/voxel-chinese-architecture/grok-bot`
- **Worktree:** `.worktrees/voxel-chinese-architecture/grok-bot`
- **Implementation path:** `tasks/voxel-chinese-architecture/solution/`

## Verification commands and results

All commands were run from `tasks/voxel-chinese-architecture/solution/` on 2026-09-22 (CST).

### Install

```bash
npm install --no-audit --no-fund
```

- Result: success (15 packages). `package-lock.json` produced.

### Production build

```bash
npm run build
```

- Result: success. Vite 6.4.3 built `dist/index.html` + `dist/assets/index-*.js` (~501 kB / gzip ~126 kB) in ~1.7s.

### Gallery-style build

```bash
npm run build -- --base=/voxel-chinese-architecture/grok-bot/ --outDir=/tmp/voxel-cn-arch-out --emptyOutDir
```

- Result: success. `/tmp/voxel-cn-arch-out/index.html` present; script `src` uses base `/voxel-chinese-architecture/grok-bot/assets/...`.

### Voxel generation smoke check

```bash
node --input-type=module -e "import { VoxelWorld } from './src/voxel.js'; import { buildComplex } from './src/buildings.js'; const w=new VoxelWorld(0.55); buildComplex(w); console.log(w.count);"
```

- Result: `30396` voxels placed (instanced by color at runtime).

### Runtime / servers

- No long-running `vite` / `preview` servers left after verification.
- Browser visual QA of the WebGL canvas was not automated in this environment; scene opens directly into an elevated overview with OrbitControls + dusk directional light and shadows by design.

## Known limitations

- Roofs and dougong are voxel approximations of 歇山 / 庑殿 / 攒尖 forms, not measured timber-frame CAD.
- Chunk size warning from Vite (>500 kB) is expected (Three.js bundled); no code-splitting applied.
- Very large shadow map / high voxel counts may be heavy on low-end GPUs; pixel ratio capped at 2.

## Human intervention

- None required beyond the standard Node/npm toolchain already available on the evaluation box.
