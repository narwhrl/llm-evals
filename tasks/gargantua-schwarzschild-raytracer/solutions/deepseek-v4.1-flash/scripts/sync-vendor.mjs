/**
 * Copies the Three.js ESM build graph that the app actually imports at runtime from
 * node_modules into the committed vendor/ tree.
 *
 * The graph is discovered by following relative `from './x.js'` imports, so this works for both
 * layouts three.js has shipped: a single self-contained `build/three.module.js`, and the newer
 * split layout where `build/three.module.js` re-exports `./three.core.js`.
 *
 * Usage: npm run vendor
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, posix, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const nodeModules = join(root, 'node_modules', 'three')
const vendorRoot = join(root, 'vendor', 'three')

const ENTRY = 'build/three.module.js'
const ADDONS = ['examples/jsm/controls/OrbitControls.js']

/** Relative `from '...'` / `import '...'` specifiers inside an ESM file. */
function relativeImports(source) {
  const found = new Set()
  const patterns = [
    /\bfrom\s*['"](\.[^'"]*)['"]/g,
    /\bimport\s*\(\s*['"](\.[^'"]*)['"]\s*\)/g,
    /\bimport\s*['"](\.[^'"]*)['"]/g,
  ]
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) found.add(match[1])
  }
  return [...found]
}

async function collect(entryRel, seen = new Set()) {
  if (seen.has(entryRel)) return seen
  const abs = join(nodeModules, entryRel)
  if (!existsSync(abs)) throw new Error(`three.js source file missing: ${entryRel}`)
  seen.add(entryRel)
  const source = await readFile(abs, 'utf8')
  for (const spec of relativeImports(source)) {
    const next = posix.normalize(posix.join(posix.dirname(entryRel), spec))
    await collect(next, seen)
  }
  return seen
}

/** Upstream `three/` path -> vendor path. Always POSIX so the manifest is platform-independent. */
function vendorPath(upstreamRel) {
  return upstreamRel.replace(/^build\//, '').replace(/^examples\/jsm\//, 'addons/')
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

const pkg = JSON.parse(await readFile(join(nodeModules, 'package.json'), 'utf8'))

const files = await collect(ENTRY)
for (const addon of ADDONS) files.add(addon)

await rm(join(root, 'vendor'), { recursive: true, force: true })

const manifest = []
for (const rel of [...files].sort()) {
  const source = await readFile(join(nodeModules, rel))
  const relativeVendorPath = vendorPath(rel)
  const target = join(vendorRoot, relativeVendorPath)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, source)
  manifest.push({
    path: posix.join('vendor/three', relativeVendorPath),
    upstream: `three/${rel}`,
    bytes: source.length,
    sha256: sha256(source),
  })
}

const licence = await readFile(join(nodeModules, 'LICENSE'))
await writeFile(join(root, 'vendor', 'LICENSE.three'), licence)

const rows = manifest
  .map((m) => `| \`${m.path}\` | \`${m.upstream}\` | ${m.bytes} | \`${m.sha256}\` |`)
  .join('\n')

await writeFile(
  join(root, 'vendor', 'README.md'),
  `# Vendored Three.js

This directory is the **only** Three.js source consumed at runtime. Nothing here is fetched from a
CDN, and \`node_modules/\` is never committed or served.

- Upstream package: [\`three\`](https://www.npmjs.com/package/three) — version **${pkg.version}**
- Upstream repository: <https://github.com/mrdoob/three.js>
- License: MIT (full text in \`LICENSE.three\`)
- Source of these files: the tarball published to the npm registry for \`three@${pkg.version}\`,
  installed as a \`devDependency\` purely so this directory can be regenerated.

\`\`\`bash
npm install        # installs three@${pkg.version} into node_modules (build-time only)
npm run vendor     # rewrites vendor/ from that install and regenerates this table
\`\`\`

\`build/three.module.js\` re-exports from \`three.core.js\`, so the whole relative import graph is
copied rather than a single file. \`addons/controls/OrbitControls.js\` is the one addon the runtime
imports; Vite rewrites its bare \`three\` specifier to \`vendor/three/three.module.js\` (see
\`vite.config.js\`), so the shipped bundle contains no bare-module imports and no \`node_modules\` path.

## Files

| Vendor path | Upstream path | Bytes | SHA-256 |
|---|---|---|---|
${rows}
`,
)

console.log(`vendored three@${pkg.version}: ${manifest.length} file(s) + LICENSE`)
for (const m of manifest) console.log(`  ${m.path}  (${m.bytes} B)`)
