import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      // Browser profiles hold locked files on Windows and are not application sources.
      ignored: ['**/.browsers/**', '**/evidence/**', '**/.npm-cache/**'],
    },
  },
});
