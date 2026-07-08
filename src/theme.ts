/**
 * Minimalistisch thema: veel witruimte, rustige tinten, focus op de kaarten.
 */
export const theme = {
  colors: {
    background: '#faf7f2',
    surface: '#ffffff',
    ink: '#2b2a33',
    inkSoft: '#7d7a8c',
    accent: '#6c5ce7',
    accentSoft: '#eceafd',
    success: '#2e9e6b',
    danger: '#c0574f',
    border: '#e8e4dc',
    gold: '#d9a441',
  },
  radius: {
    card: 18,
    button: 14,
    chip: 999,
  },
  spacing: (n: number) => n * 8,
  font: {
    title: 30,
    heading: 22,
    body: 16,
    small: 13,
  },
} as const;
