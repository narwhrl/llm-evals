import { defineConfig } from "vite";

// base 使用相对路径：本地 `npm run dev` / `npm run preview` 直接可用，
// 同时也兼容外部构建流程传入的绝对 `--base=/<task>/<model>/` 覆盖。
export default defineConfig({
  base: "./",
  build: {
    target: "es2020",
    outDir: "dist",
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2048,
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});
