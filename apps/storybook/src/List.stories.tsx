import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  List,
  ListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
} from '@arch-ui/components';

const meta = {
  title: 'Content Display/List',
  component: List,
  argTypes: {
    variant: { control: 'select', options: ['bullet', 'number', 'none'] },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bullet: Story = {
  args: {
    variant: 'bullet',
    children: (
      <>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </>
    ),
  },
};

export const Number: Story = {
  args: {
    variant: 'number',
    children: (
      <>
        <ListItem>Step one</ListItem>
        <ListItem>Step two</ListItem>
        <ListItem>Step three</ListItem>
      </>
    ),
  },
};

export const None: Story = {
  args: {
    variant: 'none',
    children: (
      <>
        <ListItem>No marker A</ListItem>
        <ListItem>No marker B</ListItem>
        <ListItem>No marker C</ListItem>
      </>
    ),
  },
};

export const Description: Story = {
  render: () => (
    <DescriptionList>
      <DescriptionTerm>Name</DescriptionTerm>
      <DescriptionDetail>Jane Smith</DescriptionDetail>
      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetail>Engineer</DescriptionDetail>
      <DescriptionTerm>Location</DescriptionTerm>
      <DescriptionDetail>San Francisco</DescriptionDetail>
    </DescriptionList>
  ),
};
