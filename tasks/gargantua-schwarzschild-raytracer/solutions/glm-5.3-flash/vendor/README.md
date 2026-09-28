# Vendored Three.js

This project runs fully offline: every three.js import at runtime resolves to the
files in this directory (via the `three` alias in `vite.config.js` and the
relative paths in `src/`). Nothing is fetched from a CDN.

## Contents

| File | Upstream source (npm package `three@0.170.0`) |
| --- | --- |
| `three.module.js` | `build/three.module.js` |
| `addons/controls/OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` |
| `addons/postprocessing/EffectComposer.js` | `examples/jsm/postprocessing/EffectComposer.js` |
| `addons/postprocessing/Pass.js` | `examples/jsm/postprocessing/Pass.js` |
| `addons/postprocessing/MaskPass.js` | `examples/jsm/postprocessing/MaskPass.js` |
| `addons/postprocessing/RenderPass.js` | `examples/jsm/postprocessing/RenderPass.js` |
| `addons/postprocessing/ShaderPass.js` | `examples/jsm/postprocessing/ShaderPass.js` |
| `addons/postprocessing/UnrealBloomPass.js` | `examples/jsm/postprocessing/UnrealBloomPass.js` |
| `addons/shaders/CopyShader.js` | `examples/jsm/shaders/CopyShader.js` |
| `addons/shaders/LuminosityHighPassShader.js` | `examples/jsm/shaders/LuminosityHighPassShader.js` |

## Provenance

- Upstream project: three.js — https://github.com/mrdoob/three.js
- Version: `0.170.0` (r170, released 2024-10-31), pinned exactly in
  `package.json` and `package-lock.json`.
- Installed once with `npm install three@0.170.0`; the files above were then
  copied byte-for-byte out of `node_modules/` into this directory. They are not
  modified. The directory layout mirrors the upstream `examples/jsm/` structure
  so the addons' relative imports (`./Pass.js`, `../shaders/CopyShader.js`, …)
  keep working unchanged.
- `node_modules/` is never committed and never served at runtime; the build
  inlines these vendored files into `dist/`.

## License

three.js is licensed under the MIT License. Upstream license text:
https://github.com/mrdoob/three.js/blob/dev/LICENSE (reproduced below).

```
The MIT License

Copyright © 2010-2024 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
