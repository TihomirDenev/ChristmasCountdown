import {
  AURORA_FLARE_SHOW,
  CONFETTI_SHOW,
  DISCO_LIGHTS_SHOW,
  FIREWORKS_SHOW,
  GOLDEN_SNOW_SHOW,
  GRAND_FINALE_SHOW,
  METEOR_SHOWER_SHOW,
  SLEIGH_FLYBY_SHOW,
  SNOW_GLOBE_SHOW,
  SNOWSTORM_SHOW,
  STARBURST_SHOW,
  SUPERMOON_SHOW,
  VILLAGE_GLOW_SHOW,
} from '@libs/constants/scene-shows.constants';
import { SceneShow } from '@libs/models/scene-effect.models';

export const ADVENT_STORAGE_KEY_PREFIX = 'cc-advent-opened-';
export const ADVENT_PREVIEW_QUERY_PARAM = 'peek';
export const ADVENT_TOAST_DURATION_MS = 3200;
export const ADVENT_SHAKE_DURATION_MS = 500;
// Lets the door finish swinging open before the page fades out for the show.
export const ADVENT_DOOR_OPEN_DURATION_MS = 750;

// Doors are shuffled like a real advent calendar.
export const ADVENT_DOOR_ORDER = [
  7, 18, 3, 22, 11, 1, 15, 9, 20, 5, 13, 24, 2, 16, 8, 21, 12, 4, 19, 10, 23, 6, 14, 17,
] as const;

// The magic show hidden behind each door. Index 0 is door 1.
export const ADVENT_DOOR_SHOWS: readonly SceneShow[] = [
  GOLDEN_SNOW_SHOW,
  METEOR_SHOWER_SHOW,
  DISCO_LIGHTS_SHOW,
  SUPERMOON_SHOW,
  SNOWSTORM_SHOW,
  VILLAGE_GLOW_SHOW,
  FIREWORKS_SHOW,
  AURORA_FLARE_SHOW,
  SNOW_GLOBE_SHOW,
  CONFETTI_SHOW,
  STARBURST_SHOW,
  SLEIGH_FLYBY_SHOW,
  METEOR_SHOWER_SHOW,
  GOLDEN_SNOW_SHOW,
  DISCO_LIGHTS_SHOW,
  SNOW_GLOBE_SHOW,
  SUPERMOON_SHOW,
  FIREWORKS_SHOW,
  VILLAGE_GLOW_SHOW,
  AURORA_FLARE_SHOW,
  STARBURST_SHOW,
  CONFETTI_SHOW,
  SNOWSTORM_SHOW,
  GRAND_FINALE_SHOW,
];
