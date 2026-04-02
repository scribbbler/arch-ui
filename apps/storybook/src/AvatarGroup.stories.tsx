import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup, Avatar } from '@arch-ui/components';

const meta = {
  title: 'Data Display/AvatarGroup',
  component: AvatarGroup,
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md') => (
  <>
    <Avatar name="Alice Smith" src="https://i.pravatar.cc/150?u=alice" size={size} />
    <Avatar name="Bob Jones" size={size} />
    <Avatar name="Carol White" src="https://i.pravatar.cc/150?u=carol" size={size} />
    <Avatar name="Dan Brown" size={size} />
    <Avatar name="Eve Davis" size={size} />
  </>
);

export const Default: Story = {
  render: () => <AvatarGroup size="md">{avatars('md')}</AvatarGroup>,
};

export const WithMax: Story = {
  render: () => <AvatarGroup max={3} size="md">{avatars('md')}</AvatarGroup>,
};

export const MaxOfOne: Story = {
  render: () => <AvatarGroup max={1} size="md">{avatars('md')}</AvatarGroup>,
};

export const SizeSmall: Story = {
  render: () => <AvatarGroup max={3} size="sm">{avatars('sm')}</AvatarGroup>,
};

export const SizeLarge: Story = {
  render: () => <AvatarGroup max={3} size="lg">{avatars('lg')}</AvatarGroup>,
};

export const SizeExtraLarge: Story = {
  render: () => <AvatarGroup max={4} size="xl">{avatars('xl')}</AvatarGroup>,
};

export const Accessibility: Story = {
  render: () => <AvatarGroup max={2} size="md">{avatars('md')}</AvatarGroup>,
  parameters: {
    docs: {
      description: {
        story: 'The root element has role="group". Each Avatar retains its own accessible name. The overflow badge has aria-label="N more" and role="img".',
      },
    },
  },
};
