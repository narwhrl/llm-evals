import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Runtime must resolve the bare specifier `three` to the locally vendored ESM
// build (see vendor/README.md) so no network copy of Three.js is ever loaded.
const vendoredThree = fileURLToPath(
  new URL('./vendor/three/three.module.js', import.meta.url),
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: /^three$/, replacement: vendoredThree }],
  },
});
