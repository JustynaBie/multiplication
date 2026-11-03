import type { ReactNode } from 'react';

import type { IEquation } from '../tables';

export type Level = 1 | 2;

// level is set only when the game has levels; onNextLevel only when there is a next one
export interface IMatchScreenProps {
  numbers: number[];
  level?: Level;
  onExit: () => void;
  onNextLevel?: () => void;
}

export interface ITile {
  id: string;
  value: number;
}

// slot (equation) id -> tile id
export type Placements = Record<string, string>;

export type MatchStatus = 'playing' | 'checked';

// Tap-to-move: first tap selects a tile or an empty slot, second tap completes the move
export type Selection =
  | { type: 'tile'; id: string }
  | { type: 'slot'; id: string }
  | null;

export type SlotState = 'empty' | 'filled' | 'correct' | 'wrong';

export interface IRow {
  equation: IEquation;
  tile: ITile | undefined;
  state: SlotState;
}

export interface ITileProps {
  tile: ITile;
  isSelected: boolean;
  onTap: (id: string) => void;
}

export interface IDropAreaProps {
  id: string;
  className: string;
  state?: SlotState;
  isSelected?: boolean;
  onTap: (id: string) => void;
  children: ReactNode;
}
