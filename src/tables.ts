export interface IEquation {
  id: string;
  left: number;
  right: number;
  result: number;
}

const FACTORS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const shuffle = <TItem>(items: TItem[]) => items
  .map(item => ({ item, key: Math.random() }))
  .sort((a, b) => a.key - b.key)
  .map(({ item }) => item);

const range = (from: number, to: number) => Array.from(
  { length: to - from + 1 },
  (_, index) => from + index,
);

export const createTable = (left: number): IEquation[] => FACTORS.map(right => ({
  id: `${left}x${right}`,
  left,
  right,
  result: left * right,
}));

// Wrong answers drawn from the same number range, so they don't stand out at a glance
export const createDecoys = (equations: IEquation[], count: number) => {
  const results = equations.map(({ result }) => result);
  const candidates = range(1, Math.max(...results) + 10).filter(value => !results.includes(value));

  return shuffle(candidates).slice(0, count);
};
