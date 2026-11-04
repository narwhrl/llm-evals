# Vendored Three.js

The app imports these files directly at runtime. `vite.config.js` maps the bare
specifier `three` to `vendor/three.module.js` and
`three/addons/controls/OrbitControls.js` to `vendor/OrbitControls.js`, so no
`node_modules/` copy and no network/CDN asset is used at runtime or build time.

| File | Upstream | Version |
| --- | --- | --- |
| `three.module.js` | `three/build/three.module.js` from the npm package `three` | 0.170.0 (r170) |
| `OrbitControls.js` | `three/examples/jsm/controls/OrbitControls.js` from the npm package `three` | 0.170.0 (r170) |
| `LICENSE` | `three/LICENSE` from the npm package `three` | 0.170.0 |

- Source / provenance: <https://www.npmjs.com/package/three/v/0.170.0> and
  <https://github.com/mrdoob/three.js/tree/r170>. The exact bytes are the files
  shipped by the `three@0.170.0` tarball, installed via the pinned
  `package.json` / `package-lock.json` and copied here unchanged.
- License: MIT. Copyright 2010-2024 Three.js Authors. Full text in `LICENSE`.
- `three.module.js` is a self-contained ESM bundle (no external imports).
  `OrbitControls.js` imports only from `three`, resolved to the vendored bundle
  by the Vite alias above.
- `OrbitControls` supplies the interactive camera. Three.js geometry is used
  only for the full-screen shader quad and that camera; the black hole, disk,
  stars and lensing are produced per-pixel by the custom fragment shader.
