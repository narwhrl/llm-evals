import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = readdirSync(join(root, 'src')).filter((f) => f.endsWith('.js'));
const configs = ['vite.config.js', 'scripts/check.mjs'];

for (const file of [...files.map((f) => join('src', f)), ...configs]) {
  execFileSync(process.execPath, ['--check', join(root, file)], { stdio: 'inherit' });
}
console.log(`syntax check passed: ${files.length + configs.length} files`);
