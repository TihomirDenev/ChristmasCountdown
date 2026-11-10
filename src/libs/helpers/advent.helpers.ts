import { CHRISTMAS_MONTH } from '@libs/constants/app.constants';
import { ADVENT_DOOR_ORDER, ADVENT_DOOR_SHOWS } from '@libs/constants/advent.constants';
import { AdventDoor, AdventDoorColor } from '@libs/models/advent-door.models';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const DOOR_COLORS: readonly AdventDoorColor[] = ['red', 'green', 'gold'];

export function buildAdventDoors(
  now: Date,
  openedDays: readonly number[],
  isPreviewMode: boolean,
): AdventDoor[] {
  return ADVENT_DOOR_ORDER.map((day, index) => {
    const isUnlocked = isPreviewMode || isAdventDoorUnlocked(day, now);

    return {
      day,
      show: ADVENT_DOOR_SHOWS[day - 1],
      color: DOOR_COLORS[index % DOOR_COLORS.length],
      isUnlocked,
      isOpen: isUnlocked && openedDays.includes(day),
      isToday: isDecember(now) && now.getDate() === day,
    };
  });
}

export function isAdventDoorUnlocked(day: number, now: Date): boolean {
  return isDecember(now) && now.getDate() >= day;
}

export function getDaysUntilAdventDoor(day: number, now: Date): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const doorDate = new Date(now.getFullYear(), CHRISTMAS_MONTH, day);

  return Math.round((doorDate.getTime() - today.getTime()) / MS_PER_DAY);
}

export function isDecember(now: Date): boolean {
  return now.getMonth() === CHRISTMAS_MONTH;
}
