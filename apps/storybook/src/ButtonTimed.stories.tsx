import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonTimed } from '@arch-ui/components';

const meta = {
  title: 'Buttons/ButtonTimed',
  component: ButtonTimed,
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'dangerPrimary', 'dangerSecondary', 'dangerTertiary'],
    },
    size: { control: 'select', options: ['mini', 'compact', 'default', 'large'] },
    initialTime: { control: 'number' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ButtonTimed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialTime: 5,
    onTimeout: () => console.log('Timed out'),
    children: 'Undo',
  },
};

export const DangerPrimary: Story = {
  args: {
    initialTime: 10,
    kind: 'dangerPrimary',
    onTimeout: () => console.log('Timed out'),
    children: 'Delete',
  },
};
