import { defineConfig } from "vite";

// `base: "./"` keeps a local dist preview working. Gallery hosting overrides
// this with `vite build --base=/<task>/<model>/ --outDir=...`.
export default defineConfig({
  base: "./",
  build: {
    target: "es2022",
    assetsDir: "assets",
  },
});
