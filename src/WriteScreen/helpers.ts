import type { IQuizQuestion, QuizAnswer } from '../quiz';
import type { IEquation } from '../tables';
import type { FieldState } from './types';

export const createQuestion = (equation: IEquation): IQuizQuestion => ({ equation });

export const keepDigits = (text: string) => text.replace(/\D/g, '');

export const getFieldState = (answer: QuizAnswer, question: IQuizQuestion): FieldState => {
  if (answer.type === 'answering') return 'idle';

  return answer.picked === question.equation.result
    ? 'correct'
    : 'wrong';
};
