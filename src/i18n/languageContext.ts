import { createContext } from 'react';

import type { ITranslations, Language } from './translations';

export interface ILanguageContext {
  language: Language;
  t: ITranslations;
  changeLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<ILanguageContext | null>(null);
