import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, FormControl, FormLabel, FormHelperText, FormErrorMessage } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/Input',
  component: Input,
  args: {
    placeholder: 'Enter text…',
    size: 'md',
    type: 'text',
  },
  render: (args) => (
    <FormControl>
      <FormLabel>Label</FormLabel>
      <Input {...args} />
    </FormControl>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeSmall: Story = { args: { size: 'sm', placeholder: 'Small input' } };
export const SizeMedium: Story = { args: { size: 'md', placeholder: 'Medium input' } };
export const SizeLarge: Story = { args: { size: 'lg', placeholder: 'Large input' } };

export const Disabled: Story = {
  render: (args) => (
    <FormControl disabled>
      <FormLabel>Disabled field</FormLabel>
      <Input {...args} />
    </FormControl>
  ),
};

export const Error: Story = {
  args: { placeholder: 'Invalid input', type: 'email' },
  render: (args) => (
    <FormControl invalid>
      <FormLabel>Email</FormLabel>
      <Input {...args} />
      <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>
    </FormControl>
  ),
};

export const Required: Story = {
  render: (args) => (
    <FormControl required>
      <FormLabel>Required field</FormLabel>
      <Input {...args} />
    </FormControl>
  ),
};

export const WithHelperText: Story = {
  args: { placeholder: 'Choose a username' },
  render: (args) => (
    <FormControl>
      <FormLabel>Username</FormLabel>
      <Input {...args} />
      <FormHelperText>Must be 3-20 characters.</FormHelperText>
    </FormControl>
  ),
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'Read-only value' },
};

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06l-3.04-3.04Z" />
  </svg>
);

export const WithLeftElement: Story = {
  args: { leftElement: <SearchIcon />, placeholder: 'Search…' },
};

export const WithRightElement: Story = {
  args: { rightElement: <span>kg</span>, placeholder: 'Weight', type: 'number' },
};

export const WithBothElements: Story = {
  args: { leftElement: <span>$</span>, rightElement: <span>.00</span>, placeholder: '0', type: 'number' },
};

export const Accessibility: Story = {
  args: { placeholder: 'Focus me with Tab' },
  parameters: {
    docs: {
      description: {
        story: 'Tab/Shift+Tab to move focus. FormControl wires aria-describedby, aria-required, aria-invalid automatically.',
      },
    },
  },
};
