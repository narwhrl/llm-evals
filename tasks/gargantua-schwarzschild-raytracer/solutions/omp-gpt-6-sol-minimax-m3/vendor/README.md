# vendor/three — bundled Three.js

The runtime renderer and `OrbitControls` add-on are vendored here so the static
build never relies on `node_modules/three` or any network resource.

## Files

| File | Purpose |
| --- | --- |
| `three.module.js` | The ESM build of Three.js. Aliased from the bare specifier `three` by `vite.config.js`. |
| `three.core.js`  | The implementation chunk `three.module.js` resolves relatively (`./three.core.js`); required for the module to initialize. |
| `addons/controls/OrbitControls.js` | Camera controls used by `src/renderer.js`. Imports `three` via the same Vite alias. |
| `LICENSE` | MIT license text of Three.js. |

## Source

- **Package:** `three@0.181.2` on the public npm registry
- **Tarball:** https://registry.npmjs.org/three/-/three-0.181.2.tgz
- **Files copied:**
  - `build/three.module.js`
  - `build/three.core.js`
  - `examples/jsm/controls/OrbitControls.js`
  - `LICENSE`

The files were copied verbatim from a clean `npm ci` of the pinned version;
the only consumer change is the Vite alias that points `import 'three'` at
`vendor/three/three.module.js`, both in development and in the production
build, so the production bundle is self-contained.

## License

Three.js is released under the MIT License (see `LICENSE`).
