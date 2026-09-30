/// <reference types="vitest/config" />
import { defineConfig } from "vite";

// `--base` and `--outDir` passed on the command line override these defaults.
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    target: "es2022",
    chunkSizeWarningLimit: 1200,
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
