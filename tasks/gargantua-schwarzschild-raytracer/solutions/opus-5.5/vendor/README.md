# Vendored Three.js

The app imports Three.js only from this directory. `node_modules/` holds build tooling (Vite, React) and no Three.js.

| File | Upstream path in the npm package |
| --- | --- |
| `three/three.module.js` | `build/three.module.js` |
| `three/three.core.js` | `build/three.core.js` (imported by `three.module.js`) |
| `three/addons/controls/OrbitControls.js` | `examples/jsm/controls/OrbitControls.js` |
| `three/LICENSE` | `LICENSE` |

- Package: `three@0.186.0` (`REVISION = '186'`)
- Source: <https://registry.npmjs.org/three/-/three-0.186.0.tgz>
- Integrity: `sha512-cr/fIM2ddMSVbYVgkfD4jLJv7Fh/8ZTjvo+7gQeSVGUZHxpx9FDwoL5iC7hUz/LiRA8wMbqfnb90xKfm1/HHkQ==`. It matches the registry's `dist.integrity` and the local tarball's SHA-512.
- License: MIT, Copyright © 2010-2026 three.js authors (see `three/LICENSE`).

`three.module.js`, `three.core.js`, and `LICENSE` are byte-identical to the tarball. `OrbitControls.js` differs on one line only: upstream line 12 reads `} from 'three';`, and here it reads `} from '../../three.module.js';`. That way the addon resolves to the vendored build without a bare-specifier alias.
