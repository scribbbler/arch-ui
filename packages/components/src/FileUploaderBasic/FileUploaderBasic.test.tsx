import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUploaderBasic } from './FileUploaderBasic';

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('FileUploaderBasic — rendering', () => {
  it('renders without crashing', () => {
    render(<FileUploaderBasic />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders default label "Upload file"', () => {
    render(<FileUploaderBasic />);
    expect(screen.getByText('Upload file')).toBeInTheDocument();
  });

  it('renders custom children as button label', () => {
    render(<FileUploaderBasic>Upload document</FileUploaderBasic>);
    expect(screen.getByText('Upload document')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(<FileUploaderBasic className="custom" />);
    expect(container.firstChild).toHaveClass('arch-file-uploader-basic', 'custom');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<FileUploaderBasic ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});

/* ─── Disabled ───────────────────────────────────────────────────────────────── */

describe('FileUploaderBasic — disabled', () => {
  it('disables the button when disabled is true', () => {
    render(<FileUploaderBasic disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('sets aria-disabled on the button when disabled', () => {
    render(<FileUploaderBasic disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not set aria-disabled when not disabled', () => {
    render(<FileUploaderBasic />);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-disabled');
  });
});

/* ─── Accept attribute ───────────────────────────────────────────────────────── */

describe('FileUploaderBasic — accept', () => {
  it('sets accept attribute on the hidden file input', () => {
    const { container } = render(<FileUploaderBasic accept="image/*,.pdf" />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('accept', 'image/*,.pdf');
  });

  it('does not set accept when not provided', () => {
    const { container } = render(<FileUploaderBasic />);
    const input = container.querySelector('input[type="file"]');
    expect(input).not.toHaveAttribute('accept');
  });
});

/* ─── Hidden input ───────────────────────────────────────────────────────────── */

describe('FileUploaderBasic — hidden input', () => {
  it('renders a hidden file input', () => {
    const { container } = render(<FileUploaderBasic />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-hidden', 'true');
  });

  it('disables the file input when disabled', () => {
    const { container } = render(<FileUploaderBasic disabled />);
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeDisabled();
  });
});
