import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUploaderBasic } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/FileUploaderBasic',
  component: FileUploaderBasic,
  argTypes: {
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof FileUploaderBasic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Upload file',
  },
};

export const WithAccept: Story = {
  args: {
    accept: 'image/*,.pdf',
    children: 'Upload image or PDF',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Upload file',
  },
};
