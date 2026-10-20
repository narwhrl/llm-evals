import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * The build has to work from a domain root and from a subdirectory, so the
 * base is left to the command line (`vite build --base=/gallery/x/`) and the
 * assets are emitted with relative URLs by default.
 */
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      three: path.resolve(import.meta.dirname, "./node_modules/three/build/three.module.js"),
    },
  },
  build: {
    target: "es2022",
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 3000,
  },
  server: {
    host: "127.0.0.1",
    port: 5184,
  },
  preview: {
    host: "127.0.0.1",
    port: 4184,
  },
});
