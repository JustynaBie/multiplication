import { createTable, shuffle, type IEquation } from '../tables';
import type {
  ITile,
  MatchStatus,
  Placements,
  SlotState,
} from './types';

export const createEquations = (numbers: number[]) => shuffle(numbers.flatMap(createTable));

export const createTiles = (equations: IEquation[], decoys: number[]): ITile[] => shuffle([
  ...equations.map(({ id, result }) => ({ id: `tile-${id}`, value: result })),
  ...decoys.map((value, index) => ({ id: `decoy-${index}`, value })),
]);

const removeTile = (placements: Placements, tileId: string): Placements => Object.fromEntries(
  Object.entries(placements).filter(([, id]) => id !== tileId),
);

// A tile already sitting in the target slot drops out of placements, i.e. back to the pool
export const placeTile = (placements: Placements, tileId: string, slotId: string | null) => {
  const withoutTile = removeTile(placements, tileId);

  return slotId
    ? { ...withoutTile, [slotId]: tileId }
    : withoutTile;
};

export const getTileSlot = (placements: Placements, tileId: string) => Object
  .keys(placements)
  .find(slotId => placements[slotId] === tileId);

export const getPoolTiles = (tiles: ITile[], placements: Placements) => {
  const placedIds = Object.values(placements);

  return tiles.filter(tile => !placedIds.includes(tile.id));
};

export const getSlotState = (
  equation: IEquation,
  tile: ITile | undefined,
  status: MatchStatus,
): SlotState => {
  if (!tile) return 'empty';
  if (status === 'playing') return 'filled';

  return tile.value === equation.result
    ? 'correct'
    : 'wrong';
};
