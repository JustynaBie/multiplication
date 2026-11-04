import { DndContext, DragOverlay } from '@dnd-kit/core';

import { GameHeader } from '../GameHeader';
import { POOL_ID, useMatchScreen } from './controller';
import { DropArea, Tile } from './dnd';
import styles from './style.module.css';
import type { IMatchScreenProps } from './types';

export const MatchScreen = (props: IMatchScreenProps) => {
  const {
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
  } = useMatchScreen(props);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={startDrag}
      onDragEnd={endDrag}
      onDragCancel={cancelDrag}
    >
      <main className={styles.screen}>
        <GameHeader numbers={props.numbers} onExit={props.onExit}>
          {props.level && <span className={styles.level}>{`Poziom ${props.level}`}</span>}
        </GameHeader>

        <div className={styles.board}>
          <ul className={styles.equations}>
            {rows.map(({ equation, tile, state }) => (
              <li key={equation.id} className={styles.row}>
                <span className={styles.equation}>{`${equation.left} × ${equation.right}`}</span>
                <DropArea
                  id={equation.id}
                  className={styles.slot}
                  state={state}
                  isSelected={selectedId === equation.id}
                  onTap={tapSlot}
                >
                  {tile && <Tile tile={tile} isSelected={selectedId === tile.id} onTap={tapTile} />}
                </DropArea>
              </li>
            ))}
          </ul>

          <DropArea id={POOL_ID} className={styles.pool} onTap={tapPool}>
            {poolTiles.map(tile => (
              <Tile
                key={tile.id}
                tile={tile}
                isSelected={selectedId === tile.id}
                onTap={tapTile}
              />
            ))}
          </DropArea>
        </div>

        <footer className={styles.footer}>
          {isChecked && <p className={styles.score}>{`Dobrze: ${correctCount} / ${rows.length}`}</p>}
          {isNextLevelAvailable
            ? (
              <button type="button" className={styles.check} onClick={props.onNextLevel}>
                Dalej →
              </button>
            )
            : (
              <button
                type="button"
                className={styles.check}
                disabled={isCheckDisabled}
                onClick={check}
              >
                Sprawdź
              </button>
            )}
        </footer>

        {/* Inside main so the overlay tile inherits the size variables */}
        <DragOverlay>
          {activeTile && <div className={styles.tile}>{activeTile.value}</div>}
        </DragOverlay>
      </main>
    </DndContext>
  );
};
