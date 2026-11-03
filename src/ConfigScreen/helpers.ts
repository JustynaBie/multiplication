const ascending = (a: number, b: number) => a - b;

export const toggleNumber = (numbers: number[], value: number) => numbers.includes(value)
  ? numbers.filter(number => number !== value)
  : [...numbers, value].sort(ascending);
