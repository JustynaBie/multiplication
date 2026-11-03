import { useQuiz } from '../quiz';
import { createQuestion, getOptionState } from './helpers';
import type { IPickScreenProps } from './types';

export const usePickScreen = ({ numbers }: IPickScreenProps) => {
  const {
    question,
    answer,
    isDone,
    isRevealing,
    progress,
    submit,
  } = useQuiz(numbers, createQuestion);

  const options = isDone
    ? []
    : question.options.map(value => ({ value, state: getOptionState(value, question, answer) }));

  return {
    question,
    options,
    isDone,
    isRevealing,
    progress,
    pick: submit,
  };
};
