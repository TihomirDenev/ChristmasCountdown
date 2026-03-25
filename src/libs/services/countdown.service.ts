import { Injectable, OnDestroy, signal } from '@angular/core';

import { CountdownTime } from '@libs/models/countdown-time.model';
import { CHRISTMAS_DAY, CHRISTMAS_MONTH, COUNTDOWN_INTERVAL_MS } from '@libs/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class CountdownService implements OnDestroy {
  readonly countdown = signal<CountdownTime>({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  readonly isChristmas = signal(false);
  readonly christmasYear = signal(new Date().getFullYear());
  readonly currentYear = signal(new Date().getFullYear());

  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    this.update();
    this.intervalId = setInterval(() => this.update(), COUNTDOWN_INTERVAL_MS);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private getNextChristmas(): Date {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, CHRISTMAS_MONTH, CHRISTMAS_DAY);

    if (now > christmas) {
      return new Date(currentYear + 1, CHRISTMAS_MONTH, CHRISTMAS_DAY);
    }

    return christmas;
  }

  private update(): void {
    const now = new Date();
    const christmas = this.getNextChristmas();
    const diff = christmas.getTime() - now.getTime();

    this.christmasYear.set(christmas.getFullYear());

    if (diff <= 0) {
      this.isChristmas.set(true);
      this.countdown.set({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const weeks = Math.floor(days / 7);

    this.isChristmas.set(false);
    this.countdown.set({ weeks, days, hours, minutes, seconds });
  }
}
