import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config';

// Matches the logo's own background, so padded icons don't get a white frame
const LOGO_BACKGROUND = '#87a6c8';

export default defineConfig({
  preset: {
    ...minimal2023Preset,
    transparent: {
      ...minimal2023Preset.transparent,
      padding: 0,
    },
    // Small padding keeps the × inside Android's round/squircle masks
    maskable: {
      ...minimal2023Preset.maskable,
      padding: 0.1,
      resizeOptions: { background: LOGO_BACKGROUND },
    },
    apple: {
      ...minimal2023Preset.apple,
      padding: 0,
      resizeOptions: { background: LOGO_BACKGROUND },
    },
  },
  images: ['public/logo.png'],
});
