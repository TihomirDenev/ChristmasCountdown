import { randomBetween } from '@libs/helpers/random.helpers';
import { Meteor, PineTree, ShootingStar, SkyPoint, SkyStar } from '@libs/models/night-sky.models';

const LANDSCAPE_BOTTOM_Y = 400;
const SNOW_CAP_SIZE = 0.3;

export interface PineTreeOptions {
  count: number;
  xRanges: readonly [number, number][];
  baseYRange: [number, number];
  scaleRange: [number, number];
}

// ─── Stars ────────────────────────────────────────────────────────────────────

export function buildSkyStars(count: number): SkyStar[] {
  return Array.from({ length: count }, () => {
    const isBright = Math.random() < 0.08;

    return {
      leftPercent: randomBetween(0, 100),
      // Squaring the random value packs more stars near the top of the sky.
      topPercent: Math.pow(Math.random(), 1.6) * 70,
      sizePx: isBright ? randomBetween(2.4, 3.4) : randomBetween(0.8, 2),
      twinkleDurationS: randomBetween(2, 6),
      twinkleDelayS: randomBetween(0, 6),
      isBright,
    };
  });
}

export function buildShootingStars(count: number): ShootingStar[] {
  return Array.from({ length: count }, (_, index) => ({
    leftPercent: randomBetween(10, 65),
    topPercent: randomBetween(4, 28),
    durationS: randomBetween(9, 15),
    delayS: 3 + index * 4 + randomBetween(0, 3),
  }));
}

export function buildMeteors(count: number): Meteor[] {
  return Array.from({ length: count }, () => ({
    leftPercent: randomBetween(0, 75),
    topPercent: randomBetween(0, 35),
    delayS: randomBetween(0, 3.5),
  }));
}

// ─── Trees ────────────────────────────────────────────────────────────────────

export function buildPineTrees(options: PineTreeOptions): PineTree[] {
  const trees = Array.from({ length: options.count }, () => {
    const xRange = options.xRanges[Math.floor(Math.random() * options.xRanges.length)];
    const x = randomBetween(xRange[0], xRange[1]);
    const baseY = randomBetween(options.baseYRange[0], options.baseYRange[1]);
    const scale = randomBetween(options.scaleRange[0], options.scaleRange[1]);

    return { x, baseY, scale };
  });

  // Trees lower on the screen are closer, so they are drawn last (on top).
  trees.sort((first, second) => first.baseY - second.baseY);

  return trees.map((tree) => ({
    transform: `translate(${tree.x.toFixed(1)} ${tree.baseY.toFixed(1)}) scale(${tree.scale.toFixed(2)})`,
  }));
}

// ─── Mountains ────────────────────────────────────────────────────────────────

export function buildMountainPath(points: readonly SkyPoint[]): string {
  const ridge = points.map((point) => `L${point.x} ${point.y}`).join(' ');
  const lastPoint = points[points.length - 1];

  return `M0 ${LANDSCAPE_BOTTOM_Y} ${ridge} L${lastPoint.x} ${LANDSCAPE_BOTTOM_Y} Z`;
}

export function buildSnowCapPolygons(points: readonly SkyPoint[]): string[] {
  const snowCaps: string[] = [];

  for (let index = 1; index < points.length - 1; index++) {
    const previousPoint = points[index - 1];
    const peak = points[index];
    const nextPoint = points[index + 1];
    const isPeak = peak.y < previousPoint.y && peak.y < nextPoint.y;

    if (isPeak) {
      snowCaps.push(buildSnowCap(previousPoint, peak, nextPoint));
    }
  }

  return snowCaps;
}

function buildSnowCap(previousPoint: SkyPoint, peak: SkyPoint, nextPoint: SkyPoint): string {
  const leftEdge = interpolatePoint(peak, previousPoint, SNOW_CAP_SIZE);
  const rightEdge = interpolatePoint(peak, nextPoint, SNOW_CAP_SIZE);

  // A jagged lower edge makes the snow look like it is melting down the slopes.
  const jaggedEdge = [0.75, 0.5, 0.25].map((amount, index) => {
    const point = interpolatePoint(leftEdge, rightEdge, amount);
    const drop = index % 2 === 0 ? 9 : 2;
    return { x: point.x, y: point.y + drop };
  });

  return [peak, rightEdge, ...jaggedEdge, leftEdge]
    .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
    .join(' ');
}

function interpolatePoint(from: SkyPoint, to: SkyPoint, amount: number): SkyPoint {
  return {
    x: from.x + (to.x - from.x) * amount,
    y: from.y + (to.y - from.y) * amount,
  };
}
