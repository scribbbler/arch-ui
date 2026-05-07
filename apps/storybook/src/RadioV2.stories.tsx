import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioV2 } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/RadioV2',
  component: RadioV2,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof RadioV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option A',
    name: 'options',
    value: 'a',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Option A',
    description: 'This is the first option with a longer description.',
    name: 'options',
    value: 'a',
  },
};

export const Checked: Story = {
  args: {
    label: 'Option A',
    checked: true,
    name: 'options',
    value: 'a',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Option A',
    disabled: true,
    name: 'options',
    value: 'a',
  },
};

export const Error: Story = {
  args: {
    label: 'Option A',
    error: true,
    name: 'options',
    value: 'a',
  },
};
