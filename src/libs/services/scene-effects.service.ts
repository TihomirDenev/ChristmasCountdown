import { Injectable, OnDestroy, computed, signal } from '@angular/core';

import { SceneEffect, SceneShow } from '@libs/models/scene-effect.models';

/** Plays magic shows on the scene (sky, snow, lights) and lets components react to them. */
@Injectable({ providedIn: 'root' })
export class SceneEffectsService implements OnDestroy {
  readonly currentShow = signal<SceneShow | null>(null);
  readonly isShowPlaying = computed(() => this.currentShow() !== null);

  private stopTimeoutId?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    clearTimeout(this.stopTimeoutId);
  }

  play(show: SceneShow): void {
    clearTimeout(this.stopTimeoutId);
    // A fresh object means replaying the same show still notifies every listener.
    this.currentShow.set({ ...show });
    this.stopTimeoutId = setTimeout(() => this.stop(), show.durationMs);
  }

  stop(): void {
    clearTimeout(this.stopTimeoutId);
    this.currentShow.set(null);
  }

  isActive(effect: SceneEffect): boolean {
    return this.currentShow()?.effects.includes(effect) ?? false;
  }
}
