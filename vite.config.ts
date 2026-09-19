import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the initial bundle small; heavy modals are lazy-loaded from PortfolioSection
    chunkSizeWarningLimit: 600,
  },
});
