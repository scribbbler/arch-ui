import { createTheme } from './createTheme';
import type { Theme } from './types';

export const LightTheme: Theme = createTheme({
  name: 'Arch Light',
  colorScheme: 'light',
});

export const DarkTheme: Theme = createTheme({
  name: 'Arch Dark',
  colorScheme: 'dark',
});
