import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 900,
  },
  server: {
    host: "127.0.0.1",
    port: 5179,
  },
  preview: {
    host: "127.0.0.1",
    port: 4179,
  },
});
