import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup, Checkbox } from '@arch-ui/components';

const meta = {
  title: 'Forms/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    legend: 'Preferred contact method',
    children: (
      <>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="phone">Phone</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    legend: 'Interests',
    direction: 'horizontal',
    children: (
      <>
        <Checkbox value="design">Design</Checkbox>
        <Checkbox value="engineering">Engineering</Checkbox>
        <Checkbox value="product">Product</Checkbox>
      </>
    ),
  },
};

export const DisabledGroup: Story = {
  args: {
    legend: 'Notifications (disabled)',
    disabled: true,
    children: (
      <>
        <Checkbox value="push">Push</Checkbox>
        <Checkbox value="email">Email</Checkbox>
        <Checkbox value="sms">SMS</Checkbox>
      </>
    ),
  },
};
