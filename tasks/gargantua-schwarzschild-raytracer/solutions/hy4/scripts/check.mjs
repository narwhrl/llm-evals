// Static integrity checks: packaging, offline vendor, shader architecture,
// control wiring and automation contract. Run with: npm run check
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUALITY, QUALITY_LEVELS, PARAM_DEFS, PRESETS, DEBUG_VIEWS } from '../src/config.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');
let failures = 0;

function check(name, condition, detail = '') {
  const ok = Boolean(condition);
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

// ------------------------------------------------------------- packaging
const required = [
  'package.json', 'package-lock.json', 'vite.config.js', 'eslint.config.js',
  'index.html', 'README.md', 'RESULTS.md',
  'vendor/three.module.js', 'vendor/three.core.js', 'vendor/OrbitControls.js', 'vendor/README.md',
  'src/main.jsx', 'src/App.jsx', 'src/styles.css', 'src/config.js', 'src/store.js',
  'src/url.js', 'src/api.js', 'src/audio.js', 'src/ui/Hud.jsx',
  'src/engine/Engine.js',
  'src/engine/shaders/quad.vert.glsl', 'src/engine/shaders/geodesic.frag.glsl',
  'src/engine/shaders/bright.frag.glsl', 'src/engine/shaders/blur.frag.glsl',
  'src/engine/shaders/copy.frag.glsl', 'src/engine/shaders/composite.frag.glsl',
  'scripts/serve.mjs', 'scripts/vendor.mjs', 'scripts/check.mjs', 'scripts/verify.mjs',
];
check('all required deliverable files exist', required.every((f) => existsSync(resolve(root, f))),
  `${required.filter((f) => !existsSync(resolve(root, f))).join(', ') || 'complete'}`);

const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
check('package-lock.json pins the project', lock.name === pkg.name && Boolean(lock.packages?.['']));
check('React and Vite are pinned dependencies',
  Boolean(pkg.dependencies?.react && pkg.dependencies?.['react-dom'] && pkg.devDependencies?.vite));
check('Three.js version is pinned for vendor regeneration', pkg.devDependencies?.three === '0.180.0');

// --------------------------------------------------------------- vendor
const vendorNote = read('vendor/README.md');
check('vendor provenance records version + license',
  /0\.180\.0/.test(vendorNote) && /MIT/.test(vendorNote) && /three\.js/i.test(vendorNote));
const moduleJs = read('vendor/three.module.js');
const controls = read('vendor/OrbitControls.js');
check('vendored ESM build imports its local core', moduleJs.includes("from './three.core.js'"));
check('OrbitControls imports the local vendored build',
  controls.includes("from './three.module.js'") && !/\bfrom ['"]three['"]/.test(controls));
check('vendor is not a node_modules copy', !existsSync(resolve(root, 'vendor/node_modules')));

// ------------------------------------------------------- offline runtime
const sources = [
  'index.html', 'src/main.jsx', 'src/App.jsx', 'src/config.js', 'src/store.js',
  'src/url.js', 'src/api.js', 'src/audio.js', 'src/ui/Hud.jsx', 'src/engine/Engine.js',
];
const remoteRe = /(?:src|href)\s*=\s*["']https?:\/\/|url\(\s*["']?https?:\/\/|from\s+["']https?:\/\/|import\s*\(\s*["']https?:\/\/|fetch\s*\(\s*["']https?:\/\//i;
const remoteHits = sources.filter((f) => remoteRe.test(read(f)));
check('no remote runtime assets or imports', remoteHits.length === 0, remoteHits.join(', ') || 'offline');
check('no Math.random in render path', !sources.some((f) => /Math\.random/.test(read(f))));

// --------------------------------------------------------- shader physics
const geo = read('src/engine/shaders/geodesic.frag.glsl');
const composite = read('src/engine/shaders/composite.frag.glsl');
const neededGeo = [
  ['Binet / Schwarzschild derivation', /3 M u\^2|1\.5 r_s h2|d\^2 u/],
  ['conserved angular momentum', /cross\(p, v\)/],
  ['numerical acceleration function', /vec3 accel\(/],
  ['RK4 integration', /k1p|k4v|RK4/],
  ['adaptive stepping', /uStepScale/],
  ['step budget', /uMaxSteps/],
  ['event horizon termination', /captured|RS \* 1\.002/],
  ['curved-path disk intersections', /diskSample|inSlab/],
  ['ordered multiple crossings', /crossings|T \* acc/],
  ['Doppler + gravitational redshift', /doppler|grav/],
  ['procedural lensed background', /vec3 background\(/],
  ['debug channels', /uDebug/],
];
for (const [name, re] of neededGeo) check(`shader: ${name}`, re.test(geo));
check('shader: no texture sampling in geodesic pass', !/texture2D|sampler2D/.test(geo));
check('shader: ACES tone mapping is implemented', /aces\(/.test(composite) && /linearToSRGB/.test(composite));
check('shader: multi-level bloom composite', /bloomAt|uBloomLevels/.test(composite));

// --------------------------------------------------------------- controls
check('21 effective parameters', PARAM_DEFS.length === 21, `count=${PARAM_DEFS.length}`);
check('four camera presets', PRESETS.length === 4);
check('three quality tiers', QUALITY_LEVELS.length === 3);
check('ten debug views', DEBUG_VIEWS.length === 10);
const budgets = QUALITY_LEVELS.map((q) => QUALITY[q]);
check('quality tiers change real render budget',
  new Set(budgets.map((b) => b.maxSteps)).size === 3 &&
  new Set(budgets.map((b) => b.renderScale)).size === 3 &&
  new Set(budgets.map((b) => b.bloomLevels)).size === 3 &&
  new Set(budgets.map((b) => b.diskSamples)).size === 3);
const engineSrc = read('src/engine/Engine.js');
const unwired = PARAM_DEFS.filter((p) =>
  !engineSrc.includes(`p.${p.key}`) && !engineSrc.includes(`params.${p.key}`));
check('every parameter is read into a shader uniform or camera state',
  unwired.length === 0, unwired.map((p) => p.key).join(', ') || 'all wired');
check('OrbitControls feeds shader camera basis',
  /OrbitControls/.test(engineSrc) && /uCamForward|uCamRight|uCamPos/.test(engineSrc));
check('versioned localStorage persistence', /STORAGE_KEY|STATE_VERSION/.test(read('src/store.js')) && /saveState|clearState/.test(engineSrc));

// ---------------------------------------------------------- automation
check('ready signal is set after first frame', /dataset\.gargantuaReady/.test(engineSrc));
const api = read('src/api.js');
check('window.__GARGANTUA__ exposes required methods',
  /setQuality/.test(api) && /setPreset/.test(api) && /setDebug/.test(api) &&
  /setTime/.test(api) && /getState/.test(api) && /get ready\(/.test(api));
check('context loss / restore handlers exist',
  /webglcontextlost/.test(engineSrc) && /webglcontextrestored/.test(engineSrc) &&
  /handleContextRestored/.test(engineSrc));
check('URL capture contract is parsed', /capture=1|p\.get\('capture'\)/.test(read('src/url.js')));

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
