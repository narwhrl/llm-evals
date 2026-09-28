import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// All runtime three.js imports resolve to the locally vendored ESM build in
// vendor/, so neither source code nor addons ever load three from node_modules.
const vendoredThree = fileURLToPath(new URL('./vendor/three.module.js', import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^three$/, replacement: vendoredThree }],
  },
  optimizeDeps: {
    exclude: ['three'],
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600,
  },
});
