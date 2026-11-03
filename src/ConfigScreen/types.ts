import type { IGameSettings } from '../game';

export interface IConfigScreenProps {
  onStart: (settings: IGameSettings) => void;
}
