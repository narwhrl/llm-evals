# Vendored Three.js

## What is here

A verbatim, version-pinned subset of the Three.js ESM distribution plus the addons that
this project actually imports at runtime. The application's source only ever writes
`import ... from 'three'` or `'three/addons/...'`; a Vite alias resolves those specifiers
into this directory (see below), so the built site contains no `node_modules` code path and
makes no network request for a library.

## Upstream provenance

| Field | Value |
| --- | --- |
| Package | `three` |
| Version | `0.186.0` (exact, pinned in `package.json` and `package-lock.json`) |
| Source | npm registry tarball `https://registry.npmjs.org/three/-/three-0.186.0.tgz` |
| Publish date of that version | 2026-01 (`npm view three@0.186.0 time`) |
| License | MIT — Copyright © 2010-2026 three.js authors |
| Local copy method | `npm install` into `node_modules/`, then `cp` of the files listed below, byte for byte, with directory structure preserved |

The full upstream license text is included at `vendor/three/LICENSE` (identical to
`node_modules/three/LICENSE`). Summary: MIT permits use, copying, modification, and
redistribution provided the copyright notice and permission notice are retained; the
software is provided "as is", without warranty of any kind. The unmodified license file
travels with the copied sources, which satisfies that condition.

`node_modules/three` is **not** part of the deliverable: it is git-ignored. The `three`
entry stays in `package.json` only to document and lock the provenance of the vendored
files.

## Copied files (mirrors the upstream directory layout)

| Path under `vendor/three/` | Bytes | SHA-256 |
| --- | --- | --- |
| `LICENSE` | 1081 | — |
| `build/three.module.js` | 662772 | `9052042d676cb0fdc1ddfefe193053f34b7ac0513a616fdac4535d49987812ea` |
| `build/three.core.js` | 1458113 | `9edde002b066a9a05676a6127f67735b62baf399bdea529f2f7e31657da769e6` |
| `examples/jsm/controls/OrbitControls.js` | 40755 | `3d79d07ecb686b4e5d93232eedab255331c1beef711e13164eaa1f68655a5f2b` |
| `examples/jsm/postprocessing/EffectComposer.js` | 8501 | `4e079a5886152d7e529a59aef644e968ab4d32c6a33ce016b36bf29b2eac26f7` |
| `examples/jsm/postprocessing/RenderPass.js` | 4280 | `817f6c3cdcd0fd41515d112359ea0532568eefb5aabd3b33903957ebca1b8a6a` |
| `examples/jsm/postprocessing/ShaderPass.js` | 3228 | `e2500a5913b26bbf5148ceaae644c6edcff06a18b01494ee37bf856353d2ab9d` |
| `examples/jsm/postprocessing/UnrealBloomPass.js` | 15397 | `ba8f2fcadfa6588384c9473498f974d81d120f02f0e63a0e59c265202a006b5a` |
| `examples/jsm/postprocessing/Pass.js` | 4218 | `444b409c235ead986893c472e720da1b779a56985c7d10b279c7944b52bd61c5` |
| `examples/jsm/postprocessing/MaskPass.js` | 4694 | `7cd08eee9d5d6f5578beaddbdcbe9c384f6873810af27f22ab7db3ceeb127aa3` |
| `examples/jsm/shaders/CopyShader.js` | 729 | `a33057d5ac91c43304c186ac0e8816e62bb2ed471d3a00ff3018dfd5c0389718` |
| `examples/jsm/shaders/LuminosityHighPassShader.js` | 1291 | `5044f780b6e6cf863947f64c36fe1587132f7fbe395ada863cd1e5f0388dcf1e` |

## Why exactly these files

The set is the transitive closure of what the application imports:

```text
src/…                       imports 'three'                     -> build/three.module.js
                                                                    -> build/three.core.js
src/render/RendererManager  imports 'three/addons/controls/OrbitControls.js'
                            imports 'three/addons/postprocessing/EffectComposer.js'
                            imports 'three/addons/postprocessing/RenderPass.js'
                            imports 'three/addons/postprocessing/ShaderPass.js'
                            imports 'three/addons/postprocessing/UnrealBloomPass.js'

OrbitControls.js      -> 'three'
EffectComposer.js     -> 'three', ../shaders/CopyShader.js, ./ShaderPass.js, ./MaskPass.js
RenderPass.js         -> 'three', ./Pass.js
ShaderPass.js         -> 'three', ./Pass.js
UnrealBloomPass.js    -> 'three', ./Pass.js, ../shaders/CopyShader.js,
                         ../shaders/LuminosityHighPassShader.js
MaskPass.js           -> ./Pass.js
Pass.js               -> 'three'
CopyShader.js         -> (no imports)
LuminosityHighPassShader.js -> 'three'
build/three.module.js -> ./three.core.js
build/three.core.js   -> (no imports)
```

`MaskPass.js` is pulled in by `EffectComposer.js` (it imports `MaskPass` and
`ClearMaskPass`), so it is required even though this project never uses a mask pass.
`OutputPass.js` is deliberately **not** copied: this project performs its own ACES tone
mapping and sRGB encoding in a custom final pass, so `OutputPass` is never imported.
Every other `examples/jsm` directory is absent for the same reason.

## How the Vite alias maps imports to these files

`solution/vite.config.js`:

```js
const vendorThree = fileURLToPath(new URL('./vendor/three/build/three.module.js', import.meta.url))
const vendorAddonsDir = fileURLToPath(new URL('./vendor/three/examples/jsm/', import.meta.url))

alias: [
  { find: /^three$/, replacement: vendorThree },
  { find: /^three\/addons\/(.*)$/, replacement: vendorAddonsDir + '$1' },
]
```

Regular expressions are used (rather than a plain string prefix) so that the relative
imports *inside* the copied addon files also resolve: `OrbitControls.js` and
`LuminosityHighPassShader.js` both contain a bare `from 'three'`, which the first alias
rewrites to the vendored `build/three.module.js`, while `from '../shaders/CopyShader.js'`
style specifiers resolve relative to their own vendored location. The result is that the
whole graph — application code and vendored addons alike — is served from `vendor/`, with
no reference to `node_modules`.

Aliasing is applied both by the dev server and by `vite build`; a successful
`npm run build` therefore proves the vendored graph is self-contained.
