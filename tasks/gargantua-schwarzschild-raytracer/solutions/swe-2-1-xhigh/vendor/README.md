# vendor/

This directory contains the exact Three.js ESM runtime files that the application
imports at runtime. It is intentionally **not** `node_modules/`; the package in
`node_modules` is only the npm distribution source used for install-time pinning.

## Contents

| Path | Upstream file | Purpose |
| --- | --- | --- |
| `three/build/three.module.js` | `three/build/three.module.js` | Three.js ES module build imported as `three` (aliased in `vite.config.js`) |
| `three/build/three.core.js` | `three/build/three.core.js` | Core implementation re-exported by `three.module.js` (required sibling file) |
| `three/examples/jsm/controls/OrbitControls.js` | same path upstream | Camera orbit/touch interaction |
| `three/examples/jsm/postprocessing/{EffectComposer,RenderPass,ShaderPass,UnrealBloomPass,MaskPass,Pass,OutputPass}.js` | same path upstream | HDR post-processing chain (render + bloom + finish passes) |
| `three/examples/jsm/shaders/{CopyShader,LuminosityHighPassShader,OutputShader}.js` | same path upstream | Shader dependencies of the post-processing passes |
| `three/LICENSE` | `three/LICENSE` | Upstream license text |

## Provenance

- Upstream package: [`three`](https://github.com/mrdoob/three.js), version **0.180.0**
  (exact version pinned through `package-lock.json`).
- Files copied verbatim from the published npm package `three@0.180.0`
  (registry: https://www.npmjs.com/package/three). No modifications.
- License: MIT (see `three/LICENSE`).

## Runtime import path

`vite.config.js` aliases the bare specifier `three` to `vendor/three/build/three.module.js`
and `three/addons/` to `vendor/three/examples/jsm/`, so both the application code and the
vendored addons (`from 'three'` inside addons) resolve to this vendored copy in development
and production builds. No CDN or remote module is referenced anywhere.
