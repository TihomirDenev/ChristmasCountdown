import { FairyLightBulb } from '@libs/models/fairy-light-bulb.model';

// The wire is drawn in a 1000 x 60 viewBox that stretches horizontally only,
// so vertical positions in the viewBox match pixels on screen.
const WIRE_VIEWBOX_WIDTH = 1000;
const WIRE_ANCHOR_Y = 6;

export function buildFairyLightWirePath(scallops: number, sagPx: number): string {
  const scallopWidth = WIRE_VIEWBOX_WIDTH / scallops;
  const controlPointY = getControlPointY(sagPx);
  let path = `M0 ${WIRE_ANCHOR_Y}`;

  for (let scallop = 0; scallop < scallops; scallop++) {
    const middleX = scallopWidth * scallop + scallopWidth / 2;
    const endX = scallopWidth * (scallop + 1);
    path += ` Q${middleX} ${controlPointY} ${endX} ${WIRE_ANCHOR_Y}`;
  }

  return path;
}

export function buildFairyLightBulbs(
  scallops: number,
  bulbsPerScallop: number,
  sagPx: number,
  colors: readonly string[],
): FairyLightBulb[] {
  const controlPointY = getControlPointY(sagPx);
  const bulbs: FairyLightBulb[] = [];

  for (let scallop = 0; scallop < scallops; scallop++) {
    for (let bulb = 0; bulb < bulbsPerScallop; bulb++) {
      const positionOnScallop = (bulb + 0.5) / bulbsPerScallop;
      const index = bulbs.length;

      bulbs.push({
        leftPercent: ((scallop + positionOnScallop) / scallops) * 100,
        topPx: getCurveY(positionOnScallop, controlPointY),
        color: colors[index % colors.length],
        index,
      });
    }
  }

  return bulbs;
}

// Quadratic bezier: the lowest point of the curve sits halfway to the control point.
function getControlPointY(sagPx: number): number {
  return 2 * (WIRE_ANCHOR_Y + sagPx) - WIRE_ANCHOR_Y;
}

function getCurveY(progress: number, controlPointY: number): number {
  const remaining = 1 - progress;
  return (
    remaining * remaining * WIRE_ANCHOR_Y +
    2 * remaining * progress * controlPointY +
    progress * progress * WIRE_ANCHOR_Y
  );
}
