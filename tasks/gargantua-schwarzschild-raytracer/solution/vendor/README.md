# vendor/

Runtime dependencies for GARGANTUA, copied into the repository so the built
site runs from a static server with no network access.

## Contents

| File | Upstream path in `three@0.186.1` | Role |
| --- | --- | --- |
| `three.module.js` | `build/three.module.js` | Three.js ESM entry point (re-exports `three.core.js`) |
| `three.core.js` | `build/three.core.js` | Three.js core implementation |
| `three/examples/jsm/controls/OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` | Camera orbit / zoom / touch controls |
| `LICENSE` | `LICENSE` | Upstream license text (MIT) |

## Provenance

- **Upstream:** https://github.com/mrdoob/three.js
- **Version:** `three@0.186.1` (pinned by `package-lock.json` in the parent directory)
- **Source:** the published npm tarball `three@0.186.1`; `build/three.module.js`,
  `build/three.core.js` and `examples/jsm/controls/OrbitControls.js` were copied
  byte-for-byte from the installed package.
- **License:** MIT — `Copyright © 2010-2026 three.js authors`. The full text is
  in [`LICENSE`](LICENSE) and is reproduced below.

```
MIT License

Copyright © 2010-2026 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## How it is imported

`vite.config.ts` aliases the bare specifier `three` to `vendor/three.module.js`,
so application and addon code can use normal `import ... from "three"` syntax
while the bundle resolves to the vendored copy. `OrbitControls.js` imports from
`"three"` and therefore resolves to the same file.

`node_modules/` is **not** committed and is not used at runtime: it only exists
to produce the lockfile and to run the build. The vendored copies are the
runtime source of truth.
