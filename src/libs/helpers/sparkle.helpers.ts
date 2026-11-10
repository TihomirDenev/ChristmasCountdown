import { pickRandom, randomBetween } from '@libs/helpers/random.helpers';
import { ConfettiPiece, SparkleParticle } from '@libs/models/sparkle-burst.models';

export function buildSparkleParticles(
  count: number,
  distanceRange: [number, number],
  colors: readonly string[],
): SparkleParticle[] {
  const angleStep = 360 / count;

  return Array.from({ length: count }, (_, index) => ({
    angleDeg: index * angleStep + randomBetween(-angleStep / 3, angleStep / 3),
    distancePx: randomBetween(distanceRange[0], distanceRange[1]),
    sizePx: randomBetween(6, 14),
    color: pickRandom(colors),
  }));
}

export function buildConfettiPieces(count: number, colors: readonly string[]): ConfettiPiece[] {
  return Array.from({ length: count }, () => ({
    leftPercent: randomBetween(0, 100),
    delayS: randomBetween(0, 1.8),
    durationS: randomBetween(2.4, 4),
    driftPx: randomBetween(-120, 120),
    spinDeg: randomBetween(360, 1080),
    widthPx: randomBetween(6, 11),
    color: pickRandom(colors),
  }));
}
