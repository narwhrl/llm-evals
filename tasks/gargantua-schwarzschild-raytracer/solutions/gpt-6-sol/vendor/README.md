# Vendored Three.js

This directory contains unmodified files from the npm package [`three@0.186.0`](https://www.npmjs.com/package/three/v/0.186.0):

- `build/three.core.js` → `three.core.js`
- `build/three.module.js` → `three.module.js`
- `examples/jsm/controls/OrbitControls.js` → `addons/controls/OrbitControls.js`
- `LICENSE` → `LICENSE`

Source: [mrdoob/three.js, release r186](https://github.com/mrdoob/three.js/releases/tag/r186). The package is MIT licensed; the upstream license text is included in [`LICENSE`](LICENSE). The application imports this local ESM copy through the Vite alias for `three`, and imports the local `OrbitControls` file directly. `three` is also pinned as a development dependency so the exact vendored source version is recorded in `package-lock.json`; the browser bundle does not load it from `node_modules` or any remote URL.
