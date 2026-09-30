import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
mkdirSync('vendor/addons',{recursive:true});
for(const f of ['three.module.js','three.core.js'])copyFileSync('node_modules/three/build/'+f,'vendor/'+f);
copyFileSync('node_modules/three/LICENSE','vendor/LICENSE');
const orbit=readFileSync('node_modules/three/examples/jsm/controls/OrbitControls.js','utf8').replace(/from 'three'/g,"from '../three.module.js'");writeFileSync('vendor/addons/OrbitControls.js',orbit);
