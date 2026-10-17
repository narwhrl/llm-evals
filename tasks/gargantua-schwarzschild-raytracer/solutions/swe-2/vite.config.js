import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // vendored Three.js ESM build (see vendor/README.md)
      { find: /^three\/addons\//, replacement: `${resolve(root, 'vendor/three/addons')}/` },
      { find: /^three$/, replacement: resolve(root, 'vendor/three/three.module.js') },
    ],
  },
  build: {
    // the vendored three.core.js chunk is intentionally large
    chunkSizeWarningLimit: 2048,
  },
});
