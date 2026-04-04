import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
} from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    isError: { control: 'boolean' },
    labelPlacement: { control: 'select', options: ['end', 'start'] },
  },
  args: {
    children: 'Accept terms and conditions',
    checked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Default: Story = {
  args: { checked: false },
};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled option' },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true, children: 'Disabled checked' },
};

export const ErrorState: Story = {
  decorators: [
    (Story) => (
      <FormControl id="checkbox-error" invalid>
        <Story />
        <FormErrorMessage>You must accept the terms.</FormErrorMessage>
      </FormControl>
    ),
  ],
  args: { isError: true, children: 'You must accept the terms' },
};

/* ─── Label Placement ────────────────────────────────────────────────────────── */

export const LabelStart: Story = {
  args: { labelPlacement: 'start', checked: true, children: 'Label before checkbox' },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { children: 'Focus me with Tab' },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Space` to toggle checked state. ' +
          'A real `<input type="checkbox">` is rendered (visually hidden) so screen readers announce the role natively. ' +
          'Indeterminate state sets `aria-checked="mixed"`. ' +
          'Error state sets `aria-invalid="true"`. ' +
          'Focus indicator appears on the visual checkbox via `:focus-visible` using `var(--color-border-focus)`.',
      },
    },
  },
};
