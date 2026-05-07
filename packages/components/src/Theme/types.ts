/**
 * Arch UI Theme Types
 *
 * Themes are partial overrides of CSS custom properties.
 * Only specify the tokens you want to change.
 */

export interface ThemePrimitives {
  // Brand colors
  primaryColor?: string;
  primaryColorHover?: string;
  primaryColorActive?: string;
  primaryColorText?: string;

  // Neutral palette
  black?: string;
  white?: string;
  gray50?: string;
  gray100?: string;
  gray200?: string;
  gray300?: string;
  gray400?: string;
  gray500?: string;
  gray600?: string;
  gray700?: string;
  gray800?: string;
  gray900?: string;

  // Feedback
  successColor?: string;
  warningColor?: string;
  dangerColor?: string;
  infoColor?: string;

  // Typography
  fontFamily?: string;
  monoFontFamily?: string;

  // Radius
  baseRadius?: string;
}

export interface ThemeOverrides {
  /** Override any CSS custom property. Keys are token names without the -- prefix. */
  [tokenName: string]: string;
}

export interface Theme {
  /** Human-readable name for the theme */
  name: string;
  /** Light or dark base */
  colorScheme: 'light' | 'dark';
  /** High-level brand primitives that map to multiple tokens */
  primitives?: ThemePrimitives;
  /** Direct token overrides (key = token name without --, value = CSS value) */
  overrides?: ThemeOverrides;
}
