export type SceneEffect =
  | 'sleigh-flyby'
  | 'fireworks'
  | 'snowstorm'
  | 'meteor-shower'
  | 'aurora-flare'
  | 'village-glow'
  | 'golden-snow'
  | 'disco-lights'
  | 'supermoon'
  | 'snow-globe'
  | 'confetti'
  | 'starburst';

/** A named moment of magic that plays one or more scene effects together. */
export interface SceneShow {
  title: string;
  caption: string;
  icon: string;
  effects: SceneEffect[];
  durationMs: number;
}
