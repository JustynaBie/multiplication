export const LANGUAGES = {
  pl: 'pl',
  en: 'en',
  es: 'es',
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

export interface ITranslations {
  languagePicker: string;
  chooseTitle: string;
  chooseHint: string;
  matchMode: string;
  pickMode: string;
  writeMode: string;
  back: string;
  backToStart: string;
  check: string;
  next: string;
  finish: string;
  result: string;
  bravo: string;
  allDone: string;
  catAlt: string;
  progressTitle: string;
  progressLeft: (count: number) => string;
  level: (level: number) => string;
  score: (correct: number, total: number) => string;
}

// Polish has three plural forms: 1 działanie, 2–4 działania, 5+ działań
const POLISH_PLURAL = new Intl.PluralRules('pl');
const POLISH_EQUATIONS: Record<string, string> = {
  one: 'działanie',
  few: 'działania',
  many: 'działań',
};

export const TRANSLATIONS: Record<Language, ITranslations> = {
  pl: {
    languagePicker: 'Język',
    chooseTitle: 'Wybierz liczby do ćwiczenia',
    chooseHint: 'Możesz wybrać jedną lub kilka liczb!',
    matchMode: 'Dopasuj',
    pickMode: 'Wybierz',
    writeMode: 'Wpisz',
    back: 'Wróć',
    backToStart: 'Wróć do startu',
    check: 'Sprawdź',
    next: 'Dalej →',
    finish: 'Koniec',
    result: 'Wynik',
    bravo: 'Brawo!',
    allDone: 'Wszystkie działania zrobione',
    catAlt: 'Wesoły kot',
    progressTitle: 'Opanowane działania',
    progressLeft: count => {
      const equations = POLISH_EQUATIONS[POLISH_PLURAL.select(count)];

      return `Jeszcze ${count} ${equations} do opanowania!`;
    },
    level: level => `Poziom ${level}`,
    score: (correct, total) => `Dobrze: ${correct} / ${total}`,
  },
  en: {
    languagePicker: 'Language',
    chooseTitle: 'Choose the times tables you want to practise!',
    chooseHint: 'You can pick one or more.',
    matchMode: 'Match',
    pickMode: 'Pick',
    writeMode: 'Type',
    back: 'Back',
    backToStart: 'Back to start',
    check: 'Check',
    next: 'Next →',
    finish: 'Finish',
    result: 'Result',
    bravo: 'Well done!',
    allDone: 'All equations done',
    catAlt: 'Happy cat',
    progressTitle: 'Mastered equations',
    progressLeft: count => count === 1
      ? '1 more equation to master!'
      : `${count} more equations to master!`,
    level: level => `Level ${level}`,
    score: (correct, total) => `Correct: ${correct} / ${total}`,
  },
  es: {
    languagePicker: 'Idioma',
    chooseTitle: '¡Elige las tablas que quieres practicar!',
    chooseHint: 'Puedes elegir una o varias.',
    matchMode: 'Une',
    pickMode: 'Elige',
    writeMode: 'Escribe',
    back: 'Volver',
    backToStart: 'Volver al inicio',
    check: 'Comprobar',
    next: 'Siguiente →',
    finish: 'Terminar',
    result: 'Resultado',
    bravo: '¡Bravo!',
    allDone: '¡Lo has conseguido!',
    catAlt: 'Gato feliz',
    progressTitle: 'Operaciones aprendidas',
    progressLeft: count => count === 1
      ? '¡Solo te queda 1 operación por aprender!'
      : `¡Solo te quedan ${count} operaciones por aprender!`,
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
