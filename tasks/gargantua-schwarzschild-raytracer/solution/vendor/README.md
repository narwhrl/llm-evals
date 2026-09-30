# Local Three.js vendor

Upstream: Three.js **0.180.0**, https://github.com/mrdoob/three.js/tree/r180. Source: the exact npm package `three@0.180.0`, locked in `package-lock.json`. License: MIT, copied in `LICENSE`.

Runtime imports `vendor/three.module.js` (which imports `three.core.js`) and `vendor/addons/OrbitControls.js`. Build files are copied unchanged; OrbitControls changes only its `from 'three'` specifier to `from '../three.module.js'` so it resolves locally. `node tools/vendor.mjs` reproduces the vendoring after `npm install`. Runtime uses no CDN.
