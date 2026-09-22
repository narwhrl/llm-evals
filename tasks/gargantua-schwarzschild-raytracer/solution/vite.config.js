import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  base: './',
  resolve: { alias: { three: fileURLToPath(new URL('./vendor/three/three.module.js', import.meta.url)) } },
  build: { target: 'es2022' },
});
