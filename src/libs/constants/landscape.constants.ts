import { SkyPoint, VillageHouse } from '@libs/models/night-sky.models';

// All coordinates use the landscape SVG viewBox: 0 0 1600 400.

export const MOUNTAIN_POINTS: readonly SkyPoint[] = [
  { x: 0, y: 235 },
  { x: 130, y: 175 },
  { x: 230, y: 215 },
  { x: 350, y: 130 },
  { x: 470, y: 205 },
  { x: 590, y: 160 },
  { x: 700, y: 225 },
  { x: 820, y: 145 },
  { x: 950, y: 215 },
  { x: 1070, y: 120 },
  { x: 1200, y: 205 },
  { x: 1310, y: 165 },
  { x: 1420, y: 220 },
  { x: 1520, y: 155 },
  { x: 1600, y: 200 },
];

export const FOREST_HILL_PATH =
  'M0 400 L0 300 Q200 255 400 288 T800 272 T1200 292 T1600 268 L1600 400 Z';

export const SNOW_GROUND_PATH = 'M0 400 L0 352 Q260 318 560 342 T1120 336 T1600 326 L1600 400 Z';

export const SNOW_GROUND_SHADOW_PATH =
  'M0 400 L0 368 Q300 346 640 362 T1240 356 T1600 350 L1600 400 Z';

export const VILLAGE_HOUSES: readonly VillageHouse[] = [
  { x: 1010, y: 350, scale: 0.8, hasSmoke: false },
  { x: 1090, y: 345, scale: 1.05, hasSmoke: true },
  { x: 1185, y: 336, scale: 0.9, hasSmoke: false },
  { x: 1262, y: 330, scale: 1.15, hasSmoke: true },
  { x: 1370, y: 325, scale: 0.85, hasSmoke: false },
];

export const SMOKE_PUFF_DELAYS_S = [0, 1.3, 2.6] as const;

export const REINDEER_OFFSETS_X = [118, 152, 186] as const;
