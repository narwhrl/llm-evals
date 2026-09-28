import { defineConfig } from 'vite';

export default defineConfig({
  // 生产构建必须同时支持默认根路径与子路径（vite build --base=/xxx/ --outDir=yyy）
  base: process.env.VITE_BASE ?? '/',
  build: {
    outDir: process.env.VITE_OUT_DIR ?? 'dist',
    emptyOutDir: true,
    target: 'es2022',
    assetsInlineLimit: 0,
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
  },
  server: { host: true },
  preview: { host: true },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
} as never);
