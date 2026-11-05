export const LANGUAGES = {
  pl: 'pl',
  en: 'en',
  es: 'es',
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

export interface ITranslations {
  languagePicker: string;
  matchMode: string;
  pickMode: string;
  writeMode: string;
  back: string;
  backToStart: string;
  check: string;
  next: string;
  finish: string;
  result: string;
  tryAgain: string;
  bravo: string;
  allDone: string;
  catAlt: string;
  level: (level: number) => string;
  score: (correct: number, total: number) => string;
}

export const TRANSLATIONS: Record<Language, ITranslations> = {
  pl: {
    languagePicker: 'Język',
    matchMode: 'Łączenie działań z wynikami',
    pickMode: 'Wybieranie dobrej odpowiedzi',
    writeMode: 'Wpisywanie wyników',
    back: 'Wróć',
    backToStart: 'Wróć do startu',
    check: 'Sprawdź',
    next: 'Dalej →',
    finish: 'Koniec',
    result: 'Wynik',
    tryAgain: 'Spróbuj jeszcze raz!',
    bravo: 'Brawo!',
    allDone: 'Wszystkie działania zrobione',
    catAlt: 'Wesoły kot',
    level: level => `Poziom ${level}`,
    score: (correct, total) => `Dobrze: ${correct} / ${total}`,
  },
  en: {
    languagePicker: 'Language',
    matchMode: 'Match equations with results',
    pickMode: 'Pick the right answer',
    writeMode: 'Type the results',
    back: 'Back',
    backToStart: 'Back to start',
    check: 'Check',
    next: 'Next →',
    finish: 'Finish',
    result: 'Result',
    tryAgain: 'Try again!',
    bravo: 'Well done!',
    allDone: 'All equations done',
    catAlt: 'Happy cat',
    level: level => `Level ${level}`,
    score: (correct, total) => `Correct: ${correct} / ${total}`,
  },
  es: {
    languagePicker: 'Idioma',
    matchMode: 'Une las operaciones con sus resultados',
    pickMode: 'Elige la respuesta correcta',
    writeMode: 'Escribe los resultados',
    back: 'Volver',
    backToStart: 'Volver al inicio',
    check: 'Comprobar',
    next: 'Siguiente →',
    finish: 'Terminar',
    result: 'Resultado',
    tryAgain: '¡Inténtalo otra vez!',
    bravo: '¡Bravo!',
    allDone: '¡Lo has conseguido!',
    catAlt: 'Gato feliz',
    level: level => `Nivel ${level}`,
    score: (correct, total) => `Correctas: ${correct} / ${total}`,
  },
};

// Each language is named in itself, so it's recognisable whichever one is active
export const LANGUAGE_NAMES: Record<Language, string> = {
  pl: 'Polski',
  en: 'English',
  es: 'Español',
};

export const FLAGS: Record<Language, string> = {
  pl: '🇵🇱',
  en: '🇬🇧',
  es: '🇪🇸',
};
