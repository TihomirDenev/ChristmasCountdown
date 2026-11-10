import { Injectable, signal } from '@angular/core';

import { THEME_STORAGE_KEY } from '@libs/constants/app.constants';

export type Theme = 'dark' | 'festive';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.loadTheme());

  constructor() {
    this.applyTheme(this.theme());
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'festive' : 'dark';
    this.theme.set(next);
    this.applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private loadTheme(): Theme {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'festive' ? 'festive' : 'dark';
  }
}
