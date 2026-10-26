import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    // Keep every emitted chunk below esbuild's 1 MiB temp-file handoff
    // threshold, and split the rarely-changing three.js runtime into its own
    // long-lived chunks for better caching.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules/three')) return undefined;
          if (id.includes('three.core.js')) return 'three-core';
          if (id.includes('/examples/jsm/')) return 'three-addons';
          return 'three';
        },
      },
    },
  },
});
