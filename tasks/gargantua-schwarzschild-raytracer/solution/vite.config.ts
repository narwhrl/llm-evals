import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const vendor = (p: string) =>
  fileURLToPath(new URL(`./vendor/three/${p}`, import.meta.url));

// Runtime imports of three resolve to the committed vendored ESM build,
// never to node_modules or a CDN.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'three/addons/controls/OrbitControls.js',
        replacement: vendor('addons/controls/OrbitControls.js'),
      },
      { find: 'three', replacement: vendor('three.module.js') },
    ],
  },
  build: { target: 'es2022', sourcemap: false },
});
