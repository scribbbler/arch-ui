import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@arch-ui/components';

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    isError: { control: 'boolean' },
  },
  args: {
    size: 'md',
    'aria-label': 'Country',
    placeholder: 'Select a country',
    children: (
      <>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeSmall: Story = {
  args: { size: 'sm' },
};

export const SizeMedium: Story = {
  args: { size: 'md' },
};

export const SizeLarge: Story = {
  args: { size: 'lg' },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { isError: true },
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose an option…' },
};

/* ─── Optgroup ───────────────────────────────────────────────────────────────── */

export const WithOptgroup: Story = {
  args: {
    placeholder: 'Select a city',
    'aria-label': 'City',
    children: (
      <>
        <optgroup label="North America">
          <option value="nyc">New York</option>
          <option value="sf">San Francisco</option>
          <option value="tor">Toronto</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="lon">London</option>
          <option value="ber">Berlin</option>
        </optgroup>
      </>
    ),
  },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab`/`Shift+Tab` to focus, `Arrow Up/Down` to navigate options, `Space`/`Enter` to open and select. ' +
          'Uses a native `<select>` so keyboard and screen reader behaviour is handled by the browser. ' +
          'When inside a FormControl, `aria-describedby`, `aria-required`, and `aria-invalid` are wired automatically. ' +
          'Focus indicator uses a 2px outline with `var(--color-border-focus)`.',
      },
    },
  },
};
