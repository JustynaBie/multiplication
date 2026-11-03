import { useCallback, useEffect, useState } from 'react';

import { createTable, shuffle, type IEquation } from './tables';

// One equation at a time; a wrong answer sends the equation to the back of the queue

export interface IQuizQuestion {
  equation: IEquation;
}

// After an answer the colours are shown for a moment before moving on
export type QuizAnswer =
  | { type: 'answering' }
  | { type: 'revealing'; picked: number };

const CORRECT_REVEAL_DURATION = 800;
const WRONG_REVEAL_DURATION = 1500;

// createQuestion must be a stable (module-level) function
export const useQuiz = <TQuestion extends IQuizQuestion>(
  numbers: number[],
  createQuestion: (equation: IEquation) => TQuestion,
) => {
  const [queue, setQueue] = useState(
    () => shuffle(numbers.flatMap(createTable)).map(createQuestion),
  );
  const [total] = useState(queue.length);
  const [answer, setAnswer] = useState<QuizAnswer>({ type: 'answering' });

  const submit = useCallback(
    (value: number) => setAnswer({ type: 'revealing', picked: value }),
    [],
  );

  const question = queue[0];
  const isDone = queue.length === 0;
  const isRevealing = answer.type === 'revealing';
  const isCorrect = isRevealing && answer.picked === question.equation.result;
  const progress = `${total - queue.length} / ${total}`;

  // Solved question leaves the queue; a failed one goes to the back, re-created fresh
  const advance = useCallback(() => {
    setQueue(([first, ...rest]) => isCorrect
      ? rest
      : [...rest, createQuestion(first.equation)]);
    setAnswer({ type: 'answering' });
  }, [isCorrect, createQuestion]);

  useEffect(() => {
    if (!isRevealing) return;

    const duration = isCorrect
      ? CORRECT_REVEAL_DURATION
      : WRONG_REVEAL_DURATION;
    const timer = setTimeout(advance, duration);

    return () => clearTimeout(timer);
  }, [isRevealing, isCorrect, advance]);

  return {
    question,
    answer,
    isDone,
    isRevealing,
    isCorrect,
    progress,
    submit,
  };
};
