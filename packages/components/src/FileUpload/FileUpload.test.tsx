import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { FileUpload } from './FileUpload';

/* ─── Helpers ─────────────────────────────────────────────────────────────────── */

function makeFile(name: string, sizeBytes: number, type = 'text/plain'): File {
  const content = new Array(sizeBytes).fill('a').join('');
  return new File([content], name, { type });
}

/* ─── Rendering ──────────────────────────────────────────────────────────────── */

describe('FileUpload — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(<FileUpload />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders a hidden file input', () => {
    render(<FileUpload />);
    // The input is visually hidden but still present in the DOM
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
  });

  it('renders a label element as the drop zone', () => {
    render(<FileUpload />);
    const zone = document.querySelector('.arch-file-upload__zone');
    expect(zone?.tagName).toBe('LABEL');
  });

  it('applies the arch-file-upload class to the root wrapper', () => {
    const { container } = render(<FileUpload />);
    expect(container.firstChild).toHaveClass('arch-file-upload');
  });

  it('applies a custom className to the root wrapper', () => {
    const { container } = render(<FileUpload className="custom-upload" />);
    expect(container.firstChild).toHaveClass('custom-upload');
  });

  it('renders children content inside the drop zone', () => {
    render(<FileUpload><p>Drop files here</p></FileUpload>);
    expect(screen.getByText('Drop files here')).toBeInTheDocument();
  });

  it('forwards ref to the underlying file input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<FileUpload ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.type).toBe('file');
  });
});

/* ─── accept prop ────────────────────────────────────────────────────────────── */

describe('FileUpload — accept prop', () => {
  it('passes accept prop to the hidden file input', () => {
    render(<FileUpload accept="image/*,.pdf" />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('accept', 'image/*,.pdf');
  });

  it('does not set accept attribute when not provided', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]');
    expect(input).not.toHaveAttribute('accept');
  });
});

/* ─── multiple prop ──────────────────────────────────────────────────────────── */

describe('FileUpload — multiple prop', () => {
  it('sets multiple attribute when multiple=true', () => {
    render(<FileUpload multiple />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('multiple');
  });

  it('does not set multiple attribute by default', () => {
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]');
    expect(input).not.toHaveAttribute('multiple');
  });
});

/* ─── Disabled state ─────────────────────────────────────────────────────────── */

