import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Icons + head links are generated from public/logo.svg (see pwa-assets.config.ts)
      pwaAssets: {
        config: true,
      },
      manifest: {
        name: 'Tabliczka mnożenia',
        short_name: 'Mnożenie',
        description: 'Nauka tabliczki mnożenia',
        lang: 'pl',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
      },
    }),
  ],
});
