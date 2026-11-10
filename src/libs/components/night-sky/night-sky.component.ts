import { Component, DestroyRef, ElementRef, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fromEvent } from 'rxjs';

import { SantaSleighComponent } from '@libs/components/santa-sleigh/santa-sleigh.component';
import {
  FAR_TREE_COUNT,
  NEAR_TREE_COUNT,
  PARALLAX_STRENGTH_PX,
  SHOOTING_STAR_COUNT,
  STAR_COUNT,
} from '@libs/constants/app.constants';
import {
  FOREST_HILL_PATH,
  MOUNTAIN_POINTS,
  SMOKE_PUFF_DELAYS_S,
  SNOW_GROUND_PATH,
  SNOW_GROUND_SHADOW_PATH,
  VILLAGE_HOUSES,
} from '@libs/constants/landscape.constants';
import { METEOR_COUNT } from '@libs/constants/scene-shows.constants';
import {
  buildMeteors,
  buildMountainPath,
  buildPineTrees,
  buildShootingStars,
  buildSkyStars,
  buildSnowCapPolygons,
} from '@libs/helpers/night-sky.helpers';
import { prefersReducedMotion } from '@libs/helpers/motion.helpers';
import { SceneEffectsService } from '@libs/services/scene-effects.service';

@Component({
  selector: 'app-night-sky',
  imports: [SantaSleighComponent],
  templateUrl: './night-sky.component.html',
  styleUrl: './night-sky.component.scss',
  host: {
    'aria-hidden': 'true',
    '[class.effect-aurora-flare]': "sceneEffectsService.isActive('aurora-flare')",
    '[class.effect-village-glow]': "sceneEffectsService.isActive('village-glow')",
    '[class.effect-supermoon]': "sceneEffectsService.isActive('supermoon')",
    '[class.effect-starburst]': "sceneEffectsService.isActive('starburst')",
    '[class.effect-snow-globe]': "sceneEffectsService.isActive('snow-globe')",
  },
})
export class NightSkyComponent {
  readonly sceneEffectsService = inject(SceneEffectsService);

  readonly forestHillPath = FOREST_HILL_PATH;
  readonly snowGroundPath = SNOW_GROUND_PATH;
  readonly snowGroundShadowPath = SNOW_GROUND_SHADOW_PATH;
  readonly villageHouses = VILLAGE_HOUSES;
  readonly smokePuffDelays = SMOKE_PUFF_DELAYS_S;

  readonly stars = buildSkyStars(STAR_COUNT);
  readonly shootingStars = buildShootingStars(SHOOTING_STAR_COUNT);
  readonly mountainPath = buildMountainPath(MOUNTAIN_POINTS);
  readonly mountainSnowCaps = buildSnowCapPolygons(MOUNTAIN_POINTS);
  readonly farTrees = buildPineTrees({
    count: FAR_TREE_COUNT,
    xRanges: [[-20, 1620]],
    baseYRange: [292, 330],
    scaleRange: [0.42, 0.8],
  });
  readonly nearTrees = buildPineTrees({
    count: NEAR_TREE_COUNT,
    xRanges: [
      [-40, 300],
      [1440, 1640],
    ],
    baseYRange: [372, 410],
    scaleRange: [1.1, 1.9],
  });
  readonly meteors = computed(() =>
    this.sceneEffectsService.isActive('meteor-shower') ? buildMeteors(METEOR_COUNT) : [],
  );

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (!prefersReducedMotion()) {
      this.followPointerForParallax();
    }
  }

  // Listening outside the template keeps 60fps pointer updates from running change detection.
  private followPointerForParallax(): void {
    fromEvent<PointerEvent>(window, 'pointermove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.updateParallax(event));
  }

  private updateParallax(event: PointerEvent): void {
    const pointerX = event.clientX / window.innerWidth - 0.5;
    const pointerY = event.clientY / window.innerHeight - 0.5;
    const hostStyle = this.elementRef.nativeElement.style;

    hostStyle.setProperty('--parallax-x', `${(pointerX * PARALLAX_STRENGTH_PX).toFixed(2)}px`);
    hostStyle.setProperty('--parallax-y', `${(pointerY * PARALLAX_STRENGTH_PX).toFixed(2)}px`);
  }
}
