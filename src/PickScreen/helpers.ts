import type { QuizAnswer } from '../quiz';
import {
  createDecoys,
  createTable,
  shuffle,
  type IEquation,
} from '../tables';
import type { IQuestion, OptionState } from './types';

const pickSameTableResult = (equation: IEquation, table: IEquation[]) => shuffle(
  table.filter(({ result }) => result !== equation.result),
)[0].result;

// Options: the right answer, a wrong one from the same table and one from outside it
export const createQuestion = (equation: IEquation): IQuestion => {
  const table = createTable(equation.left);

  return {
    equation,
    options: shuffle([
      equation.result,
      pickSameTableResult(equation, table),
      ...createDecoys(table, 1),
    ]),
  };
};

export const getOptionState = (
  value: number,
  question: IQuestion,
  answer: QuizAnswer,
): OptionState => {
  if (answer.type === 'answering') return 'idle';
  if (value === question.equation.result) return 'correct';

  return value === answer.picked
    ? 'wrong'
    : 'idle';
};
