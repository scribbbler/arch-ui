import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@arch-ui/components';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter text…',
    size: 'md',
    type: 'text',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeSmall: Story = {
  args: { size: 'sm', placeholder: 'Small input' },
};

export const SizeMedium: Story = {
  args: { size: 'md', placeholder: 'Medium input' },
};

export const SizeLarge: Story = {
  args: { size: 'lg', placeholder: 'Large input' },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled input' },
};

export const Error: Story = {
  args: { 'aria-invalid': true, placeholder: 'Invalid input' },
};

export const Required: Story = {
  args: { required: true, placeholder: 'Required field', 'aria-label': 'Required field' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'Read-only value' },
};

/* ─── With Elements ──────────────────────────────────────────────────────────── */

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06l-3.04-3.04Z" />
  </svg>
);

export const WithLeftElement: Story = {
  args: { leftElement: <SearchIcon />, placeholder: 'Search…' },
};

export const WithRightElement: Story = {
  args: {
    rightElement: <span style={{ fontSize: '12px', color: 'var(--color-text-subtle)' }}>kg</span>,
    placeholder: 'Weight',
    type: 'number',
  },
};

export const WithBothElements: Story = {
  args: {
    leftElement: <span>$</span>,
    rightElement: <span>.00</span>,
    placeholder: '0',
    type: 'number',
  },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { 'aria-label': 'Demo input', placeholder: 'Focus me with Tab' },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab`/`Shift+Tab` to move focus in and out. ' +
          'Focus is indicated by a 2px outline using `var(--color-border-focus)`. ' +
          'When inside a FormControl, `aria-describedby`, `aria-required`, and `aria-invalid` are wired automatically. ' +
          '`leftElement` and `rightElement` are `aria-hidden` so decorative content does not pollute the accessible name.',
      },
    },
  },
};
