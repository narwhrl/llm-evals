// Copies the version-locked three.js ESM build and the OrbitControls addon
// from node_modules into vendor/, so runtime imports never touch node_modules
// or a CDN (see vite.config.ts resolve.alias).
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const threePkgDir = path.join(root, 'node_modules', 'three');

if (!existsSync(path.join(threePkgDir, 'package.json'))) {
  console.error('[vendor] node_modules/three not found — run `npm install` first.');
  process.exit(1);
}

const pkg = JSON.parse(
  await readFile(path.join(threePkgDir, 'package.json'), 'utf8'),
);
const version = pkg.version;

const files = [
  ['node_modules/three/build/three.module.js', 'vendor/three/three.module.js'],
  ['node_modules/three/build/three.core.js', 'vendor/three/three.core.js'],
  [
    'node_modules/three/examples/jsm/controls/OrbitControls.js',
    'vendor/three/addons/controls/OrbitControls.js',
  ],
  ['node_modules/three/LICENSE', 'vendor/three/LICENSE'],
];

for (const [, dest] of files) {
  await mkdir(path.dirname(path.join(root, dest)), { recursive: true });
}
for (const [src, dest] of files) {
  await cp(path.join(root, src), path.join(root, dest));
}

const readme = `# Vendored Three.js

- Package: three@${version} from the npm registry, MIT license (see LICENSE below).
- Version is locked by package-lock.json; the files below are copied verbatim
  from that exact version by \`scripts/vendor.mjs\` (runs on \`npm install\`
  via postinstall, or manually via \`npm run vendor\`).
- Copied files:
  - \`node_modules/three/build/three.module.js\` → \`three/three.module.js\`
  - \`node_modules/three/build/three.core.js\` → \`three/three.core.js\`
  - \`node_modules/three/examples/jsm/controls/OrbitControls.js\` → \`three/addons/controls/OrbitControls.js\`
- Application code imports three exclusively through these vendored files
  (\`resolve.alias\` in \`vite.config.ts\` maps the \`three\` specifier to
  \`vendor/three/three.module.js\`). No CDN or other remote source is used at
  runtime; \`node_modules\` is a build/type-check input only.
`;

await writeFile(path.join(root, 'vendor', 'README.md'), readme);

console.log(`[vendor] three@${version} → vendor/three (${files.length} files)`);
