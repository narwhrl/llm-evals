import { fileURLToPath, URL } from "node:url";
import { mergeConfig } from "vite";
import appConfig from "../vite.config.ts";

export default mergeConfig(appConfig, {
  build: {
    rollupOptions: {
      input: fileURLToPath(new URL("./fixture.html", import.meta.url)),
    },
  },
});
