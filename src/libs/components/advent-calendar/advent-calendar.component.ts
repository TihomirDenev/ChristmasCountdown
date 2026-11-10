import { Component, DestroyRef, computed, inject, signal } from '@angular/core';

import {
  ADVENT_DOOR_OPEN_DURATION_MS,
  ADVENT_SHAKE_DURATION_MS,
  ADVENT_TOAST_DURATION_MS,
} from '@libs/constants/advent.constants';
import { buildAdventDoors, getDaysUntilAdventDoor, isDecember } from '@libs/helpers/advent.helpers';
import { pluralize } from '@libs/helpers/countdown.helpers';
import { AdventDoor } from '@libs/models/advent-door.models';
import { AdventCalendarService } from '@libs/services/advent-calendar.service';
import { CountdownService } from '@libs/services/countdown.service';
import { SceneEffectsService } from '@libs/services/scene-effects.service';

@Component({
  selector: 'app-advent-calendar',
  templateUrl: './advent-calendar.component.html',
  styleUrl: './advent-calendar.component.scss',
})
export class AdventCalendarComponent {
  private readonly countdownService = inject(CountdownService);
  private readonly adventCalendarService = inject(AdventCalendarService);
  private readonly sceneEffectsService = inject(SceneEffectsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly isPreviewMode = this.adventCalendarService.isPreviewMode;
  readonly doors = computed(() =>
    buildAdventDoors(
      this.countdownService.now(),
      this.adventCalendarService.openedDays(),
      this.isPreviewMode,
    ),
  );
  readonly isAdventSeason = computed(() => isDecember(this.countdownService.now()));
  readonly lockedMessage = signal('');
  readonly isLockedMessageVisible = signal(false);
  readonly shakingDay = signal<number | null>(null);

  private lockedMessageTimeoutId?: ReturnType<typeof setTimeout>;
  private shakeTimeoutId?: ReturnType<typeof setTimeout>;
  private showTimeoutId?: ReturnType<typeof setTimeout>;

  constructor() {
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.lockedMessageTimeoutId);
      clearTimeout(this.shakeTimeoutId);
      clearTimeout(this.showTimeoutId);
    });
  }

  onDoorClick(door: AdventDoor): void {
    if (!door.isUnlocked) {
      this.shakeDoor(door.day);
      this.showLockedMessage(door.day);
      return;
    }

    if (door.isOpen) {
      this.sceneEffectsService.play(door.show);
      return;
    }

    this.adventCalendarService.openDoor(door.day);
    this.playShowAfterDoorOpens(door);
  }

  getDoorAriaLabel(door: AdventDoor): string {
    if (door.isOpen) {
      return `Day ${door.day}: replay ${door.show.title}`;
    }

    return door.isUnlocked ? `Open door ${door.day}` : `Door ${door.day} is still locked`;
  }

  private playShowAfterDoorOpens(door: AdventDoor): void {
    clearTimeout(this.showTimeoutId);
    this.showTimeoutId = setTimeout(
      () => this.sceneEffectsService.play(door.show),
      ADVENT_DOOR_OPEN_DURATION_MS,
    );
  }

  private shakeDoor(day: number): void {
    clearTimeout(this.shakeTimeoutId);
    this.shakingDay.set(day);
    this.shakeTimeoutId = setTimeout(() => this.shakingDay.set(null), ADVENT_SHAKE_DURATION_MS);
  }

  private showLockedMessage(day: number): void {
    const daysUntilOpen = getDaysUntilAdventDoor(day, this.countdownService.now());
    const daysText = `${daysUntilOpen} ${pluralize(daysUntilOpen, 'day', 'days')}`;

    clearTimeout(this.lockedMessageTimeoutId);
    this.lockedMessage.set(`No peeking! Door ${day} opens in ${daysText}.`);
    this.isLockedMessageVisible.set(true);
    this.lockedMessageTimeoutId = setTimeout(
      () => this.isLockedMessageVisible.set(false),
      ADVENT_TOAST_DURATION_MS,
    );
  }
}
