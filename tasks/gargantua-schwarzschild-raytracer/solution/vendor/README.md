# Vendored Three.js

This directory is the **only** Three.js source consumed at runtime. Nothing here is fetched from a
CDN, and `node_modules/` is never committed or served.

- Upstream package: [`three`](https://www.npmjs.com/package/three) — version **0.180.0**
- Upstream repository: <https://github.com/mrdoob/three.js>
- License: MIT (full text in `LICENSE.three`)
- Source of these files: the tarball published to the npm registry for `three@0.180.0`,
  installed as a `devDependency` purely so this directory can be regenerated.

```bash
npm install        # installs three@0.180.0 into node_modules (build-time only)
npm run vendor     # rewrites vendor/ from that install and regenerates this table
```

`build/three.module.js` re-exports from `three.core.js`, so the whole relative import graph is
copied rather than a single file. `addons/controls/OrbitControls.js` is the one addon the runtime
imports; Vite rewrites its bare `three` specifier to `vendor/three/three.module.js` (see
`vite.config.js`), so the shipped bundle contains no bare-module imports and no `node_modules` path.

## Files

| Vendor path | Upstream path | Bytes | SHA-256 |
|---|---|---|---|
| `vendor/three/three.core.js` | `three/build/three.core.js` | 1403455 | `eb077d2417f61d3e6d9264c317cabc4ea35769ed6b0ab533067292a550784c20` |
| `vendor/three/three.module.js` | `three/build/three.module.js` | 603113 | `c8211c69345d2e9949dc7a8ac969380497aa0600a5a8ac6a459c8cd02dd9cb8a` |
| `vendor/three/addons/controls/OrbitControls.js` | `three/examples/jsm/controls/OrbitControls.js` | 38703 | `b97879c748170baadeb3fb84cea1ffdf4674e283dc06042f34e2acb95a76042c` |
