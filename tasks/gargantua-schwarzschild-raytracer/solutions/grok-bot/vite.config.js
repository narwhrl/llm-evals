import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vendorThree = path.resolve(__dirname, 'vendor/three.module.js');
const vendorOrbit = path.resolve(__dirname, 'vendor/addons/controls/OrbitControls.js');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^three\/addons\/controls\/OrbitControls\.js$/,
        replacement: vendorOrbit,
      },
      {
        find: /^three$/,
        replacement: vendorThree,
      },
    ],
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
  build: {
    target: 'es2020',
    sourcemap: true,
  },
});
