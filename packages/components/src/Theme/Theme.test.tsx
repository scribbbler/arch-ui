import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { createTheme, themeToCSS, themeToStyleVars } from './createTheme';
import type { Theme } from './types';

/* ─── createTheme ───────────────────────────────────────────────────────────── */

describe('createTheme', () => {
  it('returns a theme object with a default name', () => {
    const theme = createTheme({ colorScheme: 'light' });
    expect(theme.name).toBe('Custom Theme');
    expect(theme.colorScheme).toBe('light');
  });

  it('accepts a custom name', () => {
    const theme = createTheme({ name: 'My Brand', colorScheme: 'dark' });
    expect(theme.name).toBe('My Brand');
  });

  it('maps primaryColor primitive to action and background overrides', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { primaryColor: '#E11900' },
    });
    expect(theme.overrides?.['color-action-primary']).toBe('#E11900');
    expect(theme.overrides?.['color-background-primary']).toBe('#E11900');
  });

  it('maps primaryColorHover primitive', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { primaryColorHover: '#CC1600' },
    });
    expect(theme.overrides?.['color-action-primary-hover']).toBe('#CC1600');
  });

  it('maps fontFamily primitive to typography override', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { fontFamily: 'Inter, sans-serif' },
    });
    expect(theme.overrides?.['typography-family-sans']).toBe('Inter, sans-serif');
  });

  it('maps baseRadius to both sm and md radius tokens', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { baseRadius: '8px' },
    });
    expect(theme.overrides?.['radius-component-sm']).toBe('8px');
    expect(theme.overrides?.['radius-component-md']).toBe('8px');
  });

  it('allows direct overrides to take precedence over primitives', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { primaryColor: '#E11900' },
      overrides: { 'color-action-primary': '#0000FF' },
    });
    expect(theme.overrides?.['color-action-primary']).toBe('#0000FF');
  });

  it('maps feedback color primitives', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: {
        successColor: '#00A651',
        warningColor: '#FFA500',
        dangerColor: '#FF0000',
        infoColor: '#0070F3',
      },
    });
    expect(theme.overrides?.['color-feedback-success-bg']).toBe('#00A651');
    expect(theme.overrides?.['color-feedback-warning-bg']).toBe('#FFA500');
    expect(theme.overrides?.['color-feedback-danger-bg']).toBe('#FF0000');
    expect(theme.overrides?.['color-feedback-info-bg']).toBe('#0070F3');
  });
});

/* ─── themeToCSS ────────────────────────────────────────────────────────────── */

describe('themeToCSS', () => {
  it('generates a valid CSS string with :root selector by default', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { primaryColor: '#E11900' },
    });
    const css = themeToCSS(theme);
    expect(css).toContain(':root {');
    expect(css).toContain('--color-action-primary: #E11900;');
    expect(css).toContain('}');
  });

  it('accepts a custom selector', () => {
    const theme = createTheme({
      colorScheme: 'dark',
      primitives: { primaryColor: '#E11900' },
    });
    const css = themeToCSS(theme, '.dark-theme');
    expect(css).toContain('.dark-theme {');
  });

  it('returns empty string for theme with no overrides', () => {
    const theme: Theme = { name: 'Empty', colorScheme: 'light', overrides: {} };
    const css = themeToCSS(theme);
    expect(css).toBe('');
  });
});

/* ─── themeToStyleVars ──────────────────────────────────────────────────────── */

describe('themeToStyleVars', () => {
  it('generates CSS variable object with -- prefix', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { primaryColor: '#E11900' },
    });
    const vars = themeToStyleVars(theme);
    expect(vars['--color-action-primary']).toBe('#E11900');
    expect(vars['--color-background-primary']).toBe('#E11900');
  });

  it('returns an empty object for a theme with no overrides', () => {
    const theme: Theme = { name: 'Empty', colorScheme: 'light', overrides: {} };
    const vars = themeToStyleVars(theme);
    expect(Object.keys(vars)).toHaveLength(0);
  });
});

/* ─── useTheme ──────────────────────────────────────────────────────────────── */

describe('useTheme', () => {
  it('returns null without a ThemeProvider', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current).toBeNull();
  });

  it('returns the theme when inside a ThemeProvider', () => {
    const theme = createTheme({
      name: 'Test Theme',
      colorScheme: 'light',
      primitives: { primaryColor: '#E11900' },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current).not.toBeNull();
    expect(result.current?.name).toBe('Test Theme');
    expect(result.current?.colorScheme).toBe('light');
  });
});

/* ─── ThemeProvider ─────────────────────────────────────────────────────────── */

describe('ThemeProvider', () => {
  it('renders children', () => {
    const theme = createTheme({ colorScheme: 'light' });
    render(
      <ThemeProvider theme={theme}>
        <span>App content</span>
      </ThemeProvider>,
    );
    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('applies CSS variables as inline styles on wrapper div', () => {
    const theme = createTheme({
      colorScheme: 'light',
      primitives: { primaryColor: '#E11900' },
    });
    render(
      <ThemeProvider theme={theme}>
        <span data-testid="child">Content</span>
      </ThemeProvider>,
    );
    const wrapper = screen.getByTestId('child').parentElement!;
    expect(wrapper.style.getPropertyValue('--color-action-primary')).toBe('#E11900');
  });

  it('sets data-theme="dark" when colorScheme is dark', () => {
    const theme = createTheme({ colorScheme: 'dark' });
    render(
      <ThemeProvider theme={theme}>
        <span data-testid="child">Content</span>
      </ThemeProvider>,
    );
    const wrapper = screen.getByTestId('child').parentElement!;
    expect(wrapper).toHaveAttribute('data-theme', 'dark');
  });

  it('does not set data-theme for light themes', () => {
    const theme = createTheme({ colorScheme: 'light' });
    render(
      <ThemeProvider theme={theme}>
        <span data-testid="child">Content</span>
      </ThemeProvider>,
    );
    const wrapper = screen.getByTestId('child').parentElement!;
    expect(wrapper).not.toHaveAttribute('data-theme');
  });
});
