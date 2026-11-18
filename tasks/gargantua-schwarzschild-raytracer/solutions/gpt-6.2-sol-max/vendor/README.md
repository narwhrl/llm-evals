# Local rendering vendor

The runtime imports the files in this directory directly. They are copied from the npm package `three@0.172.0`, published by the Three.js authors under the MIT License.

- `three.module.js` is the upstream ESM build from `three/build/three.module.js`.
- `three.core.js` is the adjacent core module imported by the upstream build.
- `OrbitControls.js` is the upstream addon from `three/examples/jsm/controls/OrbitControls.js`, with its package import rewritten to the adjacent local ESM build so the static runtime has no bare-module or network dependency.
- Upstream source and license information are available in the installed package metadata and at https://github.com/mrdoob/three.js/blob/r172/LICENSE.

The vendored files are part of the candidate so the built site can run from an offline static server without `node_modules/`.
