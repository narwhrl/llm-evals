# Vendored Three.js

- Package: three@0.186.0 from the npm registry, MIT license (see LICENSE below).
- Version is locked by package-lock.json; the files below are copied verbatim
  from that exact version by `scripts/vendor.mjs` (runs on `npm install`
  via postinstall, or manually via `npm run vendor`).
- Copied files:
  - `node_modules/three/build/three.module.js` → `three/three.module.js`
  - `node_modules/three/build/three.core.js` → `three/three.core.js`
  - `node_modules/three/examples/jsm/controls/OrbitControls.js` → `three/addons/controls/OrbitControls.js`
- Application code imports three exclusively through these vendored files
  (`resolve.alias` in `vite.config.ts` maps the `three` specifier to
  `vendor/three/three.module.js`). No CDN or other remote source is used at
  runtime; `node_modules` is a build/type-check input only.
