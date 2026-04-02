import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from '@arch-ui/components';

const meta = {
  title: 'Accessibility/VisuallyHidden',
  component: VisuallyHidden,
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This text is only visible to screen readers',
  },
  decorators: [
    (Story) => (
      <div>
        <p>There is hidden text between these two paragraphs (inspect the DOM to see it).</p>
        <Story />
        <p>End of visible content.</p>
      </div>
    ),
  ],
};

export const IconWithLabel: Story = {
  render: () => (
    <button type="button">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
      </svg>
      <VisuallyHidden>Add item</VisuallyHidden>
    </button>
  ),
};
