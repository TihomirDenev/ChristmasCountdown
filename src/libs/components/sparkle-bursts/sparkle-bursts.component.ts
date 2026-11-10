import { Component, DestroyRef, computed, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fromEvent } from 'rxjs';

import {
  FIREWORK_INTERVAL_MS,
  FIREWORK_PARTICLE_COUNT,
  SPARKLE_COLORS,
  SPARKLE_LIFETIME_MS,
  SPARKLE_PARTICLE_COUNT,
} from '@libs/constants/app.constants';
import {
  CONFETTI_PIECE_COUNT,
  SHOW_FIREWORK_INTERVAL_MS,
} from '@libs/constants/scene-shows.constants';
import { prefersReducedMotion } from '@libs/helpers/motion.helpers';
import { randomBetween } from '@libs/helpers/random.helpers';
import { buildConfettiPieces, buildSparkleParticles } from '@libs/helpers/sparkle.helpers';
import { SparkleBurst } from '@libs/models/sparkle-burst.models';
import { SceneEffectsService } from '@libs/services/scene-effects.service';

@Component({
  selector: 'app-sparkle-bursts',
  templateUrl: './sparkle-bursts.component.html',
  styleUrl: './sparkle-bursts.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class SparkleBurstsComponent {
  /** When true, fireworks keep launching on their own (used on Christmas Day). */
  readonly isCelebrating = input(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly sceneEffectsService = inject(SceneEffectsService);
  private nextBurstId = 0;

  readonly bursts = signal<SparkleBurst[]>([]);
  readonly confettiPieces = computed(() =>
    this.sceneEffectsService.isActive('confetti')
      ? buildConfettiPieces(CONFETTI_PIECE_COUNT, SPARKLE_COLORS)
      : [],
  );

  constructor() {
    if (prefersReducedMotion()) {
      return;
    }

    this.sparkleOnEveryClick();
    this.launchFireworksWhenNeeded();
  }

  private sparkleOnEveryClick(): void {
    fromEvent<PointerEvent>(document, 'pointerdown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.createBurst(event.clientX, event.clientY, false));
  }

  // Fireworks run all day on Christmas Day, and faster during a fireworks show.
  private launchFireworksWhenNeeded(): void {
    effect((onCleanup) => {
      const isFireworksShow = this.sceneEffectsService.isActive('fireworks');

      if (!this.isCelebrating() && !isFireworksShow) {
        return;
      }

      const interval = isFireworksShow ? SHOW_FIREWORK_INTERVAL_MS : FIREWORK_INTERVAL_MS;
      const intervalId = setInterval(() => this.launchRandomFirework(), interval);
      onCleanup(() => clearInterval(intervalId));
    });
  }

  private launchRandomFirework(): void {
    const x = randomBetween(0.1, 0.9) * window.innerWidth;
    const y = randomBetween(0.08, 0.5) * window.innerHeight;
    this.createBurst(x, y, true);
  }

  private createBurst(x: number, y: number, isFirework: boolean): void {
    const burst: SparkleBurst = {
      id: this.nextBurstId++,
      x,
      y,
      isFirework,
      particles: isFirework
        ? buildSparkleParticles(FIREWORK_PARTICLE_COUNT, [130, 250], SPARKLE_COLORS)
        : buildSparkleParticles(SPARKLE_PARTICLE_COUNT, [40, 95], SPARKLE_COLORS),
    };

    this.bursts.update((bursts) => [...bursts, burst]);
    setTimeout(() => this.removeBurst(burst.id), SPARKLE_LIFETIME_MS);
  }

  private removeBurst(burstId: number): void {
    this.bursts.update((bursts) => bursts.filter((burst) => burst.id !== burstId));
  }
}
