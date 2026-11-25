import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const vendor = (p) => fileURLToPath(new URL(`./vendor/three/${p}`, import.meta.url));

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      // Bare specifier `three` (used by app code and by the vendored addons
      // themselves) resolves to the vendored ESM build, never to node_modules.
      { find: /^three$/, replacement: vendor('build/three.module.js') },
      { find: /^three\/addons\/(.*)$/, replacement: vendor('examples/jsm/$1') },
    ],
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1600,
  },
});
