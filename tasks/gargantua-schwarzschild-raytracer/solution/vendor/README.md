# Vendored Third-Party Runtime Assets

This directory contains the locally vendored Three.js ES Module runtime and camera control addon imported directly by the application at build and runtime. No CDN or external runtime asset is fetched.

## Three.js (`vendor/three/`)

- **Upstream Package:** `three`
- **Upstream Version:** `0.174.0`
- **Source Registry Tarball:** `https://registry.npmjs.org/three/-/three-0.174.0.tgz`
- **Tarball SHA-1:** `53f46d6fd27515231b2af321f798f1e0ecf3f905`
- **Tarball Integrity (SHA-512):** `sha512-p+WG3W6Ov74alh3geCMkGK9NWuT62ee21cV3jEnun201zodVF4tCE5aZa2U122/mkLRmhJJUQmLLW1BH00uQJQ==`
- **Upstream Repository:** `https://github.com/mrdoob/three.js`
- **License:** MIT (full license text preserved in [`three/LICENSE`](./three/LICENSE))

### Included Files

| Local Path | Upstream Path in `three@0.174.0` | Notes |
| --- | --- | --- |
| `vendor/three/three.module.js` | `build/three.module.js` | Official ESM entry point (re-exports `./three.core.js` and renderer modules). |
| `vendor/three/three.core.js` | `build/three.core.js` | Official ESM core dependency imported directly by `three.module.js`. |
| `vendor/three/addons/controls/OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` | Official `OrbitControls` ESM addon; bare `'three'` specifier updated to relative `'../../three.module.js'` so ESM resolution strictly targets this local `vendor/` directory. |
| `vendor/three/LICENSE` | `LICENSE` | Upstream MIT license notice (`Copyright © 2010-2025 three.js authors`). |
