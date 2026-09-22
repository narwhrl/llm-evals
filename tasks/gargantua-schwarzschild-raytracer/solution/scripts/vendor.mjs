import { mkdir, copyFile, writeFile } from 'node:fs/promises';
await mkdir('vendor/three', { recursive: true });
for (const name of ['three.module.js', 'three.core.js']) await copyFile(`node_modules/three/build/${name}`, `vendor/three/${name}`);
await copyFile('node_modules/three/examples/jsm/controls/OrbitControls.js', 'vendor/three/OrbitControls.js');
await copyFile('node_modules/three/LICENSE', 'vendor/three/LICENSE');
await writeFile('vendor/README.md', '# Local Three.js\n\nThree.js 0.186.0 (MIT), obtained from the official npm package https://www.npmjs.com/package/three/v/0.186.0, upstream https://github.com/mrdoob/three.js/tree/r186.\n\nThe unmodified ESM builds three.module.js, three.core.js and addon OrbitControls.js are the runtime sources. Vite aliases every bare `three` import to this directory, including the addon import. No runtime CDN or node_modules vendor substitution. LICENSE is included. Reproduce with `npm ci` then `npm run vendor`.\n');
