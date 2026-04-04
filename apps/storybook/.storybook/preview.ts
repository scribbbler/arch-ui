import type { Preview } from '@storybook/react';
import '../../../packages/tokens/build/css/tokens.css';
import './overrides.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Text direction',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
    reducedMotion: {
      description: 'Reduced motion',
      toolbar: {
        title: 'Motion',
        icon: 'lightning',
        items: [
          { value: 'no-preference', title: 'Motion on' },
          { value: 'reduce', title: 'Reduced motion' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    direction: 'ltr',
    reducedMotion: 'no-preference',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const direction = context.globals.direction || 'ltr';
      const reducedMotion = context.globals.reducedMotion || 'no-preference';

      document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
      document.documentElement.setAttribute('dir', direction);
      document.documentElement.classList.toggle('reduce-motion', reducedMotion === 'reduce');

      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['*', ['Docs', '*']],
      },
    },
  },
};

export default preview;
