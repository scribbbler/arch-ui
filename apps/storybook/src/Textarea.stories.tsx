import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@arch-ui/components';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    resize: { control: 'select', options: ['none', 'vertical', 'both'] },
    autoResize: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter your message…',
    size: 'md',
    rows: 3,
    'aria-label': 'Message',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeSmall: Story = {
  args: { size: 'sm', placeholder: 'Small textarea' },
};

export const SizeMedium: Story = {
  args: { size: 'md', placeholder: 'Medium textarea' },
};

export const SizeLarge: Story = {
  args: { size: 'lg', placeholder: 'Large textarea' },
};

/* ─── Resize Options ─────────────────────────────────────────────────────────── */

export const ResizeNone: Story = {
  args: { resize: 'none', placeholder: 'Cannot resize' },
};

export const ResizeVertical: Story = {
  args: { resize: 'vertical', placeholder: 'Resize vertically' },
};

export const ResizeBoth: Story = {
  args: { resize: 'both', placeholder: 'Resize in any direction' },
};

/* ─── Auto Resize ────────────────────────────────────────────────────────────── */

export const AutoResize: Story = {
  args: { autoResize: true, placeholder: 'Type to grow…', rows: 2 },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Disabled textarea' },
};

export const Error: Story = {
  args: { 'aria-invalid': true, placeholder: 'Invalid input' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'This content is read-only.' },
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { placeholder: 'Focus me with Tab' },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab`/`Shift+Tab` to move focus, `Enter` inserts a newline. ' +
          'When inside a FormControl, `aria-describedby`, `aria-required`, and `aria-invalid` are wired automatically. ' +
          '`aria-multiline` is implicitly true for `<textarea>`. ' +
          'Focus indicator uses a 2px outline with `var(--color-border-focus)`.',
      },
    },
  },
};
