import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The application never imports from node_modules/three at runtime: the aliases
// below redirect every `three` / `three/addons/...` specifier to the pinned ESM
// build that is committed under solution/vendor/. See vendor/README.md.
const vendorThree = fileURLToPath(new URL('./vendor/three/build/three.module.js', import.meta.url))
const vendorAddonsDir = fileURLToPath(new URL('./vendor/three/examples/jsm/', import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: [
      { find: /^three$/, replacement: vendorThree },
      { find: /^three\/addons\/(.*)$/, replacement: vendorAddonsDir + '$1' },
    ],
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 2048,
  },
})
