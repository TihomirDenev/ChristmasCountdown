import { SceneShow } from '@libs/models/scene-effect.models';

export type AdventDoorColor = 'red' | 'green' | 'gold';

export interface AdventDoor {
  day: number;
  show: SceneShow;
  color: AdventDoorColor;
  isUnlocked: boolean;
  isOpen: boolean;
  isToday: boolean;
}
