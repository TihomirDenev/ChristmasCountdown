import { Injectable, isDevMode, signal } from '@angular/core';

import {
  ADVENT_PREVIEW_QUERY_PARAM,
  ADVENT_STORAGE_KEY_PREFIX,
} from '@libs/constants/advent.constants';

@Injectable({ providedIn: 'root' })
export class AdventCalendarService {
  // Opened doors are stored per year so the calendar resets every Christmas.
  private readonly storageKey = `${ADVENT_STORAGE_KEY_PREFIX}${new Date().getFullYear()}`;

  /**
   * Local development only: add `?peek` to the URL to unlock every door.
   * Doors opened while previewing are not saved, so the real calendar stays untouched.
   */
  readonly isPreviewMode = isDevMode() && this.hasPreviewQueryParam();

  readonly openedDays = signal<number[]>(this.isPreviewMode ? [] : this.loadOpenedDays());

  openDoor(day: number): void {
    if (this.openedDays().includes(day)) {
      return;
    }

    this.openedDays.update((days) => [...days, day]);

    if (!this.isPreviewMode) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.openedDays()));
    }
  }

  private hasPreviewQueryParam(): boolean {
    return new URLSearchParams(window.location.search).has(ADVENT_PREVIEW_QUERY_PARAM);
  }

  private loadOpenedDays(): number[] {
    const stored = localStorage.getItem(this.storageKey);

    if (!stored) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.filter((day) => typeof day === 'number') : [];
    } catch {
      return [];
    }
  }
}