describe('FileUpload — disabled state', () => {
  it('disables the file input when disabled=true', () => {
    render(<FileUpload disabled />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeDisabled();
  });

  it('applies arch-file-upload__zone--disabled class when disabled', () => {
    render(<FileUpload disabled />);
    const zone = document.querySelector('.arch-file-upload__zone');
    expect(zone).toHaveClass('arch-file-upload__zone--disabled');
  });

  it('sets aria-disabled="true" on the input when disabled', () => {
    render(<FileUpload disabled />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('aria-disabled', 'true');
  });
});

/* ─── Drag states via CSS classes ────────────────────────────────────────────── */

describe('FileUpload — drag states', () => {
  it('applies dragover class when dragging over the zone', () => {
    render(<FileUpload />);
    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    fireEvent.dragEnter(zone);
    expect(zone).toHaveClass('arch-file-upload__zone--dragover');
  });

  it('removes dragover class when drag leaves', () => {
    render(<FileUpload />);
    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    fireEvent.dragEnter(zone);
    fireEvent.dragLeave(zone);
    expect(zone).not.toHaveClass('arch-file-upload__zone--dragover');
  });

  it('removes dragover class on drop', () => {
    render(<FileUpload />);
    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    fireEvent.dragEnter(zone);
    fireEvent.drop(zone, {
      dataTransfer: { files: [] },
    });
    expect(zone).not.toHaveClass('arch-file-upload__zone--dragover');
  });

  it('does not enter dragover state when disabled', () => {
    render(<FileUpload disabled />);
    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    fireEvent.dragEnter(zone);
    expect(zone).not.toHaveClass('arch-file-upload__zone--dragover');
  });
});

/* ─── File selection via input ───────────────────────────────────────────────── */

describe('FileUpload — file selection', () => {
  it('calls onDrop when files are selected via input', async () => {
    const onDrop = vi.fn();
    render(<FileUpload onDrop={onDrop} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile('photo.png', 100, 'image/png');

    await userEvent.upload(input, file);

    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(onDrop).toHaveBeenCalledWith(expect.arrayContaining([file]));
  });

  it('calls onDrop when files are dropped onto the zone', async () => {
    const onDrop = vi.fn();
    render(<FileUpload onDrop={onDrop} />);
    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    const file = makeFile('doc.pdf', 200, 'application/pdf');

    fireEvent.drop(zone, {
      dataTransfer: { files: [file] },
    });

    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(onDrop).toHaveBeenCalledWith(expect.arrayContaining([file]));
  });

  it('does not call onDrop when disabled', async () => {
    const onDrop = vi.fn();
    render(<FileUpload disabled onDrop={onDrop} />);
    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    const file = makeFile('doc.pdf', 200);

    fireEvent.drop(zone, {
      dataTransfer: { files: [file] },
    });

    expect(onDrop).not.toHaveBeenCalled();
  });
});

/* ─── maxSize validation ─────────────────────────────────────────────────────── */

describe('FileUpload — maxSize validation', () => {
  it('shows error state when a file exceeds maxSize', async () => {
    render(<FileUpload maxSize={100} onDrop={vi.fn()} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = makeFile('large.txt', 500);

    await userEvent.upload(input, bigFile);

    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    expect(zone).toHaveClass('arch-file-upload__zone--error');
  });

  it('renders an error message via role="alert" when file too large', async () => {
    render(<FileUpload maxSize={100} onDrop={vi.fn()} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = makeFile('large.txt', 500);

    await userEvent.upload(input, bigFile);

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('does not show error when file is within maxSize', async () => {
    render(<FileUpload maxSize={1000} onDrop={vi.fn()} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const smallFile = makeFile('small.txt', 50);

    await userEvent.upload(input, smallFile);

    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    expect(zone).not.toHaveClass('arch-file-upload__zone--error');
  });

  it('still calls onDrop with valid files when some exceed maxSize', async () => {
    const onDrop = vi.fn();
    render(<FileUpload maxSize={200} multiple onDrop={onDrop} />);
    const zone = document.querySelector('.arch-file-upload__zone') as Element;
    const smallFile = makeFile('small.txt', 100);
    const bigFile = makeFile('big.txt', 500);

    fireEvent.drop(zone, {
      dataTransfer: { files: [smallFile, bigFile] },
    });

    expect(onDrop).toHaveBeenCalledWith([smallFile]);
  });
});

/* ─── Labels (i18n) ─────────────────────────────────────────────────────────── */

describe('FileUpload — labels (i18n)', () => {
  it('uses default error message', async () => {
    render(<FileUpload maxSize={100} onDrop={vi.fn()} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = makeFile('large.txt', 500);

    await userEvent.upload(input, bigFile);

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('1 file exceeds the 0 KB limit.');
  });

  it('accepts a custom fileSizeError label', async () => {
    render(
      <FileUpload
        maxSize={100}
        onDrop={vi.fn()}
        labels={{ fileSizeError: (count, limit) => `${count} fichier(s) dépasse(nt) ${limit}.` }}
      />
    );
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = makeFile('large.txt', 500);

    await userEvent.upload(input, bigFile);

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('1 fichier(s) dépasse(nt) 0 KB.');
  });
});

/* ─── Accessibility ──────────────────────────────────────────────────────────── */

describe('FileUpload — accessibility', () => {
  it('passes axe in default state', async () => {
    const { container } = render(
      <FileUpload aria-label="Upload files">
        <span>Drag and drop files here</span>
      </FileUpload>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes axe when disabled', async () => {
    const { container } = render(
      <FileUpload aria-label="Upload files" disabled>
        <span>Upload disabled</span>
      </FileUpload>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
