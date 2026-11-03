// FLIP animation: measure tiles before a move, then play each from its old position to its new one

export type TileRects = Map<string, DOMRect>;

const TILE_SELECTOR = '[data-tile-id]';
const DURATION = 350;

const getTileNodes = () => [...document.querySelectorAll<HTMLElement>(TILE_SELECTOR)];

const checkReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const measureTiles = (): TileRects => new Map(
  getTileNodes().map(node => [node.dataset.tileId ?? '', node.getBoundingClientRect()]),
);

const animateTile = (node: HTMLElement, from: DOMRect) => {
  const to = node.getBoundingClientRect();
  const dx = from.left - to.left;
  const dy = from.top - to.top;

  if (!dx && !dy) return;

  // zIndex keeps the flying tile above its neighbours
  node.animate(
    [
      { transform: `translate(${dx}px, ${dy}px)`, zIndex: 1 },
      { transform: 'none', zIndex: 1 },
    ],
    { duration: DURATION, easing: 'ease-in-out' },
  );
};

export const animateTiles = (previous: TileRects) => {
  if (checkReducedMotion()) return;

  getTileNodes().forEach(node => {
    const from = previous.get(node.dataset.tileId ?? '');

    if (from) animateTile(node, from);
  });
};
