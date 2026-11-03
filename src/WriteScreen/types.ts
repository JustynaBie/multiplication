export interface IWriteScreenProps {
  numbers: number[];
  onExit: () => void;
}

export type FieldState = 'idle' | 'correct' | 'wrong';
