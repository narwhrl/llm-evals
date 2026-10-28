import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { target: "es2020" },
  // Editor temp artefacts inside the source tree crash chokidar on Windows (EBUSY).
  server: { watch: { ignored: ["**/.*tmpdir**", "**/*.tmp"] } },
});
