# Vendored Three.js

Runtime rendering imports these files directly. They are not loaded from a CDN, and `node_modules/` is not the vendor copy.

| File | Upstream path |
| --- | --- |
| `three.core.js` | `build/three.core.js` |
| `three.module.js` | `build/three.module.js` |
| `OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` |
| `LICENSE` | `LICENSE` |

- Package: `three@0.186.0`
- Upstream: [mrdoob/three.js r186](https://github.com/mrdoob/three.js/releases/tag/r186)
- Source distribution: npm package `three@0.186.0`
- License: MIT (see `LICENSE`)

`three.module.js` imports `./three.core.js` and adds the WebGL renderer. Both files are the upstream build.

`OrbitControls.js` is otherwise unchanged. Its bare import `three` is rewritten to `./three.module.js` so the addon resolves offline inside this directory.
