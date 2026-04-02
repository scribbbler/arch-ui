import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SkipNav } from '@arch-ui/components';

const meta = {
  title: 'Accessibility/SkipNav',
  component: SkipNav,
} satisfies Meta<typeof SkipNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div>
        <p style={{ marginBottom: 8, fontSize: 14, color: '#666' }}>
          Press Tab to reveal the skip navigation link.
        </p>
        <Story />
        <main id="main-content">
          <p>Main content area</p>
        </main>
      </div>
    ),
  ],
};

export const CustomTargetId: Story = {
  args: {
    targetId: 'app-content',
    children: 'Skip to app content',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div id="app-content">
          <p>App content area</p>
        </div>
      </div>
    ),
  ],
};
