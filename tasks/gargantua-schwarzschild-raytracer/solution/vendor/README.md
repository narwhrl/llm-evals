# Vendored third-party code

The application imports Three.js **only** from this directory. `three` is intentionally not an npm dependency: `vite.config.js` aliases the bare specifier `three` to `vendor/three/build/three.module.js` and `three/addons/*` to `vendor/three/examples/jsm/*`, so the bare `'three'` import inside `OrbitControls.js` resolves to the same vendored module instance. If a vendored file is missing, `npm run build` fails instead of falling back to `node_modules/` or a CDN.

## Three.js r186 (`three@0.186.0`)

- Upstream project: <https://github.com/mrdoob/three.js> (tag `r186`)
- Source archive: npm registry tarball <https://registry.npmjs.org/three/-/three-0.186.0.tgz>
  - npm integrity: `sha512-cr/fIM2ddMSVbYVgkfD4jLJv7Fh/8ZTjvo+7gQeSVGUZHxpx9FDwoL5iC7hUz/LiRA8wMbqfnb90xKfm1/HHkQ==`
  - tarball SHA-256: `61eeff9d7616005c9a481c796f52287d81fbbbc0d55eaca5565322924252c1aa`
- License: MIT, copied verbatim to [`three/LICENSE`](three/LICENSE) (Copyright © 2010-2026 three.js authors)
- Files are byte-for-byte copies from the tarball; nothing was modified, minified, or re-bundled.

| Vendored file | Tarball path | Role | SHA-256 |
| --- | --- | --- | --- |
| `three/build/three.module.js` | `package/build/three.module.js` | ESM entry (`WebGLRenderer`, render targets, materials); imports `./three.core.js` | `9052042d676cb0fdc1ddfefe193053f34b7ac0513a616fdac4535d49987812ea` |
| `three/build/three.core.js` | `package/build/three.core.js` | ESM core shared by the entry (math, cameras, geometry, constants) | `9edde002b066a9a05676a6127f67735b62baf399bdea529f2f7e31657da769e6` |
| `three/examples/jsm/controls/OrbitControls.js` | `package/examples/jsm/controls/OrbitControls.js` | Addon: orbit/zoom/touch camera controls | `3d79d07ecb686b4e5d93232eedab255331c1beef711e13164eaa1f68655a5f2b` |
| `three/LICENSE` | `package/LICENSE` | MIT license text | `8b378ebe60e2fe500158cb0ac71cb5e8b7d92953c2abcc63a0eb90499653b5bc` |

### Reproduce / audit

```bash
npm pack three@0.186.0
tar -xzf three-0.186.0.tgz
sha256sum package/build/three.module.js package/build/three.core.js \
  package/examples/jsm/controls/OrbitControls.js package/LICENSE
```

The checksums must match the table above. To upgrade, replace all four files from the same new tarball, update this table, and rebuild.
