# Local Vendor Dependencies

This directory contains the locally vendored Three.js ES Module runtime files imported directly by the application (configured via `vite.config.js` alias and direct addon ESM imports). Zero remote CDNs or network fetches are used at runtime.

## Three.js

- **Package:** `three`
- **Upstream Version:** `0.174.0`
- **Upstream Source:**
  - Repository: `https://github.com/mrdoob/three.js` (release tag `r174`)
  - npm Registry Package: `https://www.npmjs.com/package/three/v/0.174.0`
  - Tarball SHA-1: `53f46d6fd27515231b2af321f798f1e0ecf3f905`
- **License:** MIT License (full upstream license text preserved in [`three/LICENSE`](three/LICENSE))

### Vendored Files

| Local Path | Upstream Path in `three@0.174.0` | Purpose |
| --- | --- | --- |
| `vendor/three/three.module.js` | `build/three.module.js` | Primary Three.js ESM entry (`WebGLRenderer`, `PerspectiveCamera`, `WebGLRenderTarget`, `ShaderMaterial`, math primitives) |
| `vendor/three/three.core.js` | `build/three.core.js` | Core Three.js ESM module imported by `three.module.js` |
| `vendor/three/addons/controls/OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` | Interactive orbit, zoom, and touch camera controls driving the raytracer camera uniforms |
| `vendor/three/LICENSE` | `LICENSE` | Upstream MIT License notice |

### Modifications

None. All vendored files are copied verbatim from the official `three@0.174.0` npm package distribution.
