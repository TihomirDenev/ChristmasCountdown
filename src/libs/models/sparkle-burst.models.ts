export interface SparkleParticle {
  angleDeg: number;
  distancePx: number;
  sizePx: number;
  color: string;
}

export interface SparkleBurst {
  id: number;
  x: number;
  y: number;
  isFirework: boolean;
  particles: SparkleParticle[];
}

export interface ConfettiPiece {
  leftPercent: number;
  delayS: number;
  durationS: number;
  driftPx: number;
  spinDeg: number;
  widthPx: number;
  color: string;
}
