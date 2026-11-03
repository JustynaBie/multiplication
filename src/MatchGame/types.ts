export type GameLevel = 1 | 2;

export interface IMatchGameProps {
  numbers: number[];
  onExit: () => void;
}
