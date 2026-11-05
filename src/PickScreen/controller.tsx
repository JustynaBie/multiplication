import { useTranslation } from '../i18n';
import { useQuiz } from '../quiz';
import { createQuestion, getOptionState } from './helpers';
import type { IPickScreenProps } from './types';

export const usePickScreen = ({ numbers }: IPickScreenProps) => {
  const { t } = useTranslation();
  const {
    question,
    answer,
    isDone,
    isRevealing,
    solved,
    total,
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
    solved,
    total,
    pick: submit,
    t,
  };
};
