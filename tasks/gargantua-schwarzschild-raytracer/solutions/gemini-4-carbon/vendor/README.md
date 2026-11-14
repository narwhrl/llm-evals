# Local Vendored Dependencies (`vendor/`)

This directory holds the exact ES Module build of **Three.js** and its **OrbitControls** addon imported directly by the application at build and runtime without relying on `node_modules/three` or any remote CDN.

## Three.js (`vendor/three/`)

- **Upstream Package:** `three`
- **Version:** `0.174.0` (r174)
- **Upstream Source:** Official npm registry tarball `https://registry.npmjs.org/three/-/three-0.174.0.tgz` (upstream repository: `https://github.com/mrdoob/three.js`, tag `r174`)
- **Tarball Checksums:**
  - `SHA-256`: `d8fb8a21fbad612ef248dae2c87d817d468fd57f062e5cf9f90570ae7a5778a6`
  - `SHA-512` (SRI): `sha512-p+WG3W6Ov74alh3geCMkGK9NWuT62ee21cV3jEnun201zodVF4tCE5aZa2U122/mkLRmhJJUQmLLW1BH00uQJQ==`
- **License:** MIT License (`Copyright © 2010-2025 three.js authors` — full text preserved in [`vendor/three/LICENSE`](three/LICENSE))

## Included Files

| Path | Upstream Path in `three@0.174.0` | Notes |
| --- | --- | --- |
| `vendor/three/three.core.js` | `build/three.core.js` | Unmodified core ESM module |
| `vendor/three/three.module.js` | `build/three.module.js` | Unmodified WebGL ESM entry point |
| `vendor/three/addons/controls/OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` | Bare `'three'` specifier rewritten to relative `'../../three.module.js'` for standalone ESM resolution |
| `vendor/three/LICENSE` | `LICENSE` | Upstream MIT license |
