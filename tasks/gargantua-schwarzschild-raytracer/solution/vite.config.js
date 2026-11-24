import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const vendorThreeEntry = path.resolve(__dirname, 'vendor/three/three.module.js');

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      three: vendorThreeEntry,
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': [vendorThreeEntry],
        },
      },
    },
  },
});
