# Local Three.js vendor

The runtime imports `three.module.js` and `OrbitControls.js` from this folder. They are copied from the npm package `three@0.180.0`, whose upstream source and license are available at <https://github.com/mrdoob/three.js> and <https://github.com/mrdoob/three.js/blob/r180/LICENSE>.

`OrbitControls.js` is the official Three.js addon with its module import rewritten to the neighboring local `three.module.js`, so the built site has no runtime CDN or network dependency.
