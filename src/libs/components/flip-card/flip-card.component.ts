import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  imports: [NgTemplateOutlet],
  templateUrl: './flip-card.component.html',
  styleUrl: './flip-card.component.scss',
})
export class FlipCardComponent {
  readonly value = input.required<number>();
  readonly label = input.required<string>();
  readonly minDigits = input(2);

  readonly displayValue = computed(() => String(this.value()).padStart(this.minDigits(), '0'));

  // Remembers the value shown before the latest change, so the flap can flip from old to new.
  readonly previousDisplayValue = linkedSignal<string, string>({
    source: this.displayValue,
    computation: (currentValue, previous) => previous?.source ?? currentValue,
  });

  // Alternates on every change. Switching between the @if/@else branches re-creates the
  // flaps, which restarts their CSS flip animation.
  readonly isEvenFlip = linkedSignal<string, boolean>({
    source: this.displayValue,
    computation: (_currentValue, previous) => (previous ? !previous.value : true),
  });
}
