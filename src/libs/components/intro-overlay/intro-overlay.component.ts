import { Component, DestroyRef, inject, signal } from '@angular/core';

import { INTRO_DURATION_MS } from '@libs/constants/app.constants';
import { prefersReducedMotion } from '@libs/helpers/motion.helpers';

@Component({
  selector: 'app-intro-overlay',
  templateUrl: './intro-overlay.component.html',
  styleUrl: './intro-overlay.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class IntroOverlayComponent {
  readonly isVisible = signal(!prefersReducedMotion());

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (this.isVisible()) {
      this.hideAfterIntro();
    }
  }

  private hideAfterIntro(): void {
    const timeoutId = setTimeout(() => this.isVisible.set(false), INTRO_DURATION_MS);
    this.destroyRef.onDestroy(() => clearTimeout(timeoutId));
  }
}
