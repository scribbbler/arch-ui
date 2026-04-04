import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/Textarea',
  component: Textarea,
  render: (args) => (
    <FormControl>
      <FormLabel>Message</FormLabel>
      <Textarea {...args} />
    </FormControl>
  ),
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
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const SizeSmall: Story = { args: { size: 'sm', placeholder: 'Small textarea' } };
export const SizeMedium: Story = { args: { size: 'md', placeholder: 'Medium textarea' } };
export const SizeLarge: Story = { args: { size: 'lg', placeholder: 'Large textarea' } };

/* ─── Resize Options ─────────────────────────────────────────────────────────── */

export const ResizeNone: Story = { args: { resize: 'none', placeholder: 'Cannot resize' } };
export const ResizeVertical: Story = { args: { resize: 'vertical', placeholder: 'Resize vertically' } };
export const ResizeBoth: Story = { args: { resize: 'both', placeholder: 'Resize in any direction' } };

/* ─── Auto Resize ────────────────────────────────────────────────────────────── */

export const AutoResize: Story = {
  args: { autoResize: true, placeholder: 'Type to grow…', rows: 2 },
};

/* ─── States ─────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { placeholder: 'Disabled textarea' },
  render: (args) => (
    <FormControl disabled>
      <FormLabel>Message</FormLabel>
      <Textarea {...args} />
    </FormControl>
  ),
};

export const Error: Story = {
  args: { placeholder: 'Invalid input' },
  render: (args) => (
    <FormControl invalid>
      <FormLabel>Message</FormLabel>
      <Textarea {...args} />
      <FormErrorMessage>This field is required.</FormErrorMessage>
    </FormControl>
  ),
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'This content is read-only.' },
};

export const WithHelperText: Story = {
  args: { rows: 4, autoResize: true, placeholder: 'Write your bio…' },
  render: (args) => (
    <FormControl>
      <FormLabel>Bio</FormLabel>
      <Textarea {...args} />
      <FormHelperText>Tell us a little about yourself.</FormHelperText>
    </FormControl>
  ),
};

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

export const Accessibility: Story = {
  args: { placeholder: 'Focus me with Tab' },
  parameters: {
    docs: {
      description: {
        story:
          'Keyboard: `Tab`/`Shift+Tab` to move focus, `Enter` inserts a newline. ' +
          'When inside a FormControl, `aria-describedby`, `aria-required`, and `aria-invalid` are wired automatically.',
      },
    },
  },
};
