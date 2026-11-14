import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './'：构建产物可用任意子路径直接打开（file 协议或子目录部署均可）
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
