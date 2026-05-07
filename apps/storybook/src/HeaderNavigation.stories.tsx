import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  HeaderNavigation,
  HeaderNavigationLeft,
  HeaderNavigationRight,
} from '@arch-ui/components';

const meta = {
  title: 'Navigation/HeaderNavigation',
  component: HeaderNavigation,
} satisfies Meta<typeof HeaderNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <HeaderNavigation>
      <HeaderNavigationLeft>
        <strong>Logo</strong>
        <a href="#">Home</a>
        <a href="#">About</a>
      </HeaderNavigationLeft>
      <HeaderNavigationRight>
        <a href="#">Sign In</a>
        <a href="#">Register</a>
      </HeaderNavigationRight>
    </HeaderNavigation>
  ),
};
