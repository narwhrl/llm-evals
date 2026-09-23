import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Vite resolves the bare 'three' specifier to our vendored copy.
// We use a relative path inside src so the SAME path is consumed in
// dev and the built bundle, and so that "three" never resolves to a
// package on disk (no node_modules entry needed).
export default defineConfig({
  root: __dirname,
  publicDir: path.resolve(__dirname, 'public'),
  base: './',
  resolve: {
    alias: [
      { find: /^three$/, replacement: path.resolve(__dirname, 'src/vendor/three.js') },
      { find: /^three\/addons\/(.*)$/, replacement: path.resolve(__dirname, 'src/vendor/addons/$1') }
    ]
  },
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 4173
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false
  },
  plugins: [react()]
});