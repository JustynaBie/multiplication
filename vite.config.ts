import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Icons + head links are generated from public/logo.png (see pwa-assets.config.ts)
      pwaAssets: {
        config: true,
      },
      // Cat animations and the font are precached too, so everything also works offline
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
      manifest: {
        name: 'Multiply',
        short_name: 'Multiply',
        description: 'Nauka tabliczki mnożenia',
        lang: 'pl',
        theme_color: '#a9c7e8',
        background_color: '#f7f8f6',
        display: 'standalone',
        orientation: 'portrait',
      },
    }),
  ],
});
