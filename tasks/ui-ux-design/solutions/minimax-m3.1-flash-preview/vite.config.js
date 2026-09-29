import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 画廊构建会向 `npm run build` 追加 --base / --outDir / --emptyOutDir，
// 三者都是 Vite 的原生 CLI 参数，这里不与它们冲突。
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2019",
    sourcemap: false,
    chunkSizeWarningLimit: 700,
  },
});
