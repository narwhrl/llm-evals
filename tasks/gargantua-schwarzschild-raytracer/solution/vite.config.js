import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Three.js is vendored locally: the app must import the files in vendor/ at
// runtime, not node_modules or a CDN. Regex aliases are exact so that
// 'three/addons/...' is not swallowed by the bare 'three' alias.
const vendor = (file) => fileURLToPath(new URL(`./vendor/${file}`, import.meta.url));

export default defineConfig({
  // Relative base keeps a plain static server working at any sub-path; the
  // gallery passes an absolute --base at build time, which overrides this.
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^three\/addons\/controls\/OrbitControls\.js$/, replacement: vendor('OrbitControls.js') },
      { find: /^three$/, replacement: vendor('three.module.js') },
    ],
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
