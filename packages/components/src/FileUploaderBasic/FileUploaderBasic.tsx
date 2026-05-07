import React, { forwardRef, useRef, useCallback } from 'react';
import './FileUploaderBasic.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export interface FileUploaderBasicProps {
  /** Comma-separated list of accepted MIME types or file extensions. */
  accept?: string;
  /** Callback fired when a file is selected or cleared. */
  onChange?: (file: File | null) => void;
  /** Disables the upload button. */
  disabled?: boolean;
  /** Custom label content for the upload button. Defaults to 'Upload file'. */
  children?: React.ReactNode;
  /** Additional CSS class names applied to the root wrapper element. */
  className?: string;
}

/* ─── Icon ───────────────────────────────────────────────────────────────────── */

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * FileUploaderBasic
 *
 * A simple single file upload button. Unlike FileUpload, this component does
 * not render a drag-and-drop zone — it provides a styled button that triggers
 * the native file dialog.
 *
 * @example
 * <FileUploaderBasic
 *   accept="image/*,.pdf"
 *   onChange={(file) => console.log(file)}
 * >
 *   Upload document
 * </FileUploaderBasic>
 */
const FileUploaderBasic = forwardRef<HTMLDivElement, FileUploaderBasicProps>(function FileUploaderBasic(
  {
    accept,
    onChange,
    disabled = false,
    children = 'Upload file',
    className,
    ...rest
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const wrapperClasses = ['arch-file-uploader-basic', className]
    .filter(Boolean)
    .join(' ');

  const handleClick = useCallback(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  }, [disabled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      onChange?.(file);
      /* Reset the input so the same file can be re-selected */
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onChange]
  );

  return (
    <div ref={ref} className={wrapperClasses} {...rest}>
      <input
        ref={inputRef}
        type="file"
        className="arch-file-uploader-basic__input"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        tabIndex={-1}
        aria-hidden="true"
      />
      <button
        type="button"
        className="arch-file-uploader-basic__button"
        disabled={disabled}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
      >
        <span className="arch-file-uploader-basic__icon">
          <UploadIcon />
        </span>
        {children}
      </button>
    </div>
  );
});

export { FileUploaderBasic };
export default FileUploaderBasic;
