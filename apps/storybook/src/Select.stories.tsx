import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select, FormControl, FormLabel, FormErrorMessage } from '@arch-ui/components';

const options = (
  <>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="de">Germany</option>
  </>
);

const meta = {
  title: 'Input and Selection/Select',
  component: Select,
  render: (args) => (
    <FormControl>
      <FormLabel>Country</FormLabel>
      <Select {...args} />
    </FormControl>
  ),
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    placeholder: 'Select a country',
    children: options,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeSmall: Story = { args: { size: 'sm' } };
export const SizeMedium: Story = { args: { size: 'md' } };
export const SizeLarge: Story = { args: { size: 'lg' } };

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  render: (args) => (
    <FormControl disabled>
      <FormLabel>Country</FormLabel>
      <Select {...args} />
    </FormControl>
  ),
};

export const Error: Story = {
  render: (args) => (
    <FormControl invalid>
      <FormLabel>Country</FormLabel>
      <Select {...args} />
      <FormErrorMessage>Please select a country.</FormErrorMessage>
    </FormControl>
  ),
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose an option…' },
};

/* ─── Optgroup ───────────────────────────────────────────────────────────────── */

export const WithOptgroup: Story = {
  render: (args) => (
    <FormControl>
      <FormLabel>City</FormLabel>
      <Select {...args}>
        <optgroup label="North America">
          <option value="nyc">New York</option>
          <option value="sf">San Francisco</option>
          <option value="tor">Toronto</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="lon">London</option>
          <option value="ber">Berlin</option>
        </optgroup>
      </Select>
    </FormControl>
  ),
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab`/`Shift+Tab` to focus, `Arrow Up/Down` to navigate options, `Space`/`Enter` to open and select. ' +
          'Uses a native `<select>` so keyboard and screen reader behaviour is handled by the browser.',
      },
    },
  },
};
