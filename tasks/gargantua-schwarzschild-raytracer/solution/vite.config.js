// Vite config:
// - alias the `three` package to the vendored module that ships with this
//   repository. We never resolve `three` from `node_modules/three` at runtime;
//   the alias points directly at the committed vendor file so the static
//   preview is self-contained and offline.
// - short alias `@` -> `./src` (optional, used by App / main).
// - dev server defaults: 127.0.0.1:5173, strict port, so the parent agent can
//   launch predictable URLs.

import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => {
  const isPreview = command === 'preview';
  const port = isPreview ? 4173 : 5173;
  const host = '127.0.0.1';
  return {
    root: __dirname,
    publicDir: false,
    esbuild: {
      // Automatic JSX runtime: <Foo/> compiles to imports from the
      // configured source.  Avoids the legacy "React must be in scope"
      // hard-error that occurs when the runtime defaults to classic.
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
    server: {
      host,
      port,
      strictPort: true,
    },
    preview: {
      host,
      port,
      strictPort: true,
    },
    resolve: {
      alias: {
        three: path.resolve(__dirname, 'vendor/three/three.module.js'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      target: 'es2020',
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      sourcemap: false,
    },
  };
});
