# Vendored Three.js

- Upstream package: `three`
- Version: `0.180.0` (exact, pinned in `package.json` and `package-lock.json`)
- Source: npm registry tarball for `three@0.180.0`, files copied verbatim from `node_modules/three/`
- License: MIT (`LICENSE` in this directory, Copyright 2010-2025 Three.js Authors)

## Contents

| File | Origin |
| --- | --- |
| `three.module.js` | `three/build/three.module.js` |
| `three.core.js` | `three/build/three.core.js` — imported by `three.module.js` via a relative specifier |
| `addons/controls/OrbitControls.js` | `three/examples/jsm/controls/OrbitControls.js` — its bare `three` specifier is resolved by the `three` alias in `vite.config.js` |

The application imports Three.js only from this directory. No CDN, no runtime download, no `node_modules/` dependency at build or run time.
