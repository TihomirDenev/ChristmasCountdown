import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  untracked,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fromEvent } from 'rxjs';

import {
  SNOW_MAX_FLAKES,
  SNOW_MIN_FLAKES,
  SNOW_PIXELS_PER_FLAKE,
  SNOW_POINTER_FORCE,
  SNOW_POINTER_RADIUS_PX,
} from '@libs/constants/app.constants';
import { prefersReducedMotion } from '@libs/helpers/motion.helpers';
import { randomBetween } from '@libs/helpers/random.helpers';
import { SnowParticle } from '@libs/models/snow-particle.model';
import { SceneEffectsService } from '@libs/services/scene-effects.service';

const FLAKE_SPRITE_SIZE_PX = 64;
const FRAME_DURATION_MS = 1000 / 60;
const MAX_FRAME_STEPS = 3;
const OFFSCREEN_POINTER = -9999;
const WHITE_FLAKE_RGB = '255, 255, 255';
const GOLD_FLAKE_RGB = '255, 214, 110';
const PUSH_FADE_PER_FRAME = 0.96;
const STORM_WIND_STRENGTH = 7;
const STORM_FALL_BOOST = 2.5;
const STORM_EXTRA_FLAKES = 1.5;
const STORM_STREAK_LENGTH = 3;
// How quickly the storm builds up and calms down (0 = never, 1 = instantly).
const STORM_EASING = 0.03;

