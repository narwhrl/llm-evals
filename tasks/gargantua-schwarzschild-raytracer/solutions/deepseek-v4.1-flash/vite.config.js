import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Three.js 只从 vendor/ 目录解析，运行时与构建时都不依赖 node_modules。
const vendorThree = fileURLToPath(new URL('./vendor/three.module.js', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^three$/, replacement: vendorThree }],
  },
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
  },
});
