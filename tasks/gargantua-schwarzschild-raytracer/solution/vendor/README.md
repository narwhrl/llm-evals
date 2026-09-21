# Vendored Three.js

| Field | Value |
|-------|-------|
| Package | three |
| Version | 0.170.0 |
| Upstream | https://github.com/mrdoob/three.js |
| npm | https://www.npmjs.com/package/three/v/0.170.0 |
| License | MIT (see `LICENSE`) |

## Contents

- `three.module.js` — official ESM build from `three/build/three.module.js` (r170)
- `addons/controls/OrbitControls.js` — from `three/examples/jsm/controls/OrbitControls.js`, with the `three` import rewritten to the local `../../three.module.js` so runtime stays offline and does not load from `node_modules` or a CDN

## How this copy was produced

```bash
npm install three@0.170.0 --save-dev --no-audit --no-fund
cp node_modules/three/build/three.module.js vendor/three.module.js
cp node_modules/three/examples/jsm/controls/OrbitControls.js vendor/addons/controls/OrbitControls.js
cp node_modules/three/LICENSE vendor/LICENSE
# rewrite OrbitControls import to relative vendor path
```

Runtime imports resolve only under `vendor/`. Bloom, ACES tone mapping, vignette, grain, and chromatic aberration are implemented in-project (fullscreen ping-pong shaders), so EffectComposer / UnrealBloomPass are not vendored.

Do not commit `node_modules/` as vendor.
