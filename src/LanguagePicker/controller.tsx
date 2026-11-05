import { useCallback, useEffect, useRef, useState } from 'react';

import {
  FLAGS,
  LANGUAGE_NAMES,
  LANGUAGES,
  useTranslation,
  type Language,
} from '../i18n';

const OPTIONS = Object.values(LANGUAGES);

export const useLanguagePicker = () => {
  const { language, t, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen(open => !open), []);

  const choose = useCallback((next: Language) => {
    changeLanguage(next);
    setIsOpen(false);
  }, [changeLanguage]);

  // While open, a tap outside or Escape closes the menu
  useEffect(() => {
    if (!isOpen) return;

    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const currentFlag = FLAGS[language];
  const options = OPTIONS.map(option => ({
    language: option,
    flag: FLAGS[option],
    name: LANGUAGE_NAMES[option],
    isActive: option === language,
  }));

  return {
    rootRef,
    isOpen,
    currentFlag,
    options,
    label: t.languagePicker,
    toggle,
    choose,
  };
};
