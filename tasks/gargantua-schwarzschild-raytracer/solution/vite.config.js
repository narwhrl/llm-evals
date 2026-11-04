import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` and `build.outDir` are intentionally unset: `vite build --base ... --outDir ...`
// (CLI flags) must be honoured verbatim, including for offline static previews.
export default defineConfig({
  plugins: [react()],
});
