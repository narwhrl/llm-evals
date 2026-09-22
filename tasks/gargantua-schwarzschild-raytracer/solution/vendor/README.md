# Local Three.js

Three.js 0.186.0 (MIT), obtained from the official npm package https://www.npmjs.com/package/three/v/0.186.0, upstream https://github.com/mrdoob/three.js/tree/r186.

The unmodified ESM builds three.module.js, three.core.js and addon OrbitControls.js are the runtime sources. Vite aliases every bare `three` import to this directory, including the addon import. No runtime CDN or node_modules vendor substitution. LICENSE is included. Reproduce with `npm ci` then `npm run vendor`.