@Component({
  selector: 'app-snowfall',
  templateUrl: './snowfall.component.html',
  styleUrl: './snowfall.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class SnowfallComponent {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('snowCanvas');
  private readonly destroyRef = inject(DestroyRef);
  private readonly sceneEffectsService = inject(SceneEffectsService);

  private context: CanvasRenderingContext2D | null = null;
  private whiteFlakeSprite: HTMLCanvasElement | null = null;
  private goldFlakeSprite: HTMLCanvasElement | null = null;
  private particles: SnowParticle[] = [];
  private viewportWidth = 0;
  private viewportHeight = 0;
  private pointerX = OFFSCREEN_POINTER;
  private pointerY = OFFSCREEN_POINTER;
  private animationFrameId = 0;
  private lastFrameTime = 0;
  /** 0 = calm, 1 = full snowstorm. Eases between the two so the storm builds up naturally. */
  private stormIntensity = 0;

  constructor() {
    afterNextRender(() => this.startSnowfall());
    this.destroyRef.onDestroy(() => cancelAnimationFrame(this.animationFrameId));
    this.shakeFlakesWhenSnowGlobePlays();
  }

  private shakeFlakesWhenSnowGlobePlays(): void {
    effect(() => {
      if (this.sceneEffectsService.isActive('snow-globe')) {
        untracked(() => this.shakeSnowGlobe());
      }
    });
  }

  // Throws every flake upwards in a random direction, like shaking a real snow globe.
  private shakeSnowGlobe(): void {
    for (const particle of this.particles) {
      particle.pushX = randomBetween(-8, 8);
      particle.pushY = randomBetween(-11, -4) * particle.depth;
    }
  }

  private startSnowfall(): void {
    this.context = this.canvasRef().nativeElement.getContext('2d');
    this.whiteFlakeSprite = this.createFlakeSprite(WHITE_FLAKE_RGB);
    this.goldFlakeSprite = this.createFlakeSprite(GOLD_FLAKE_RGB);
    this.resizeCanvas();
    this.listenToWindowEvents();

    if (prefersReducedMotion()) {
      return;
    }

    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
  }

  private listenToWindowEvents(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.resizeCanvas());

    fromEvent<PointerEvent>(window, 'pointermove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.pointerX = event.clientX;
        this.pointerY = event.clientY;
      });

    fromEvent(document, 'pointerleave')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.pointerX = OFFSCREEN_POINTER;
        this.pointerY = OFFSCREEN_POINTER;
      });
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    canvas.width = this.viewportWidth * pixelRatio;
    canvas.height = this.viewportHeight * pixelRatio;
    this.context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    this.adjustParticleCount(this.getFlakeCount());
    this.drawFrame();
  }

  // A snowstorm temporarily adds extra flakes; they are removed again as it calms down.
  private getFlakeCountForWeather(): number {
    return Math.round(this.getFlakeCount() * (1 + this.stormIntensity * STORM_EXTRA_FLAKES));
  }

  // Keeping existing flakes on resize avoids a visible "reset" when mobile toolbars hide/show.
  private adjustParticleCount(targetCount: number): void {
    if (this.particles.length > targetCount) {
      this.particles = this.particles.slice(0, targetCount);
      return;
    }

    const missingCount = targetCount - this.particles.length;
    this.particles.push(...this.createParticles(missingCount));
  }

  private getFlakeCount(): number {
    const flakeCount = Math.round(
      (this.viewportWidth * this.viewportHeight) / SNOW_PIXELS_PER_FLAKE,
    );
    return Math.min(SNOW_MAX_FLAKES, Math.max(SNOW_MIN_FLAKES, flakeCount));
  }

  private createParticles(count: number): SnowParticle[] {
    return Array.from({ length: count }, () =>
      this.createParticle(randomBetween(0, this.viewportHeight)),
    );
  }

  // Depth drives everything: closer flakes are bigger, brighter and fall faster.
  private createParticle(startY: number): SnowParticle {
    const depth = randomBetween(0.25, 1);

    return {
      x: randomBetween(0, this.viewportWidth),
      y: startY,
      radius: 0.8 + depth * 3,
      depth,
      fallSpeed: 0.35 + depth * 1.4,
      swayPhase: randomBetween(0, Math.PI * 2),
      swaySpeed: randomBetween(0.01, 0.03),
      opacity: 0.3 + depth * 0.65,
      pushX: 0,
      pushY: 0,
    };
  }

  private animate(time: number): void {
    const elapsedMs = this.lastFrameTime ? time - this.lastFrameTime : FRAME_DURATION_MS;
    const frameSteps = Math.min(elapsedMs / FRAME_DURATION_MS, MAX_FRAME_STEPS);
    this.lastFrameTime = time;

    this.updateParticles(frameSteps, time);
    this.adjustParticleCount(this.getFlakeCountForWeather());
    this.drawFrame();

    this.animationFrameId = requestAnimationFrame((nextTime) => this.animate(nextTime));
  }

  private updateParticles(frameSteps: number, time: number): void {
    const stormTarget = this.sceneEffectsService.isActive('snowstorm') ? 1 : 0;
    this.stormIntensity += (stormTarget - this.stormIntensity) * STORM_EASING * frameSteps;

    // A slow gust of wind that changes direction over time, much stronger during a storm.
    const gentleWind = Math.sin(time / 4000) * 0.6 + Math.sin(time / 9000) * 0.3;
    const wind = gentleWind + this.stormIntensity * STORM_WIND_STRENGTH;
    const fallBoost = 1 + this.stormIntensity * STORM_FALL_BOOST;
    const pushFade = Math.pow(PUSH_FADE_PER_FRAME, frameSteps);

    for (const particle of this.particles) {
      particle.swayPhase += particle.swaySpeed * frameSteps;
      particle.x += (wind + Math.sin(particle.swayPhase) * 0.5) * particle.depth * frameSteps;
      particle.y += particle.fallSpeed * fallBoost * frameSteps;

      particle.x += particle.pushX * frameSteps;
      particle.y += particle.pushY * frameSteps;
      particle.pushX *= pushFade;
      particle.pushY *= pushFade;

      this.pushAwayFromPointer(particle, frameSteps);
      this.wrapAroundEdges(particle);
    }
  }

  private pushAwayFromPointer(particle: SnowParticle, frameSteps: number): void {
    const distanceX = particle.x - this.pointerX;
    const distanceY = particle.y - this.pointerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance === 0 || distance > SNOW_POINTER_RADIUS_PX) {
      return;
    }

    const strength = (1 - distance / SNOW_POINTER_RADIUS_PX) * SNOW_POINTER_FORCE * particle.depth;
    particle.x += (distanceX / distance) * strength * frameSteps;
    particle.y += (distanceY / distance) * strength * 0.5 * frameSteps;
  }

  private wrapAroundEdges(particle: SnowParticle): void {
    const margin = 20;

    if (particle.y > this.viewportHeight + margin) {
      Object.assign(particle, this.createParticle(-margin));
    }

    if (particle.x > this.viewportWidth + margin) {
      particle.x = -margin;
    } else if (particle.x < -margin) {
      particle.x = this.viewportWidth + margin;
    }
  }

  private drawFrame(): void {
    const flakeSprite = this.sceneEffectsService.isActive('golden-snow')
      ? this.goldFlakeSprite
      : this.whiteFlakeSprite;

    if (!this.context || !flakeSprite) {
      return;
    }

    this.context.clearRect(0, 0, this.viewportWidth, this.viewportHeight);

    // During a storm flakes are stretched sideways, which reads as motion blur.
    const streakFactor = 1 + this.stormIntensity * STORM_STREAK_LENGTH;

    for (const particle of this.particles) {
      // The sprite has a soft halo, so it is drawn larger than the flake itself.
      const spriteSize = particle.radius * 4;
      const spriteWidth = spriteSize * streakFactor;
      this.context.globalAlpha = particle.opacity;
      this.context.drawImage(
        flakeSprite,
        particle.x - spriteWidth / 2,
        particle.y - spriteSize / 2,
        spriteWidth,
        spriteSize,
      );
    }

    this.context.globalAlpha = 1;
  }

  // Drawing a pre-rendered glowing dot is much faster than drawing a gradient per flake.
  private createFlakeSprite(rgb: string): HTMLCanvasElement {
    const sprite = document.createElement('canvas');
    sprite.width = FLAKE_SPRITE_SIZE_PX;
    sprite.height = FLAKE_SPRITE_SIZE_PX;

    const spriteContext = sprite.getContext('2d');
    const center = FLAKE_SPRITE_SIZE_PX / 2;

    if (spriteContext) {
      const glow = spriteContext.createRadialGradient(center, center, 0, center, center, center);
      glow.addColorStop(0, `rgba(${rgb}, 1)`);
      glow.addColorStop(0.25, `rgba(${rgb}, 0.85)`);
      glow.addColorStop(0.5, `rgba(${rgb}, 0.18)`);
      glow.addColorStop(1, `rgba(${rgb}, 0)`);
      spriteContext.fillStyle = glow;
      spriteContext.fillRect(0, 0, FLAKE_SPRITE_SIZE_PX, FLAKE_SPRITE_SIZE_PX);
    }

    return sprite;
  }
}
