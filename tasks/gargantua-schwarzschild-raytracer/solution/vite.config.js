import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' 保证产物可由任意静态路径托管；gallery 构建时用 --base 覆盖。
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5177 },
  preview: { host: '127.0.0.1', port: 4177 },
  build: { target: 'es2020' },
});
