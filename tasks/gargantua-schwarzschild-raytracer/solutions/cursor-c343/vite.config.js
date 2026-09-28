import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Three.js is not an npm dependency: every `three` / `three/addons/*` import
// (including the bare `'three'` import inside OrbitControls) resolves to the
// vendored ESM build, so a missing vendor file fails the build instead of
// silently falling back to node_modules or a CDN.
const vendorThreeModule = fileURLToPath(new URL('./vendor/three/build/three.module.js', import.meta.url));
const vendorThreeAddons = fileURLToPath(new URL('./vendor/three/examples/jsm/', import.meta.url));

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^three$/, replacement: vendorThreeModule },
      { find: /^three\/addons\/(.*)$/, replacement: `${vendorThreeAddons}$1` },
    ],
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1600,
  },
});
