import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fromEvent } from 'rxjs';

import { TILT_MAX_DEGREES } from '@libs/constants/app.constants';
import { prefersReducedMotion } from '@libs/helpers/motion.helpers';

/** Tilts the element in 3D towards the mouse pointer while hovering. */
@Directive({
  selector: '[appTiltOnHover]',
  host: { class: 'tilt-on-hover' },
})
export class TiltOnHoverDirective {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (prefersReducedMotion()) {
      return;
    }

    const element = this.elementRef.nativeElement;

    fromEvent<PointerEvent>(element, 'pointermove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.tiltTowardsPointer(event));

    fromEvent(element, 'pointerleave')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.resetTilt());
  }

  private tiltTowardsPointer(event: PointerEvent): void {
    const element = this.elementRef.nativeElement;
    const bounds = element.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    const rotateX = -pointerY * TILT_MAX_DEGREES;
    const rotateY = pointerX * TILT_MAX_DEGREES;

    element.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  }

  private resetTilt(): void {
    this.elementRef.nativeElement.style.transform = '';
  }
}
