# Vendored Three.js

This directory contains the exact Three.js ESM build and addon used at runtime. Nothing is fetched from a CDN at build or runtime.

| Path | Upstream source | Version |
| --- | --- | --- |
| `three/three.module.js` | `three/build/three.module.js` | 0.186.1 |
| `three/three.core.js` | `three/build/three.core.js` | 0.186.1 |
| `three/addons/controls/OrbitControls.js` | `three/examples/jsm/controls/OrbitControls.js` | 0.186.1 |

Upstream: <https://github.com/mrdoob/three.js> — npm package `three@0.186.1`.

License: MIT. The upstream license text is reproduced in `LICENSE.three`. The addon imports the package specifier `three`; Vite's `resolve.alias` maps that specifier to `vendor/three/three.module.js` in `vite.config.js`, so no `node_modules` copy is bundled.

These files are copied verbatim from the published npm package. Update them together with the `three` version in `package.json` and `package-lock.json` when upgrading.
