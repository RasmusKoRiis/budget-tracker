// vite.config.ts (update to include plugin)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/budget-tracker/',    // ensures assets load correctly from GitHub Pages
  plugins: [react()],
  server: { open: true },
  build: { outDir: 'dist' }
});