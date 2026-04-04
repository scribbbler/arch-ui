import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const colorScales: Record<string, string[]> = {
  gray: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  blue: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  red: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  green: ['50', '100', '200', '300', '400', '500', '600', '700', '800'],
  yellow: ['50', '100', '200', '300', '400', '500', '600', '700'],
  orange: ['50', '100', '200', '300', '400', '500', '600', '700', '800'],
  purple: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  teal: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  magenta: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  lime: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  amber: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
};

const DARK_SEMANTIC = new Set([
  'background-inverse', 'background-overlay',
  'text-default', 'text-subtle', 'text-placeholder', 'text-disabled',
  'text-link', 'text-danger', 'text-success', 'text-warning', 'text-info',
  'action-primary', 'action-primary-hover', 'action-primary-active',
  'action-destructive', 'action-destructive-hover', 'action-destructive-active',
  'border-strong', 'border-focus', 'border-danger', 'border-success', 'border-warning',
  'feedback-danger-text', 'feedback-success-text', 'feedback-warning-text', 'feedback-info-text',
]);

function Swatch({ color, name }: { color: string; name: string }) {
  const shade = parseInt(name.split('-').pop() || '0');
  const isDark = name === 'black' || shade >= 500 || DARK_SEMANTIC.has(name);
  return (
    <div
      style={{
        backgroundColor: `var(--${color})`,
        color: isDark ? '#fff' : '#000',
        padding: '12px 16px',
        fontFamily: 'var(--typography-family-mono)',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>{name}</span>
      <span style={{ opacity: 0.7 }}>var(--{color})</span>
    </div>
  );
}

function ColorScale({ name, shades }: { name: string; shades: string[] }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{
        fontFamily: 'var(--typography-family-sans)',
        fontSize: '16px',
        fontWeight: 600,
        marginBottom: '8px',
        textTransform: 'capitalize',
      }}>
        {name}
      </h3>
      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-gray-200)' }}>
        {name === 'black-white' ? (
          <>
            <Swatch color="color-black" name="black" />
            <Swatch color="color-white" name="white" />
          </>
        ) : (
          shades.map((shade) => (
            <Swatch
              key={`${name}-${shade}`}
              color={`color-${name}-${shade}`}
              name={`${name}-${shade}`}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SemanticColors() {
  const semanticGroups = [
    {
      title: 'Background',
      tokens: ['color-background-default', 'color-background-subtle', 'color-background-muted', 'color-background-inverse', 'color-background-disabled', 'color-background-overlay'],
    },
    {
      title: 'Text',
      tokens: ['color-text-default', 'color-text-subtle', 'color-text-placeholder', 'color-text-disabled', 'color-text-inverse', 'color-text-link', 'color-text-danger', 'color-text-success', 'color-text-warning'],
    },
    {
      title: 'Action',
      tokens: ['color-action-primary', 'color-action-primary-hover', 'color-action-primary-active', 'color-action-primary-text', 'color-action-secondary', 'color-action-secondary-hover', 'color-action-destructive', 'color-action-destructive-hover'],
    },
    {
      title: 'Border',
      tokens: ['color-border-default', 'color-border-subtle', 'color-border-strong', 'color-border-focus', 'color-border-danger', 'color-border-success', 'color-border-disabled'],
    },
    {
      title: 'Feedback',
      tokens: ['color-feedback-danger-bg', 'color-feedback-danger-text', 'color-feedback-success-bg', 'color-feedback-success-text', 'color-feedback-warning-bg', 'color-feedback-warning-text', 'color-feedback-info-bg', 'color-feedback-info-text'],
    },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--typography-family-sans)', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        Semantic Colors
      </h2>
      {semanticGroups.map((group) => (
        <div key={group.title} style={{ marginBottom: '32px' }}>
          <h3 style={{ fontFamily: 'var(--typography-family-sans)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
            {group.title}
          </h3>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-gray-200)' }}>
            {group.tokens.map((token) => (
              <Swatch key={token} color={token} name={token.replace('color-', '')} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AllColors() {
  return (
    <div style={{ maxWidth: '640px' }}>
      <h2 style={{ fontFamily: 'var(--typography-family-sans)', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        Primitive Color Palette
      </h2>
      <ColorScale name="black-white" shades={[]} />
      {Object.entries(colorScales).map(([name, shades]) => (
        <ColorScale key={name} name={name} shades={shades} />
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: AllColors,
} satisfies Meta<typeof AllColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimitiveColors: Story = {
  render: () => <AllColors />,
};

export const SemanticColorTokens: Story = {
  render: () => (
    <div style={{ maxWidth: '640px' }}>
      <SemanticColors />
    </div>
  ),
};
