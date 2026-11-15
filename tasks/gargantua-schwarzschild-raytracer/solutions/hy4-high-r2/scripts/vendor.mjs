// Regenerates vendor/ from the pinned three devDependency.
// Run with: npm run vendor
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'node_modules/three');
const out = resolve(root, 'vendor');
mkdirSync(out, { recursive: true });

const build = resolve(src, 'build');
for (const file of ['three.module.js', 'three.core.js']) {
  copyFileSync(resolve(build, file), resolve(out, file));
}

// OrbitControls is the only addon used at runtime. Its upstream bare "three"
// specifier is rewritten to the vendored ESM build so the browser never needs
// an import map or a network-resolved bare specifier.
let controls = readFileSync(resolve(src, 'examples/jsm/controls/OrbitControls.js'), 'utf8');
controls = controls.replace(/from ['"]three['"]/g, "from './three.module.js'");
writeFileSync(resolve(out, 'OrbitControls.js'), controls);

console.log('vendor/ regenerated from three@0.180.0');
