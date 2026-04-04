import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup, Avatar, type AvatarSize } from '@arch-ui/components';

const meta = {
  title: 'Content Display/AvatarGroup',
  component: AvatarGroup,
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatars = (size: AvatarSize = 'medium') => (
  <>
    <Avatar name="Alice Smith" src="https://i.pravatar.cc/150?u=alice" size={size} />
    <Avatar name="Bob Jones" size={size} />
    <Avatar name="Carol White" src="https://i.pravatar.cc/150?u=carol" size={size} />
    <Avatar name="Dan Brown" size={size} />
    <Avatar name="Eve Davis" size={size} />
  </>
);

export const Default: Story = {
  render: () => <AvatarGroup size="medium">{avatars('medium')}</AvatarGroup>,
};

export const WithMax: Story = {
  render: () => <AvatarGroup max={3} size="medium">{avatars('medium')}</AvatarGroup>,
};

export const MaxOfOne: Story = {
  render: () => <AvatarGroup max={1} size="medium">{avatars('medium')}</AvatarGroup>,
};

export const SizeSmall: Story = {
  render: () => <AvatarGroup max={3} size="small">{avatars('small')}</AvatarGroup>,
};

export const SizeLarge: Story = {
  render: () => <AvatarGroup max={3} size="large">{avatars('large')}</AvatarGroup>,
};

export const SizeExtraLarge: Story = {
  render: () => <AvatarGroup max={4} size="xlarge">{avatars('xlarge')}</AvatarGroup>,
};
