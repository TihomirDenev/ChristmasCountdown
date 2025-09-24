import { Injectable, signal, computed, effect } from '@angular/core';
import { ChristmasTheme, CHRISTMAS_THEMES, DEFAULT_THEME } from './themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'christmas-countdown-theme';
  
  // Current theme signal
  private currentThemeId = signal(this.getStoredTheme());
  
  // Computed theme object
  public readonly currentTheme = computed(() => 
    CHRISTMAS_THEMES.find(theme => theme.id === this.currentThemeId()) || CHRISTMAS_THEMES[0]
  );
  
  // Available themes
  public readonly themes = CHRISTMAS_THEMES;
  
  constructor() {
    // Effect to apply theme styles and save to localStorage
    effect(() => {
      const theme = this.currentTheme();
      this.applyThemeToDocument(theme);
      this.saveThemeToStorage(theme.id);
    });
  }
  
  /**
   * Switch to a specific theme
   */
  setTheme(themeId: string): void {
    const theme = CHRISTMAS_THEMES.find(t => t.id === themeId);
    if (theme) {
      this.currentThemeId.set(themeId);
    }
  }
  
  /**
   * Get the next theme in rotation
   */
  getNextTheme(): ChristmasTheme {
    const currentIndex = CHRISTMAS_THEMES.findIndex(t => t.id === this.currentThemeId());
    const nextIndex = (currentIndex + 1) % CHRISTMAS_THEMES.length;
    return CHRISTMAS_THEMES[nextIndex];
  }
  
  /**
   * Switch to the next theme
   */
  switchToNextTheme(): void {
    const nextTheme = this.getNextTheme();
    this.setTheme(nextTheme.id);
  }
  
  /**
   * Apply theme CSS custom properties to document root
   */
  private applyThemeToDocument(theme: ChristmasTheme): void {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--theme-background', theme.colors.background);
    root.style.setProperty('--theme-container-bg', theme.colors.containerBg);
    root.style.setProperty('--theme-primary-text', theme.colors.primaryText);
    root.style.setProperty('--theme-secondary-text', theme.colors.secondaryText);
    root.style.setProperty('--theme-accent-color', theme.colors.accentColor);
    root.style.setProperty('--theme-card-bg', theme.colors.cardBg);
    root.style.setProperty('--theme-card-border', theme.colors.cardBorder);
    root.style.setProperty('--theme-snowflake-color', theme.colors.snowflakeColor);
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme.id}`);
  }
  
  /**
   * Get stored theme from localStorage
   */
  private getStoredTheme(): string {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.THEME_STORAGE_KEY);
      if (stored && CHRISTMAS_THEMES.some(theme => theme.id === stored)) {
        return stored;
      }
    }
    return DEFAULT_THEME;
  }
  
  /**
   * Save theme to localStorage
   */
  private saveThemeToStorage(themeId: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.THEME_STORAGE_KEY, themeId);
    }
  }
}