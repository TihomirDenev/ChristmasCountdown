export const randomBetween = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const pickRandom = <T>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];
