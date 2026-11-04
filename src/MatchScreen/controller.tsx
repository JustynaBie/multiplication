import {
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { animateTiles, measureTiles, type TileRects } from './flight';
import { createDecoys } from '../tables';
import {
  createEquations,
  createTiles,
  getPoolTiles,
  getSlotState,
  getTileSlot,
  placeTile,
} from './helpers';
import type {
  IMatchScreenProps,
  Level,
  MatchStatus,
  Placements,
  Selection,
} from './types';

export const POOL_ID = 'pool';

const DECOY_COUNT = 5;

// Level 2 adds wrong answers to the pool
const createBoard = (numbers: number[], level: Level | undefined) => {
  const equations = createEquations(numbers);
  const decoys = level === 2
    ? createDecoys(equations, DECOY_COUNT)
    : [];
  const tiles = createTiles(equations, decoys);

  return { equations, tiles };
};

export const useMatchScreen = ({ numbers, level, onNextLevel }: IMatchScreenProps) => {
  const [{ equations, tiles }] = useState(() => createBoard(numbers, level));
  const [placements, setPlacements] = useState<Placements>({});
  const [status, setStatus] = useState<MatchStatus>('playing');
  const [activeTileId, setActiveTileId] = useState<string | null>(null);
  const [selection, setSelection] = useState<Selection>(null);

  // Small distance lets a tap select a tile instead of starting a drag
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const rectsBeforeFlight = useRef<TileRects | null>(null);

  // slotId null returns the tile to the pool
  const moveTile = useCallback((tileId: string, slotId: string | null) => {
    setPlacements(current => placeTile(current, tileId, slotId));
    setStatus('playing');
    setSelection(null);
  }, []);

  // Tap moves fly the tile; drag moves don't need it, the tile is already under the finger
  const flyTile = useCallback((tileId: string, slotId: string | null) => {
    rectsBeforeFlight.current = measureTiles();
    moveTile(tileId, slotId);
  }, [moveTile]);

  const startDrag = useCallback(({ active }: DragStartEvent) => {
    setActiveTileId(String(active.id));
    setSelection(null);
  }, []);

  // Drop on a slot places the tile, drop on the pool returns it, drop elsewhere does nothing
  const endDrag = useCallback(({ active, over }: DragEndEvent) => {
    setActiveTileId(null);
    if (!over) return;

    const slotId = over.id === POOL_ID
      ? null
      : String(over.id);

    moveTile(String(active.id), slotId);
  }, [moveTile]);

  const cancelDrag = useCallback(() => setActiveTileId(null), []);

  // Tile tapped after a slot fills that slot; another tile tapped onto a placed tile replaces it;
  // otherwise toggles the tile selection
  const tapTile = useCallback((tileId: string) => {
    if (selection?.type === 'slot') return flyTile(tileId, selection.id);

    const slotId = getTileSlot(placements, tileId);

    if (selection?.type === 'tile' && selection.id !== tileId && slotId) {
      return flyTile(selection.id, slotId);
    }

    setSelection(selection?.id === tileId
      ? null
      : { type: 'tile', id: tileId });
  }, [selection, placements, flyTile]);

  // Slot tapped after a tile receives it; otherwise toggles the slot selection
  const tapSlot = useCallback((slotId: string) => {
    if (selection?.type === 'tile') return flyTile(selection.id, slotId);

    setSelection(selection?.id === slotId
      ? null
      : { type: 'slot', id: slotId });
  }, [selection, flyTile]);

  // Pool tapped after a tile takes it back; otherwise clears the selection
  const tapPool = useCallback(() => {
    if (selection?.type === 'tile') return flyTile(selection.id, null);

    setSelection(null);
  }, [selection, flyTile]);

  const check = useCallback(() => setStatus('checked'), []);

  // Runs after the DOM moved the tiles, before paint, so tiles start from their old spots
  useLayoutEffect(() => {
    if (!rectsBeforeFlight.current) return;

    animateTiles(rectsBeforeFlight.current);
    rectsBeforeFlight.current = null;
  }, [placements]);

  const tileById = useMemo(() => new Map(tiles.map(tile => [tile.id, tile])), [tiles]);

  const rows = useMemo(() => equations.map(equation => {
    const tile = tileById.get(placements[equation.id]);

    return { equation, tile, state: getSlotState(equation, tile, status) };
  }), [equations, tileById, placements, status]);

  const poolTiles = useMemo(() => getPoolTiles(tiles, placements), [tiles, placements]);
  const activeTile = activeTileId ? tileById.get(activeTileId) : undefined;
  const selectedId = selection?.id;
  const isChecked = status === 'checked';
  const isCheckDisabled = rows.some(row => !row.tile);
  const correctCount = rows.filter(row => row.state === 'correct').length;
  const isAllCorrect = correctCount === rows.length;
  const isNextLevelAvailable = Boolean(onNextLevel) && isAllCorrect;

  return {
    sensors,
    rows,
    poolTiles,
    activeTile,
    selectedId,
    isChecked,
    isCheckDisabled,
    isNextLevelAvailable,
    correctCount,
    startDrag,
    endDrag,
    cancelDrag,
    tapTile,
    tapSlot,
    tapPool,
    check,
  };
};
