# Vendored Three.js

The application imports these files directly (`../vendor/three.module.js` and
`../vendor/OrbitControls.js`). Nothing is loaded from a CDN at runtime and
`node_modules/` is not used as vendor.

| File | Upstream path | Purpose |
| --- | --- | --- |
| `three.module.js` | `build/three.module.js` | Three.js r180 ESM build (WebGL renderer, cameras, render targets, materials). |
| `three.core.js` | `build/three.core.js` | Core classes imported by `three.module.js` in r180. |
| `OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` | Interactive camera controller. |

- Upstream project: https://github.com/mrdoob/three.js
- Version: **0.180.0** (revision `r180`), pinned in `package.json` / `package-lock.json`.
- Source: npm package `three@0.180.0` (`https://registry.npmjs.org/three/-/three-0.180.0.tgz`).
- License: **MIT** — `Copyright 2010-2025 Three.js Authors`, `SPDX-License-Identifier: MIT`
  (the upstream license header is preserved at the top of each file).

`OrbitControls.js` is byte-identical to upstream except for its single bare
import specifier, rewritten from `from 'three'` to `from './three.module.js'`
so the vendored module graph stays local. Regenerate with `npm run vendor`
(`scripts/vendor.mjs`); the transformation is deterministic.
