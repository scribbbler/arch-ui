import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@arch-ui/components';

const meta = {
  title: 'Content Display/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'] },
    shape: { control: 'radio', options: ['circle', 'square'] },
  },
  args: {
    name: 'Jane Doe',
    size: 'medium',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Sizes ──────────────────────────────────────────────────────────────────── */

export const XSmall: Story = {
  args: { size: 'xsmall', name: 'A' },
};

export const Small: Story = {
  args: { size: 'small', name: 'AB' },
};

export const Medium: Story = {
  args: { size: 'medium', name: 'AB' },
};

export const Large: Story = {
  args: { size: 'large', name: 'AB' },
};

export const XLarge: Story = {
  args: { size: 'xlarge', name: 'AB' },
};

export const XXLarge: Story = {
  args: { size: 'xxlarge', name: 'AB' },
};

/* ─── Shapes ─────────────────────────────────────────────────────────────────── */

export const Circle: Story = {
  args: { shape: 'circle', name: 'Alice Smith', size: 'large' },
};

export const Square: Story = {
  args: { shape: 'square', name: 'Acme Corp', size: 'large' },
};

/* ─── With Image ─────────────────────────────────────────────────────────────── */

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=jane',
    name: 'Jane Doe',
    size: 'large',
  },
};

export const FallbackInitials: Story = {
  args: { name: 'John Smith', size: 'large' },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-url.invalid/avatar.jpg',
    name: 'Bob Jones',
    size: 'large',
  },
};
