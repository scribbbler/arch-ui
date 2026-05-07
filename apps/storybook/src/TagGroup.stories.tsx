import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TagGroup } from '@arch-ui/components';

const meta = {
  title: 'Indicators and Status/TagGroup',
  component: TagGroup,
  argTypes: {
    disabled: { control: 'boolean' },
    addLabel: { control: 'text' },
    onRemove: { action: 'onRemove' },
    onAdd: { action: 'onAdd' },
  },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTags = [
  { id: '1', label: 'React' },
  { id: '2', label: 'TypeScript', variant: 'info' as const },
  { id: '3', label: 'Storybook', variant: 'success' as const },
];

export const Default: Story = {
  args: {
    tags: sampleTags,
  },
};

export const WithAdd: Story = {
  args: {
    tags: sampleTags,
    addLabel: 'Add tag',
  },
};

export const Disabled: Story = {
  args: {
    tags: sampleTags,
    disabled: true,
  },
};
