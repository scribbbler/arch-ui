import React, { createContext, useContext, useEffect } from 'react';
import type { Theme } from './types';
import { themeToStyleVars } from './createTheme';

const ThemeContext = createContext<Theme | null>(null);

export interface ThemeProviderProps {
  /** The theme to apply */
  theme: Theme;
  /** Apply to document root instead of a wrapper div. Default false. */
  applyToRoot?: boolean;
  children: React.ReactNode;
}

/**
 * ThemeProvider
 *
 * Applies theme CSS variable overrides to a wrapper element or to
 * the document root. Also sets `data-theme` attribute for dark mode.
 *
 * @example
 * const myTheme = createTheme({
 *   colorScheme: 'light',
 *   primitives: { primaryColor: '#E11900' },
 * });
 *
 * <ThemeProvider theme={myTheme}>
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ theme, applyToRoot = false, children }: ThemeProviderProps) {
  const vars = themeToStyleVars(theme);

  useEffect(() => {
    if (!applyToRoot) return;
    const root = document.documentElement;
    const previousValues: Record<string, string> = {};

    // Set data-theme for dark mode
    const prevTheme = root.getAttribute('data-theme');
    if (theme.colorScheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    }

    // Apply CSS variable overrides
    for (const [prop, value] of Object.entries(vars)) {
      previousValues[prop] = root.style.getPropertyValue(prop);
      root.style.setProperty(prop, value);
    }

    return () => {
      // Restore previous values on unmount
      if (prevTheme !== null) {
        root.setAttribute('data-theme', prevTheme);
      } else {
        root.removeAttribute('data-theme');
      }
      root.classList.remove('dark');
      for (const [prop, prevValue] of Object.entries(previousValues)) {
        if (prevValue) {
          root.style.setProperty(prop, prevValue);
        } else {
          root.style.removeProperty(prop);
        }
      }
    };
  }, [applyToRoot, theme, vars]);

  if (applyToRoot) {
    return (
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={vars as React.CSSProperties}
        data-theme={theme.colorScheme === 'dark' ? 'dark' : undefined}
        className={theme.colorScheme === 'dark' ? 'dark' : undefined}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme.
 * Returns null if no ThemeProvider is present.
 */
export function useTheme(): Theme | null {
  return useContext(ThemeContext);
}

export { ThemeContext };
