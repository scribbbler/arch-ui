import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@arch-ui/components';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  args: {
    name: 'Jane Doe',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtraSmall: Story = {
  args: { size: 'xs', name: 'Jane Doe' },
};

export const Small: Story = {
  args: { size: 'sm', name: 'Jane Doe' },
};

export const Medium: Story = {
  args: { size: 'md', name: 'Jane Doe' },
};

export const Large: Story = {
  args: { size: 'lg', name: 'Jane Doe' },
};

export const ExtraLarge: Story = {
  args: { size: 'xl', name: 'Jane Doe' },
};

export const ExtraExtraLarge: Story = {
  args: { size: '2xl', name: 'Jane Doe' },
};

export const Circle: Story = {
  args: { shape: 'circle', name: 'Alice Smith', size: 'lg' },
};

export const Square: Story = {
  args: { shape: 'square', name: 'Acme Corp', size: 'lg' },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=jane',
    name: 'Jane Doe',
    size: 'lg',
  },
};

export const FallbackInitials: Story = {
  args: { name: 'John Smith', size: 'lg' },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-url.invalid/avatar.jpg',
    name: 'Bob Jones',
    size: 'lg',
  },
};

export const Accessibility: Story = {
  name: 'Accessibility',
  args: { name: 'Jane Doe', size: 'lg' },
  parameters: {
    docs: {
      description: {
        story: 'When an image is present, it receives alt={name}. When initials are shown (no src or broken image), the container has role="img" and aria-label={name}. Image errors gracefully fall back to initials.',
      },
    },
  },
};
