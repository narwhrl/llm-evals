import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

// The runtime imports Three.js exclusively from the vendored ESM build that is
// committed inside this candidate directory (see vendor/README.md). Nothing is
// resolved out of node_modules at run time.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^three$/, replacement: resolve(here, 'vendor/three/three.module.js') },
      { find: /^three\/addons\//, replacement: resolve(here, 'vendor/three/addons/') + '/' },
    ],
  },
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
