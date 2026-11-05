import {
  useCallback,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { useTranslation } from '../i18n';
import { useQuiz } from '../quiz';
import { createQuestion, getFieldState, keepDigits } from './helpers';
import type { IWriteScreenProps } from './types';

export const useWriteScreen = ({ numbers }: IWriteScreenProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const {
    question,
    answer,
    isDone,
    isRevealing,
    progress,
    submit,
  } = useQuiz(numbers, createQuestion);

  const change = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(keepDigits(event.target.value)),
    [],
  );

  // Typed number becomes the answer; the field then shows it until the next question
  const check = useCallback((event: FormEvent) => {
    event.preventDefault();
    if (!value || isRevealing) return;

    submit(Number(value));
    setValue('');
  }, [value, isRevealing, submit]);

  const fieldState = isDone
    ? 'idle'
    : getFieldState(answer, question);
  const fieldValue = answer.type === 'revealing'
    ? String(answer.picked)
    : value;
  const isWrong = fieldState === 'wrong';
  const isCheckDisabled = !value || isRevealing;

  return {
    question,
    fieldState,
    fieldValue,
    isDone,
    isRevealing,
    isWrong,
    isCheckDisabled,
    progress,
    change,
    check,
    t,
  };
};
