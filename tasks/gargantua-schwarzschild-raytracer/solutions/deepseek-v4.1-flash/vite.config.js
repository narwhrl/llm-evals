import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const vendorThree = fileURLToPath(new URL('./vendor/three', import.meta.url))

// Three.js is consumed from the committed local vendor/ tree, never from node_modules and
// never from a CDN. The two aliases below are the single place that decides which physical
// files the bundler reads, so `vendor/` is provably what ships.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^three\/addons\/(.*)$/, replacement: `${vendorThree}/addons/$1` },
      { find: /^three$/, replacement: `${vendorThree}/three.module.js` },
    ],
  },
  optimizeDeps: {
    exclude: ['three'],
  },
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 2048,
  },
})
