import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Layer, LayerManager } from '@arch-ui/components';

const meta = {
  title: 'Containers and Layout/Layer',
  component: Layer,
  argTypes: {
    zIndex: { control: 'number' },
  },
} satisfies Meta<typeof Layer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <LayerManager>
      <div style={{ position: 'relative', height: '200px' }}>
        <Layer zIndex={1}>
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '150px',
              height: '150px',
              backgroundColor: 'var(--color-background-secondary)',
              color: 'var(--color-text-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Layer 1 (z-index: 1)
          </div>
        </Layer>
        <Layer zIndex={2}>
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              width: '150px',
              height: '150px',
              backgroundColor: 'var(--color-background-tertiary)',
              color: 'var(--color-text-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Layer 2 (z-index: 2)
          </div>
        </Layer>
        <Layer zIndex={3}>
          <div
            style={{
              position: 'absolute',
              top: '60px',
              left: '60px',
              width: '150px',
              height: '150px',
              backgroundColor: 'var(--color-background-inverse)',
              color: 'var(--color-text-inverse)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Layer 3 (z-index: 3)
          </div>
        </Layer>
      </div>
    </LayerManager>
  ),
};
