import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageCard } from './MessageCard';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('MessageCard — rendering', () => {
  it('renders without crashing', () => {
    render(<MessageCard />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('renders an <article> element', () => {
    render(<MessageCard />);
    expect(screen.getByRole('article').tagName).toBe('ARTICLE');
  });

  it('renders heading when provided', () => {
    render(<MessageCard heading="Welcome" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Welcome').tagName).toBe('H3');
  });

  it('renders paragraph when provided', () => {
    render(<MessageCard paragraph="Hello world" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.getByText('Hello world').tagName).toBe('P');
  });

  it('renders button when buttonLabel is provided', () => {
    render(<MessageCard buttonLabel="Get started" />);
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const { container } = render(<MessageCard image="/photo.jpg" />);
    const img = container.querySelector('.arch-message-card__image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/photo.jpg');
  });

  it('does not render heading when not provided', () => {
    const { container } = render(<MessageCard />);
    expect(container.querySelector('.arch-message-card__heading')).not.toBeInTheDocument();
  });

  it('does not render button when buttonLabel is not provided', () => {
    render(<MessageCard />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies the base class', () => {
    render(<MessageCard />);
    expect(screen.getByRole('article')).toHaveClass('arch-message-card');
  });

  it('applies a custom className', () => {
    render(<MessageCard className="my-card" />);
    expect(screen.getByRole('article')).toHaveClass('arch-message-card', 'my-card');
  });
});

/* ─── Interactivity ──────────────────────────────────────────────────────────── */

describe('MessageCard — interactivity', () => {
  it('calls onClick when the button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<MessageCard buttonLabel="Click me" onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

/* ─── forwardRef ─────────────────────────────────────────────────────────────── */

describe('MessageCard — forwardRef', () => {
  it('forwards a ref to the article element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<MessageCard ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('ARTICLE');
  });
});
