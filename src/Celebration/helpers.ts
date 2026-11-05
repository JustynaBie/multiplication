export const pickRandom = <TItem>(items: TItem[]) =>
  items[Math.floor(Math.random() * items.length)];
