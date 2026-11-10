import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-journey-bar',
  imports: [DecimalPipe],
  templateUrl: './journey-bar.component.html',
  styleUrl: './journey-bar.component.scss',
})
export class JourneyBarComponent {
  /** Percentage of the way from last Christmas to the next one (0 - 100). */
  readonly progress = input.required<number>();
  readonly christmasYear = input.required<number>();

  readonly previousChristmasYear = computed(() => this.christmasYear() - 1);
}
