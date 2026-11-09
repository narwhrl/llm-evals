import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: "./",
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096,
  },
}));
