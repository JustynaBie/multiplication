import type { ReactNode } from 'react';

export interface IGameHeaderProps {
  numbers: number[];
  onExit: () => void;
  children?: ReactNode;
}
