# Vendored Dependencies (`vendor/`)

This directory contains the exact local ES Module build of **Three.js** and the **`OrbitControls`** addon imported at build and runtime by the application. `three` is intentionally absent from `node_modules/` so all Three.js imports resolve exclusively to these tracked local files.

## Upstream Provenance

- **Library**: Three.js (`three`)
- **Upstream Version**: `0.174.0` (`REVISION = '174'`)
- **Upstream Source**: Official npm package tarball `three@0.174.0` (`https://registry.npmjs.org/three/-/three-0.174.0.tgz` / `https://github.com/mrdoob/three.js/tree/r174`)
- **License**: MIT License (see [`three/LICENSE`](./three/LICENSE))
- **Modification Status**: Unmodified upstream files (`vite.config.js` aliases bare `'three'` inside `OrbitControls.js` directly to `vendor/three/three.module.js`).

## Included Files & SHA-256 Checksums

| Local Path | Upstream Tarball Path | SHA-256 |
| --- | --- | --- |
| `three/three.core.js` | `package/build/three.core.js` | `8af04b9919f19452d7e210db378a4be62f7952f3256739464c088a660d7d7c7f` |
| `three/three.module.js` | `package/build/three.module.js` | `8cd1b1ed9c81fb3e433615f5277f3feeebfb7404836b1fa22c282c02da26b080` |
| `three/addons/controls/OrbitControls.js` | `package/examples/jsm/controls/OrbitControls.js` | `64088a1d7b040c980f61de9a5de74daa21b282eaabb853ed1d52dafa62ec0418` |
| `three/LICENSE` | `package/LICENSE` | `bfe119ea4fd413f5f7ca3fcd63adb0c4a073ed39daa2fe7d3e6b769e21272601` |
