import { useState } from 'react';

import { useTranslation } from '../i18n';
import { pickRandom } from './helpers';

// Every image dropped into ./cats joins the draw
const CAT_GIFS = Object.values(
  import.meta.glob<string>('./cats/*.webp', { eager: true, import: 'default' }),
);

export const useCelebration = () => {
  const { t } = useTranslation();
  // Drawn once per mount, so the cat doesn't change on re-render
  const [gif] = useState(() => pickRandom(CAT_GIFS));

  return { gif, t };
};
