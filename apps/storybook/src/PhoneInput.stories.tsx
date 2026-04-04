import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PhoneInput } from '@arch-ui/components';

const meta = {
  title: 'Input and Selection/PhoneInput',
  component: PhoneInput,
  args: {
    size: 'default',
    placeholder: 'Phone number',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');
    const [country, setCountry] = useState(args.country ?? 'US');
    return (
      <PhoneInput
        {...args}
        value={value}
        onChange={setValue}
        country={country}
        onCountryChange={setCountry}
      />
    );
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DifferentCountries: Story = {
  render: () => {
    const countries = ['US', 'GB', 'IN', 'DE', 'FR', 'JP'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        {countries.map((c) => {
          const [val, setVal] = useState('');
          return (
            <PhoneInput
              key={c}
              value={val}
              onChange={setVal}
              country={c}
              placeholder={`Phone (${c})`}
            />
          );
        })}
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: '5551234567', country: 'US' },
};

export const Error: Story = {
  args: { error: true, placeholder: 'Invalid phone number' },
};

export const Sizes: Story = {
  render: () => {
    const sizes = ['mini', 'compact', 'default', 'large'] as const;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        {sizes.map((s) => {
          const [val, setVal] = useState('');
          return (
            <PhoneInput
              key={s}
              value={val}
              onChange={setVal}
              size={s}
              placeholder={`Size: ${s}`}
            />
          );
        })}
      </div>
    );
  },
};
