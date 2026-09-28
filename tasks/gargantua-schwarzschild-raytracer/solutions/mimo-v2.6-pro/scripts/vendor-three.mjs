#!/usr/bin/env node
// 把 node_modules/three 中运行时实际导入的 ESM 构建与 addon 复制到 vendor/three/，
// 并把 addon 里的 bare `three` 导入改写为相对路径，保证运行时零外部依赖。
// 再生成：npm ci && npm run vendor
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url))); // solution/
const SRC = join(ROOT, 'node_modules', 'three');
const DST = join(ROOT, 'vendor', 'three');

// { 源路径（node_modules/three 内）, 目标路径（vendor/three 内） }；build/ 扁平化到 vendor/three/ 根
const BUILD_FILES = [
  { from: 'build/three.module.js', to: 'three.module.js' },
  { from: 'build/three.core.js', to: 'three.core.js' },
];
const ADDON_FILES = [
  'examples/jsm/controls/OrbitControls.js',
  'examples/jsm/postprocessing/EffectComposer.js',
  'examples/jsm/postprocessing/RenderPass.js',
  'examples/jsm/postprocessing/ShaderPass.js',
  'examples/jsm/postprocessing/UnrealBloomPass.js',
  'examples/jsm/postprocessing/Pass.js',
  'examples/jsm/postprocessing/MaskPass.js',
  'examples/jsm/shaders/CopyShader.js',
  'examples/jsm/shaders/LuminosityHighPassShader.js',
];

if (!existsSync(join(SRC, 'package.json'))) {
  console.error('找不到 node_modules/three，请先 npm install');
  process.exit(1);
}

const version = JSON.parse(readFileSync(join(SRC, 'package.json'), 'utf8')).version;
const copied = [];
const skipped = [];

function copyOne(relPath, rewrite, destPath = relPath) {
  const from = join(SRC, relPath);
  if (!existsSync(from)) {
    skipped.push(relPath);
    return;
  }
  const to = join(DST, destPath);
  mkdirSync(dirname(to), { recursive: true });
  let code = readFileSync(from, 'utf8');
  if (rewrite) {
    // bare `three` 导入 → 指向 vendor/three/three.module.js 的相对路径
    const rel = relative(dirname(to), join(DST, 'three.module.js')).split(sep).join('/');
    const spec = rel.startsWith('.') ? rel : `./${rel}`;
    code = code.replace(/from\s+(['"])three\1/g, `from '${spec}'`);
  }
  writeFileSync(to, code);
  copied.push(relPath);
}

for (const f of BUILD_FILES) copyOne(f.from, false, f.to);
copyOne('LICENSE', false);
for (const f of ADDON_FILES) copyOne(f, true);

// assert：vendored addon 中不得残留 bare `three` 导入
let failed = false;
for (const f of ADDON_FILES) {
  const p = join(DST, f);
  if (!existsSync(p)) continue;
  if (/from\s+(['"])three\1/.test(readFileSync(p, 'utf8'))) {
    console.error(`改写失败，仍含 bare 'three' 导入：${f}`);
    failed = true;
  }
}
if (!existsSync(join(DST, 'three.module.js'))) {
  console.error('缺少 vendor/three/three.module.js');
  failed = true;
}

const fileList = [...copied].sort().map((f) => `- \`${f}\``).join('\n');
writeFileSync(
  join(ROOT, 'vendor', 'README.md'),
  `# 本地 Three.js vendor

运行时实际导入的 Three.js ESM 构建与 addon，随源码提交，运行时零网络依赖。

- 上游版本：three@${version}
- 来源：https://www.npmjs.com/package/three （github.com/mrdoob/three.js）
- 许可证：MIT（见 \`three/LICENSE\`）
- 改写说明：\`examples/jsm/**\` 内 bare \`from 'three'\` 导入已改写为指向 \`three.module.js\` 的相对路径，其余内容未改动。
- 再生成：\`npm ci && npm run vendor\`

## 文件清单

${fileList}
`,
);

console.log(`three@${version} → vendor/three/`);
for (const f of copied) console.log(`  + ${f}`);
for (const f of skipped) console.log(`  ~ 跳过（上游不存在）：${f}`);
if (failed) process.exit(1);
console.log('assert 通过：无 bare three 导入残留');
