import { defineConfig } from "vite";

export default defineConfig({
  // relative asset URLs so the built page works when served from any sub-path
  base: "./",
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 1500,
  },
});
