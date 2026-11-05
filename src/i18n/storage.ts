import { LANGUAGES, type Language } from './translations';

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE: Language = LANGUAGES.en;

const checkLanguage = (value: unknown): value is Language =>
  Object.values(LANGUAGES).includes(value as Language);

const readSaved = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

// Saved choice first, then the device language, then English
export const getInitialLanguage = (): Language => {
  const saved = readSaved();
  const device = navigator.language.slice(0, 2);

  if (checkLanguage(saved)) return saved;
  if (checkLanguage(device)) return device;

  return DEFAULT_LANGUAGE;
};

// Storage can be blocked (private mode); the app then just forgets the choice
export const saveLanguage = (language: Language) => {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // ignore
  }
};
