import { Component, computed, inject } from '@angular/core';

import { AdventCalendarComponent } from '@libs/components/advent-calendar/advent-calendar.component';
import { FairyLightsComponent } from '@libs/components/fairy-lights/fairy-lights.component';
import { FlipCardComponent } from '@libs/components/flip-card/flip-card.component';
import { IntroOverlayComponent } from '@libs/components/intro-overlay/intro-overlay.component';
import { JourneyBarComponent } from '@libs/components/journey-bar/journey-bar.component';
import { NightSkyComponent } from '@libs/components/night-sky/night-sky.component';
import { SnowfallComponent } from '@libs/components/snowfall/snowfall.component';
import { SparkleBurstsComponent } from '@libs/components/sparkle-bursts/sparkle-bursts.component';
import { TiltOnHoverDirective } from '@libs/directives/tilt-on-hover.directive';
import { buildCountdownSummary } from '@libs/helpers/countdown.helpers';
import { CountdownService } from '@libs/services/countdown.service';
import { SceneEffectsService } from '@libs/services/scene-effects.service';
import { ThemeService } from '@libs/services/theme.service';

@Component({
  selector: 'app-home',
  imports: [
    AdventCalendarComponent,
    FairyLightsComponent,
    FlipCardComponent,
    IntroOverlayComponent,
    JourneyBarComponent,
    NightSkyComponent,
    SnowfallComponent,
    SparkleBurstsComponent,
    TiltOnHoverDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: {
    '[class.is-show-playing]': 'sceneEffectsService.isShowPlaying()',
    '(pointerdown)': 'onPointerDown()',
  },
})
export class HomeComponent {
  readonly countdownService = inject(CountdownService);
  readonly themeService = inject(ThemeService);
  readonly sceneEffectsService = inject(SceneEffectsService);

  readonly countdownSummary = computed(() =>
    buildCountdownSummary(this.countdownService.countdown()),
  );
  readonly isDarkTheme = computed(() => this.themeService.theme() === 'dark');
  readonly themeToggleLabel = computed(() =>
    this.isDarkTheme() ? 'Switch to Christmas Eve sunset' : 'Switch to winter night',
  );

  // While a magic show is playing, any tap skips it and brings the page back.
  onPointerDown(): void {
    if (this.sceneEffectsService.isShowPlaying()) {
      this.sceneEffectsService.stop();
    }
  }
}
