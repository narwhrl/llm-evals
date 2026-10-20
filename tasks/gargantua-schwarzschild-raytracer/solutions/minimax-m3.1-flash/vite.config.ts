import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Three.js is vendored, not resolved from node_modules: the built site has to
 * run from a static server with nothing but its own files. The aliases send
 * every `three` import — including the one inside the vendored OrbitControls
 * addon — to the vendored ESM build.
 */
const vendor = path.resolve(import.meta.dirname, "./vendor");

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^three\/examples\/(.*)$/,
        replacement: path.resolve(vendor, "three/examples/$1"),
      },
      {
        find: /^three$/,
        replacement: path.resolve(vendor, "three.module.js"),
      },
    ],
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 3000,
    assetsInlineLimit: 0,
  },
  server: {
    host: "127.0.0.1",
    port: 5183,
  },
  preview: {
    host: "127.0.0.1",
    port: 4183,
  },
});
