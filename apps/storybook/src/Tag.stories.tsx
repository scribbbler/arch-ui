import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@arch-ui/components';

const meta = {
  title: 'Indicators and Status/Tag',
  component: Tag,
  args: {
    children: 'Tag',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Neutral' },
};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
};

export const WithIcon: Story = {
  args: {
    variant: 'info',
    children: 'Design',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
};

export const WithOnRemove: Story = {
  args: {
    variant: 'success',
    children: 'React',
    onRemove: () => {},
  },
};

export const WithIconAndOnRemove: Story = {
  args: {
    variant: 'primary',
    children: 'Starred',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M6 1l1.5 3.5H11L8.5 7l1 3.5L6 8.5 2.5 10.5l1-3.5L1 4.5h3.5z" fill="currentColor" />
      </svg>
    ),
    onRemove: () => {},
  },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: {
    variant: 'info',
    children: 'Removable',
    onRemove: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'The remove button has aria-label="Remove {children}". It is focusable via Tab and activated with Enter or Space. The icon slot is aria-hidden.',
      },
    },
  },
};
