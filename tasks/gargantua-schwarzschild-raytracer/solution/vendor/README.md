# Locally vendored Three.js

- **Upstream version:** Three.js r180 (`three@0.180.0`)
- **Source:** https://github.com/mrdoob/three.js/releases/tag/r180 and the pinned npm package
- **License:** MIT; the unmodified upstream license is in `THREE-LICENSE.txt`.

Runtime files:

- `three.module.js` and `three.core.js` are the upstream ESM builds.
- `OrbitControls.js` is the upstream `examples/jsm/controls/OrbitControls.js` addon. Its bare `three` import was changed to `./three.module.js`; no control logic was changed.

These files, not `node_modules`, are imported by the application at runtime. No CDN or remote asset is used.
