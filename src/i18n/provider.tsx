import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { LanguageContext } from './languageContext';
import { getInitialLanguage, saveLanguage } from './storage';
import { TRANSLATIONS, type Language } from './translations';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  const changeLanguage = useCallback((next: Language) => {
    setLanguage(next);
    saveLanguage(next);
  }, []);

  // Keeps screen readers and the browser's spellcheck in the chosen language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({ language, t: TRANSLATIONS[language], changeLanguage }),
    [language, changeLanguage],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
};
