import { defineConfig } from 'vite';

// No hard-coded `base`: pass `--base=/sub/path/` on the CLI for subpath deploys.
// Runtime asset URLs are built from import.meta.env.BASE_URL.
export default defineConfig({
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1500,
  },
});
