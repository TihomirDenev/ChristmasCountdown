import { Injectable, OnDestroy, signal } from '@angular/core';

import { CountdownTime } from '@libs/models/countdown-time.model';
import {
  CHRISTMAS_DAY,
  CHRISTMAS_MONTH,
  COUNTDOWN_INTERVAL_MS,
} from '@libs/constants/app.constants';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = MS_PER_SECOND * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;

@Injectable({ providedIn: 'root' })
export class CountdownService implements OnDestroy {
  readonly countdown = signal<CountdownTime>({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  readonly isChristmas = signal(false);
  readonly christmasYear = signal(new Date().getFullYear());
  readonly currentYear = signal(new Date().getFullYear());
  readonly now = signal(new Date());
  /** How far we are between last Christmas and the next one, from 0 to 100. */
  readonly journeyProgress = signal(0);

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

  private update(): void {
    const now = new Date();
    this.now.set(now);
    this.currentYear.set(now.getFullYear());

    if (this.isChristmasDay(now)) {
      this.showChristmasDay(now);
      return;
    }

    const nextChristmas = this.getNextChristmas(now);
    const previousChristmas = this.getChristmasOfYear(nextChristmas.getFullYear() - 1);

    this.isChristmas.set(false);
    this.christmasYear.set(nextChristmas.getFullYear());
    this.countdown.set(this.calculateCountdown(nextChristmas.getTime() - now.getTime()));
    this.journeyProgress.set(this.calculateJourneyProgress(previousChristmas, nextChristmas, now));
  }

  private showChristmasDay(now: Date): void {
    this.isChristmas.set(true);
    this.christmasYear.set(now.getFullYear());
    this.countdown.set({ weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    this.journeyProgress.set(100);
  }

  private isChristmasDay(now: Date): boolean {
    return now.getMonth() === CHRISTMAS_MONTH && now.getDate() === CHRISTMAS_DAY;
  }

  private getNextChristmas(now: Date): Date {
    const christmasThisYear = this.getChristmasOfYear(now.getFullYear());

    if (now > christmasThisYear) {
      return this.getChristmasOfYear(now.getFullYear() + 1);
    }

    return christmasThisYear;
  }

  private getChristmasOfYear(year: number): Date {
    return new Date(year, CHRISTMAS_MONTH, CHRISTMAS_DAY);
  }

  private calculateCountdown(remainingMs: number): CountdownTime {
    const days = Math.floor(remainingMs / MS_PER_DAY);

    return {
      weeks: Math.floor(days / 7),
      days,
      hours: Math.floor((remainingMs % MS_PER_DAY) / MS_PER_HOUR),
      minutes: Math.floor((remainingMs % MS_PER_HOUR) / MS_PER_MINUTE),
      seconds: Math.floor((remainingMs % MS_PER_MINUTE) / MS_PER_SECOND),
    };
  }

  private calculateJourneyProgress(
    previousChristmas: Date,
    nextChristmas: Date,
    now: Date,
  ): number {
    const journeyLength = nextChristmas.getTime() - previousChristmas.getTime();
    const travelled = now.getTime() - previousChristmas.getTime();

    return (travelled / journeyLength) * 100;
  }
}
