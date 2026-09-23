import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'glsl-loader',
      transform(src, id) {
        if (id.endsWith('.glsl')) {
          return {
            code: `export default ${JSON.stringify(src)};`,
            map: null
          };
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@vendor': path.resolve(__dirname, 'vendor'),
      'three': path.resolve(__dirname, 'vendor/three.module.js'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
});
