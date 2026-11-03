export const GAME_MODES = {
  match: 'match',
  pick: 'pick',
  write: 'write',
} as const;

export type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES];

export interface IGameSettings {
  numbers: number[];
  mode: GameMode;
}
