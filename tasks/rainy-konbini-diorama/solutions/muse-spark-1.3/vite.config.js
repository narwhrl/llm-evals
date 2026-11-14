import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: { outDir: "dist", emptyOutDir: true, chunkSizeWarningLimit: 1200 },
  server: { port: 5173, strictPort: false },
  preview: { port: 4173, strictPort: true },
});
