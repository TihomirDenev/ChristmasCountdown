import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme.service';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  weeks: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  readonly title = signal('Christmas Countdown');
  countdown = signal<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0, weeks: 0 });
  protected isChristmas = signal(false);
  protected currentYear = signal(new Date().getFullYear());
  
  private intervalId?: number;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = window.setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  protected getChristmasYear(): number {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmas = new Date(currentYear, 11, 25);
    return now > christmas ? currentYear + 1 : currentYear;
  }

  protected switchTheme(): void {
    this.themeService.switchToNextTheme();
  }

  private updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25); // December 25th

    // If Christmas has passed this year, calculate for next year
    if (now > christmas) {
      christmas = new Date(currentYear + 1, 11, 25);
    }

    this.currentYear.set(christmas.getFullYear());

    const timeDifference = christmas.getTime() - now.getTime();

    if (timeDifference <= 0) {
      this.isChristmas.set(true);
      this.countdown.set({ days: 0, hours: 0, minutes: 0, seconds: 0, weeks: 0 });
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const weeks = Math.floor(days / 7);

    this.countdown.set({ days, hours, minutes, seconds, weeks });
    this.isChristmas.set(false);
  }
}
