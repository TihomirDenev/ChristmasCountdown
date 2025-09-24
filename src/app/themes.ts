export interface ChristmasTheme {
  id: string;
  name: string;
  icon: string;
  colors: {
    background: string;
    containerBg: string;
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    cardBg: string;
    cardBorder: string;
    snowflakeColor: string;
  };
}

export const CHRISTMAS_THEMES: ChristmasTheme[] = [
  {
    id: 'winter-wonderland',
    name: 'Winter Wonderland',
    icon: '❄️',
    colors: {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      containerBg: 'rgba(255, 255, 255, 0.1)',
      primaryText: '#ffffff',
      secondaryText: '#f0f8ff',
      accentColor: '#ffd700',
      cardBg: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      cardBorder: 'rgba(255, 255, 255, 0.2)',
      snowflakeColor: '#ffffff'
    }
  },
  {
    id: 'classic-christmas',
    name: 'Classic Christmas',
    icon: '🎄',
    colors: {
      background: 'linear-gradient(135deg, #0d4d0d 0%, #1a6b1a 50%, #2e7d2e 100%)',
      containerBg: 'rgba(255, 255, 255, 0.1)',
      primaryText: '#ffffff',
      secondaryText: '#f0fff0',
      accentColor: '#ff4444',
      cardBg: 'linear-gradient(145deg, rgba(255, 68, 68, 0.2), rgba(34, 139, 34, 0.2))',
      cardBorder: 'rgba(255, 255, 255, 0.2)',
      snowflakeColor: '#ffffff'
    }
  },
  {
    id: 'golden-elegance',
    name: 'Golden Elegance',
    icon: '✨',
    colors: {
      background: 'linear-gradient(135deg, #2d1b0e 0%, #4a2c17 50%, #6b3e20 100%)',
      containerBg: 'rgba(255, 215, 0, 0.1)',
      primaryText: '#ffd700',
      secondaryText: '#fff8dc',
      accentColor: '#ff6b35',
      cardBg: 'linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))',
      cardBorder: 'rgba(255, 215, 0, 0.3)',
      snowflakeColor: '#ffd700'
    }
  }
];

export const DEFAULT_THEME = CHRISTMAS_THEMES[0].id;