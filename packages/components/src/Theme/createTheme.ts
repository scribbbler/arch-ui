import type { Theme, ThemePrimitives, ThemeOverrides } from './types';

/**
 * Maps high-level primitives to the actual CSS custom property names.
 * This allows consumers to set `primaryColor` once and have it cascade
 * to all action/button/link tokens.
 */
function primitivesToOverrides(primitives: ThemePrimitives): ThemeOverrides {
  const overrides: ThemeOverrides = {};

  if (primitives.primaryColor) {
    overrides['color-action-primary'] = primitives.primaryColor;
    overrides['color-background-primary'] = primitives.primaryColor;
  }
  if (primitives.primaryColorHover) {
    overrides['color-action-primary-hover'] = primitives.primaryColorHover;
  }
  if (primitives.primaryColorActive) {
    overrides['color-action-primary-active'] = primitives.primaryColorActive;
  }
  if (primitives.primaryColorText) {
    overrides['color-action-primary-text'] = primitives.primaryColorText;
  }

  if (primitives.successColor) {
    overrides['color-feedback-success-bg'] = primitives.successColor;
  }
  if (primitives.warningColor) {
    overrides['color-feedback-warning-bg'] = primitives.warningColor;
  }
  if (primitives.dangerColor) {
    overrides['color-feedback-danger-bg'] = primitives.dangerColor;
  }
  if (primitives.infoColor) {
    overrides['color-feedback-info-bg'] = primitives.infoColor;
  }

  if (primitives.fontFamily) {
    overrides['typography-family-sans'] = primitives.fontFamily;
  }
  if (primitives.monoFontFamily) {
    overrides['typography-family-mono'] = primitives.monoFontFamily;
  }

  if (primitives.baseRadius) {
    overrides['radius-component-sm'] = primitives.baseRadius;
    overrides['radius-component-md'] = primitives.baseRadius;
  }

  return overrides;
}

/**
 * Create a theme object from primitives and/or direct overrides.
 */
export function createTheme(config: Omit<Theme, 'name'> & { name?: string }): Theme {
  return {
    name: config.name ?? 'Custom Theme',
    colorScheme: config.colorScheme,
    primitives: config.primitives,
    overrides: {
      ...primitivesToOverrides(config.primitives ?? {}),
      ...(config.overrides ?? {}),
    },
  };
}

/**
 * Convert a theme to a CSS custom properties string.
 * Useful for generating a CSS file from a theme.
 */
export function themeToCSS(theme: Theme, selector: string = ':root'): string {
  const overrides = theme.overrides ?? {};
  const lines = Object.entries(overrides).map(
    ([key, value]) => `  --${key}: ${value};`
  );
  if (lines.length === 0) return '';
  return `${selector} {\n${lines.join('\n')}\n}`;
}

/**
 * Convert a theme to a CSSProperties-compatible style object.
 * Used by ThemeProvider to apply as inline CSS variables.
 */
export function themeToStyleVars(theme: Theme): Record<string, string> {
  const overrides = theme.overrides ?? {};
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(overrides)) {
    vars[`--${key}`] = value;
  }
  return vars;
}
