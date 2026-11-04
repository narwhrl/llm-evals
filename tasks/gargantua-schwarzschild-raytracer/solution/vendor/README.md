# Vendored runtime dependencies

The application imports Three.js **only** from this directory (`../vendor/...` in
`src/`), not from `node_modules/` and not from a CDN. `node_modules/` is ignored
by Git and is never submitted as vendor.

| File | Upstream | Version | Purpose |
| --- | --- | --- | --- |
| `three.module.js` | npm `three@0.170.0`, `build/three.module.js` | r170 | Three.js ESM build: `WebGLRenderer`, `WebGLRenderTarget`, `ShaderMaterial`, math classes |
| `OrbitControls.js` | npm `three@0.170.0`, `examples/jsm/controls/OrbitControls.js` | r170 | Interactive orbit / zoom / touch camera; its only import was rewritten from the bare specifier `three` to `./three.module.js` so it resolves locally |
| `THREE-LICENSE.txt` | npm `three@0.170.0`, `LICENSE` | r170 | Verbatim upstream MIT license |

- Upstream project: <https://github.com/mrdoob/three.js>
- Package source: npm registry `three@0.170.0` (installed by `npm install`, then copied verbatim here).
- License: MIT (see `THREE-LICENSE.txt`). Copyright 2010-2024 Three.js Authors.

`three.module.js` is self-contained in r170 (no separate `three.core.js`), so a
single file plus the addon is the complete Three.js runtime used by the built
site. No other third-party runtime asset is loaded: stars, galaxy, disk
turbulence and all shader maths are generated in `src/shaders.js`.
