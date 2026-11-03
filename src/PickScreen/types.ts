import type { IQuizQuestion } from '../quiz';

export interface IPickScreenProps {
  numbers: number[];
  onExit: () => void;
}

export interface IQuestion extends IQuizQuestion {
  options: number[];
}

export type OptionState = 'idle' | 'correct' | 'wrong';
