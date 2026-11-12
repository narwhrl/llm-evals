import { defineConfig } from "vite";

// Relative base keeps the build portable; the CLI --base flag overrides it for sub-path deploys.
export default defineConfig({
  base: "./",
  build: { target: "es2022", chunkSizeWarningLimit: 1200 },
});
