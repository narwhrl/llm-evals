import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      three: fileURLToPath(new URL('./vendor/three/three.module.js', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
  },
});
