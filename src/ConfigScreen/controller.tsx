import { useCallback, useState } from 'react';

import type { GameMode } from '../game';
import { toggleNumber } from './helpers';
import type { IConfigScreenProps } from './types';

// Match board fits on one phone screen only with up to two tables
const MAX_MATCH_NUMBERS = 2;

export const useConfigScreen = ({ onStart }: IConfigScreenProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = useCallback(
    (value: number) => setSelected(current => toggleNumber(current, value)),
    [],
  );

  const start = (mode: GameMode) => onStart({ numbers: selected, mode });

  const isStartDisabled = selected.length === 0;
  const isMatchDisabled = isStartDisabled || selected.length > MAX_MATCH_NUMBERS;

  return {
    selected,
    toggle,
    start,
    isStartDisabled,
    isMatchDisabled,
  };
};
