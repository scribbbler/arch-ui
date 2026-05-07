import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxV2 } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/CheckboxV2',
  component: CheckboxV2,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof CheckboxV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Accept terms',
    description: 'By checking this you agree to our terms of service.',
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Accept terms',
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Accept terms',
    error: true,
  },
};
