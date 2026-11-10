import { SceneShow } from '@libs/models/scene-effect.models';

export const METEOR_COUNT = 16;
export const CONFETTI_PIECE_COUNT = 90;
export const SHOW_FIREWORK_INTERVAL_MS = 260;

export const SLEIGH_FLYBY_SHOW: SceneShow = {
  title: 'Santa fly-by',
  caption: 'Ho ho ho! Santa is flying past',
  icon: 'bi-gift-fill',
  effects: ['sleigh-flyby'],
  durationMs: 6000,
};

export const FIREWORKS_SHOW: SceneShow = {
  title: 'Fireworks',
  caption: 'Light up the sky!',
  icon: 'bi-stars',
  effects: ['fireworks'],
  durationMs: 5000,
};

export const SNOWSTORM_SHOW: SceneShow = {
  title: 'Snowstorm',
  caption: 'Hold on to your hat!',
  icon: 'bi-cloud-snow-fill',
  effects: ['snowstorm'],
  durationMs: 6000,
};

export const METEOR_SHOWER_SHOW: SceneShow = {
  title: 'Meteor shower',
  caption: 'Quick, make a wish!',
  icon: 'bi-star-fill',
  effects: ['meteor-shower'],
  durationMs: 5000,
};

export const AURORA_FLARE_SHOW: SceneShow = {
  title: 'Northern lights',
  caption: 'The aurora is dancing',
  icon: 'bi-rainbow',
  effects: ['aurora-flare'],
  durationMs: 6000,
};

export const VILLAGE_GLOW_SHOW: SceneShow = {
  title: 'Cosy village',
  caption: 'Everyone is home for Christmas',
  icon: 'bi-house-heart-fill',
  effects: ['village-glow'],
  durationMs: 5500,
};

export const GOLDEN_SNOW_SHOW: SceneShow = {
  title: 'Golden snow',
  caption: 'Even the snow is sparkling',
  icon: 'bi-snow2',
  effects: ['golden-snow'],
  durationMs: 6000,
};

export const DISCO_LIGHTS_SHOW: SceneShow = {
  title: 'Party lights',
  caption: 'The fairy lights went wild!',
  icon: 'bi-lightbulb-fill',
  effects: ['disco-lights'],
  durationMs: 5000,
};

export const SUPERMOON_SHOW: SceneShow = {
  title: 'Supermoon',
  caption: 'What a moon tonight',
  icon: 'bi-moon-fill',
  effects: ['supermoon', 'starburst'],
  durationMs: 5500,
};

export const SNOW_GLOBE_SHOW: SceneShow = {
  title: 'Snow globe',
  caption: 'Shake, shake, shake!',
  icon: 'bi-globe2',
  effects: ['snow-globe'],
  durationMs: 4500,
};

export const CONFETTI_SHOW: SceneShow = {
  title: 'Confetti',
  caption: 'Let the party begin!',
  icon: 'bi-balloon-fill',
  effects: ['confetti'],
  durationMs: 5000,
};

export const STARBURST_SHOW: SceneShow = {
  title: 'Starlight',
  caption: 'Every star is shining for you',
  icon: 'bi-brightness-high-fill',
  effects: ['starburst', 'aurora-flare'],
  durationMs: 5000,
};

export const GRAND_FINALE_SHOW: SceneShow = {
  title: 'Grand finale',
  caption: 'Merry Christmas Eve!',
  icon: 'bi-magic',
  effects: [
    'sleigh-flyby',
    'fireworks',
    'golden-snow',
    'disco-lights',
    'aurora-flare',
    'village-glow',
    'starburst',
  ],
  durationMs: 9000,
};
