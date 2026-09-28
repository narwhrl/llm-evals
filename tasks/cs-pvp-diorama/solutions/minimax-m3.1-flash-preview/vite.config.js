import { defineConfig } from 'vite';

// The gallery build appends `--base=<prefix>/ --outDir=<path> --emptyOutDir`,
// so the default has to be a relative base that also works from a plain
// `vite preview` on the machine root.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1200,
  },
  server: {
    host: '127.0.0.1',
    port: 5180,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4188,
    strictPort: true,
  },
});
