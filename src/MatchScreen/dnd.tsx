import { useDraggable, useDroppable } from '@dnd-kit/core';
import type { MouseEvent } from 'react';

import styles from './style.module.css';
import type { IDropAreaProps, ITileProps } from './types';

export const Tile = ({ tile, isSelected, onTap }: ITileProps) => {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({ id: tile.id });

  // Stop the tap from also reaching the slot the tile sits in
  const tap = (event: MouseEvent) => {
    event.stopPropagation();
    onTap(tile.id);
  };

  return (
    <div
      ref={setNodeRef}
      className={styles.tile}
      data-tile-id={tile.id}
      data-dragging={isDragging}
      data-selected={isSelected}
      onClick={tap}
      {...listeners}
      {...attributes}
    >
      {tile.value}
    </div>
  );
};

export const DropArea = ({
  id,
  className,
  state,
  isSelected = false,
  onTap,
  children,
}: IDropAreaProps) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={className}
      data-over={isOver}
      data-state={state}
      data-selected={isSelected}
      onClick={() => onTap(id)}
    >
      {children}
    </div>
  );
};
