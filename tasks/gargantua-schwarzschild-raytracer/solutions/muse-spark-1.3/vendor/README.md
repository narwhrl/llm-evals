# vendor/ — locally vendored Three.js (runtime-imported, no CDN)

Upstream: three.js r170 (`three@0.170.0`), MIT License.
Source: https://github.com/mrdoob/three.js (npm package `three@0.170.0`,
files `build/three.module.js` and `examples/jsm/controls/OrbitControls.js`).
Retrieved via `npm install` with a version-locked `package-lock.json`.

Files:

- `three.module.js` — exact copy of the upstream ESM build.
- `OrbitControls.js` — exact copy of the upstream addon except its bare
  `from 'three'` import, which is rewritten to `./three.module.js` so the
  runtime import stays same-origin with no bundler alias and no network.

License: MIT, copyright the three.js authors (see
https://github.com/mrdoob/three.js/blob/dev/LICENSE).

Only these two files are imported at runtime (`src/engine.js`). Everything
else (React, Vite) is build-time only and bundled. `node_modules/` is never
referenced at runtime and is not a substitute for this directory.
