import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  List,
  ListItem,
  ListItemLabel,
  ListHeading,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
} from '@arch-ui/components';

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.46,13.97L5.82,21L12,17.27Z" /></svg>
);

const meta = {
  title: 'Content Display/List',
  component: List,
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ─── Rich ListItem (Base Web pattern) ───────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <List>
      <ListItem artwork={<UserIcon />} endEnhancer={<ChevronRight />}>
        <ListItemLabel description="Software Engineer">Jane Doe</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />} endEnhancer={<ChevronRight />}>
        <ListItemLabel description="Product Designer">John Smith</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />} endEnhancer={<ChevronRight />}>
        <ListItemLabel description="Engineering Manager">Alice Brown</ListItemLabel>
      </ListItem>
    </List>
  ),
};

export const WithArtworkSizes: Story = {
  render: () => (
    <List>
      <ListItem artwork={<UserIcon />} artworkSize="small">
        <ListItemLabel>Small artwork (24px)</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />} artworkSize="medium">
        <ListItemLabel>Medium artwork (36px)</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />} artworkSize="large">
        <ListItemLabel>Large artwork (48px)</ListItemLabel>
      </ListItem>
    </List>
  ),
};

export const RoundArtwork: Story = {
  render: () => (
    <List>
      <ListItem artwork={<UserIcon />} shape="round" endEnhancer="3m ago">
        <ListItemLabel description="Sent you a message">Jane Doe</ListItemLabel>
      </ListItem>
      <ListItem artwork={<StarIcon />} shape="round" endEnhancer="1h ago">
        <ListItemLabel description="Left a review">John Smith</ListItemLabel>
      </ListItem>
    </List>
  ),
};

export const Interactive: Story = {
  render: () => (
    <List>
      <ListItem artwork={<UserIcon />} endEnhancer={<ChevronRight />} onClick={() => alert('Clicked Jane')}>
        <ListItemLabel description="View profile">Jane Doe</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />} endEnhancer={<ChevronRight />} onClick={() => alert('Clicked John')}>
        <ListItemLabel description="View profile">John Smith</ListItemLabel>
      </ListItem>
    </List>
  ),
};

export const WithSublist: Story = {
  render: () => (
    <List>
      <ListItem artwork={<UserIcon />}>
        <ListItemLabel description="Team Lead">Jane Doe</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />} sublist>
        <ListItemLabel description="Frontend" sublist>Alice</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />} sublist>
        <ListItemLabel description="Backend" sublist>Bob</ListItemLabel>
      </ListItem>
    </List>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <List>
      <ListHeading heading="Team Members" subHeading="Engineering" endEnhancer="3 people" />
      <ListItem artwork={<UserIcon />}>
        <ListItemLabel description="Software Engineer">Jane Doe</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />}>
        <ListItemLabel description="Software Engineer">John Smith</ListItemLabel>
      </ListItem>
      <ListItem artwork={<UserIcon />}>
        <ListItemLabel description="Engineering Manager">Alice Brown</ListItemLabel>
      </ListItem>
    </List>
  ),
};

export const LabelOnly: Story = {
  render: () => (
    <List>
      <ListItem><ListItemLabel>Simple item one</ListItemLabel></ListItem>
      <ListItem><ListItemLabel>Simple item two</ListItemLabel></ListItem>
      <ListItem><ListItemLabel>Simple item three</ListItemLabel></ListItem>
    </List>
  ),
};

/* ─── Simple lists ───────────────────────────────────────────────────────────── */

export const Bullet: Story = {
  render: () => (
    <List variant="bullet">
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </List>
  ),
};

export const Numbered: Story = {
  render: () => (
    <List variant="number">
      <li>Step one</li>
      <li>Step two</li>
      <li>Step three</li>
    </List>
  ),
};

/* ─── DescriptionList ────────────────────────────────────────────────────────── */

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
