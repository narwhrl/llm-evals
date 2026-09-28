import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^three$/,
        replacement: fileURLToPath(new URL('./vendor/three.module.js', import.meta.url)),
      },
    ],
  },
});
