export interface SnowParticle {
  x: number;
  y: number;
  radius: number;
  depth: number;
  fallSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  opacity: number;
  /** Extra push (e.g. from shaking the snow globe) that fades out over time. */
  pushX: number;
  pushY: number;
}
