export interface SkyPoint {
  x: number;
  y: number;
}

export interface SkyStar {
  leftPercent: number;
  topPercent: number;
  sizePx: number;
  twinkleDurationS: number;
  twinkleDelayS: number;
  isBright: boolean;
}

export interface ShootingStar {
  leftPercent: number;
  topPercent: number;
  durationS: number;
  delayS: number;
}

export interface Meteor {
  leftPercent: number;
  topPercent: number;
  delayS: number;
}

export interface PineTree {
  transform: string;
}

export interface VillageHouse {
  x: number;
  y: number;
  scale: number;
  hasSmoke: boolean;
}
