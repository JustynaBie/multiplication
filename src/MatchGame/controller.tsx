import { useCallback, useState } from 'react';

import type { GameLevel, IMatchGameProps } from './types';

export const useMatchGame = ({ numbers }: IMatchGameProps) => {
  const [level, setLevel] = useState<GameLevel>(1);

  const goToNextLevel = useCallback(() => setLevel(2), []);

  // Levels exist only when practising a single table
  const hasLevels = numbers.length === 1;
  const hasNextLevel = level === 1;

  return {
    level,
    hasLevels,
    hasNextLevel,
    goToNextLevel,
  };
};
