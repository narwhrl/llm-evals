# Vendored Three.js

- Upstream: `three` npm package
- Version: `0.170.0`
- Source: `https://github.com/mrdoob/three.js/tree/r170`
- Files: `three.module.js` and `addons/controls/OrbitControls.js`
- License: MIT, reproduced in `LICENSE`

These are the ESM files imported by the application at runtime. Vite aliases the
bare `three` specifier to `vendor/three.module.js`; the controls addon is imported
directly from `vendor/addons/controls/`. No CDN or remote module is used.
