import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import {
  List,
  ListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
} from './List';

/* ─── List variants ──────────────────────────────────────────────────────────── */

describe('List — variants', () => {
  it('renders as <ul> for bullet variant (default)', () => {
    const { container } = render(
      <List>
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('applies arch-list--bullet class for bullet variant', () => {
    const { container } = render(
      <List variant="bullet">
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.firstChild).toHaveClass('arch-list--bullet');
  });

  it('renders as <ol> for number variant', () => {
    const { container } = render(
      <List variant="number">
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('applies arch-list--number class for number variant', () => {
    const { container } = render(
      <List variant="number">
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.firstChild).toHaveClass('arch-list--number');
  });

  it('renders as <ul> for none variant', () => {
    const { container } = render(
      <List variant="none">
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('applies arch-list--none class for none variant', () => {
    const { container } = render(
      <List variant="none">
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.firstChild).toHaveClass('arch-list--none');
  });

  it('overrides element with as="ol" even for bullet variant', () => {
    const { container } = render(
      <List variant="bullet" as="ol">
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  it('overrides element with as="ul" even for number variant', () => {
    const { container } = render(
      <List variant="number" as="ul">
        <ListItem>Item</ListItem>
      </List>
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
  });
});

/* ─── ListItem ───────────────────────────────────────────────────────────────── */

describe('ListItem', () => {
  it('renders as <li>', () => {
    const { container } = render(
      <List>
        <ListItem>Hello</ListItem>
      </List>
    );
    expect(container.querySelector('li')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <List>
        <ListItem>Hello world</ListItem>
      </List>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <List>
        <ListItem className="custom">Item</ListItem>
      </List>
    );
    expect(container.querySelector('li')).toHaveClass('custom');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <List>
        <ListItem ref={ref}>Item</ListItem>
      </List>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('LI');
  });
});

/* ─── Spacing token ──────────────────────────────────────────────────────────── */

describe('List — spacing', () => {
  it('sets CSS custom property for spacing', () => {
    const { container } = render(
      <List spacing="spacing-component-md">
        <ListItem>Item</ListItem>
      </List>
    );
    const list = container.firstChild as HTMLElement;
    expect(list.style.getPropertyValue('--arch-list-spacing')).toBe(
      'var(--spacing-component-md)'
    );
  });
});

/* ─── DescriptionList ────────────────────────────────────────────────────────── */

describe('DescriptionList', () => {
  it('renders as <dl>', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>Term</DescriptionTerm>
        <DescriptionDetail>Detail</DescriptionDetail>
      </DescriptionList>
    );
    expect(container.querySelector('dl')).toBeInTheDocument();
  });

  it('renders DescriptionTerm as <dt>', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>Author</DescriptionTerm>
        <DescriptionDetail>Jane</DescriptionDetail>
      </DescriptionList>
    );
    expect(container.querySelector('dt')).toBeInTheDocument();
  });

  it('renders DescriptionDetail as <dd>', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>Author</DescriptionTerm>
        <DescriptionDetail>Jane</DescriptionDetail>
      </DescriptionList>
    );
    expect(container.querySelector('dd')).toBeInTheDocument();
  });

  it('renders term and detail text', () => {
    render(
      <DescriptionList>
        <DescriptionTerm>Version</DescriptionTerm>
        <DescriptionDetail>1.0.0</DescriptionDetail>
      </DescriptionList>
    );
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('applies arch-description-list class', () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>T</DescriptionTerm>
        <DescriptionDetail>D</DescriptionDetail>
      </DescriptionList>
    );
    expect(container.firstChild).toHaveClass('arch-description-list');
  });

  it('DescriptionList forwards ref', () => {
    const ref = React.createRef<HTMLDListElement>();
    render(
      <DescriptionList ref={ref}>
        <DescriptionTerm>T</DescriptionTerm>
        <DescriptionDetail>D</DescriptionDetail>
      </DescriptionList>
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DL');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('List — accessibility', () => {
  it('passes axe for bullet list', async () => {
    const { container } = render(
      <List variant="bullet">
        <ListItem>Item one</ListItem>
        <ListItem>Item two</ListItem>
      </List>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for number list', async () => {
    const { container } = render(
      <List variant="number">
        <ListItem>First</ListItem>
        <ListItem>Second</ListItem>
      </List>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for none list', async () => {
    const { container } = render(
      <List variant="none">
        <ListItem>Item</ListItem>
      </List>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe for DescriptionList', async () => {
    const { container } = render(
      <DescriptionList>
        <DescriptionTerm>Key</DescriptionTerm>
        <DescriptionDetail>Value</DescriptionDetail>
      </DescriptionList>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
