/**
 * Copies the runtime Three.js ESM build (and the OrbitControls addon actually
 * imported by the application) from node_modules into ./vendor.
 *
 * The application itself never imports "three" from node_modules: vite.config.js
 * aliases the bare specifier onto ./vendor, so the shipped runtime depends only
 * on the vendored, version-locked files committed to this repository.
 */
import { createRequire } from 'node:module';
import { copyFile, mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const FILES = [
  ['build/three.module.js', 'three/three.module.js'],
  ['build/three.core.js', 'three/three.core.js'],
  ['examples/jsm/controls/OrbitControls.js', 'three/addons/controls/OrbitControls.js'],
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/** Walks up from the resolved entry point until the package root is found. */
function findPackageRoot(fromFile) {
  let dir = dirname(fromFile);
  for (let i = 0; i < 6; i += 1) {
    const candidate = resolve(dir, 'package.json');
    if (existsSync(candidate)) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function existsSync(path) {
  try {
    return require('node:fs').existsSync(path);
  } catch {
    return false;
  }
}

async function main() {
  let threeDir;
  try {
    threeDir = findPackageRoot(require.resolve('three'));
  } catch {
    threeDir = null;
  }
  if (!threeDir) {
    console.warn('[vendor-sync] three is not installed yet - keeping the committed vendor/ tree.');
    return;
  }

  let pkg;
  try {
    pkg = JSON.parse(await readFile(resolve(threeDir, 'package.json'), 'utf8'));
  } catch {
    console.warn('[vendor-sync] unable to read three/package.json - keeping the committed vendor/ tree.');
    return;
  }

  const copied = [];
  for (const [from, to] of FILES) {
    const src = resolve(threeDir, from);
    const dest = resolve(root, 'vendor', to);
    if (!(await exists(src))) continue;
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(src, dest);
    copied.push(to);
  }

  const manifest = {
    package: 'three',
    version: pkg.version,
    license: pkg.license,
    files: copied.sort(),
  };
  await writeFile(resolve(root, 'vendor', 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`[vendor-sync] three@${pkg.version} -> vendor/ (${copied.length} files)`);
}

main().catch((err) => {
  console.warn(`[vendor-sync] skipped: ${err.message}`);
});
