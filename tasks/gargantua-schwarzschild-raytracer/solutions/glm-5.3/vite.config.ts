import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Runtime Three.js comes exclusively from the committed vendor/ tree (see
// scripts/vendor.mjs). The alias maps the bare specifier "three" (and its
// addon subpaths) onto those local files so no code is ever fetched or
// bundled from node_modules at build or run time.
const vendorRoot = new URL("./vendor/three/", import.meta.url);
const threeModule = fileURLToPath(new URL("three.module.js", vendorRoot));
const addonsPattern = /^three\/addons\/(.*)$/;
const addonsRoot = fileURLToPath(new URL("addons/", vendorRoot));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: addonsPattern, replacement: `${addonsRoot}$1` },
      { find: /^three$/, replacement: threeModule },
    ],
  },
  build: {
    target: "es2022",
  },
});
