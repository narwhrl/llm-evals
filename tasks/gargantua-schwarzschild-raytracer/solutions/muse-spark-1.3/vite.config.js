import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  build: { outDir: 'dist', target: 'es2020' },
  plugins: [react()],
  server: { port: 5173, strictPort: true },
});
