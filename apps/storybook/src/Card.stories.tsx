import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>Card Title</CardHeader>
      <CardBody>
        <p>This is the main content area of the card.</p>
      </CardBody>
      <CardFooter>
        <button>Action</button>
      </CardFooter>
    </Card>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <Card>
      <CardBody>
        <p>A simple card with just body content.</p>
      </CardBody>
    </Card>
  ),
};

export const ClickableAction: Story = {
  render: () => (
    <Card clickable onClick={() => alert('Card clicked')}>
      <CardBody>
        <p>Click this card to trigger an action.</p>
      </CardBody>
    </Card>
  ),
};

export const ClickableLink: Story = {
  render: () => (
    <Card clickable href="/details">
      <CardBody>
        <p>This card navigates to a URL when clicked.</p>
      </CardBody>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card>
      <img
        src="https://placehold.co/400x200"
        alt="Placeholder"
        style={{ width: '100%', display: 'block', borderRadius: 'inherit' }}
      />
      <CardBody>
        <h3>Card with image</h3>
        <p>An image placed above the card body.</p>
      </CardBody>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>Project Update</CardHeader>
      <CardBody>
        <p>The latest sprint was completed ahead of schedule. All 12 stories were delivered.</p>
      </CardBody>
      <CardFooter>
        <button>View Details</button>
        <button>Dismiss</button>
      </CardFooter>
    </Card>
  ),
};
