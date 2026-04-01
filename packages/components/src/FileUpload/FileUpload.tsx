import React, { forwardRef, useId, useState } from 'react';
import './FileUpload.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export interface FileUploadProps {
  /**
   * Comma-separated list of accepted MIME types or file extensions.
   * Passed directly to the hidden input's accept attribute.
   * Example: "image/*,.pdf"
   */
  accept?: string;
  /** Allows selecting multiple files at once. */
  multiple?: boolean;
  /** Maximum individual file size in bytes. Files exceeding this trigger the error state. */
  maxSize?: number;
  /** Disables the drop zone and prevents file selection. */
  disabled?: boolean;
  /**
   * Callback fired when files are selected (via dialog or drag-and-drop)
   * and pass validation.
   */
  onDrop?: (files: File[]) => void;
  /** Additional CSS class names applied to the root wrapper div. */
  className?: string;
  /** Content rendered inside the drop zone (instructions, icon, etc.). */
  children?: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * FileUpload
 *
 * A file upload drop zone with drag-and-drop support. A visually styled
 * <label> wraps a hidden <input type="file">. Clicking the zone opens the
 * native file dialog; files may also be dragged onto the zone.
 *
 * Validates files against the maxSize prop. Rejected files trigger the error
 * state and an error message is announced via role="alert".
 *
 * @example
 * <FileUpload
 *   accept="image/*"
 *   multiple
 *   maxSize={5 * 1024 * 1024}
 *   onDrop={(files) => console.log(files)}
 * >
 *   <p>Drag and drop images here or <strong>browse</strong></p>
 *   <p>PNG, JPG up to 5 MB</p>
 * </FileUpload>
 */
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    accept,
    multiple = false,
    maxSize,
    disabled = false,
    onDrop,
    className,
    children,
  },
  ref
) {
  const inputId = useId();
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ── Validation ──────────────────────────────────────────────────────────── */

  function validateFiles(fileList: FileList | File[]): {
    valid: File[];
    error: string | null;
  } {
    const files = Array.from(fileList);
    if (!maxSize) return { valid: files, error: null };

    const oversized = files.filter((f) => f.size > maxSize);
    if (oversized.length > 0) {
      const limit = maxSize >= 1024 * 1024
        ? `${(maxSize / (1024 * 1024)).toFixed(0)} MB`
        : `${(maxSize / 1024).toFixed(0)} KB`;
      return {
        valid: files.filter((f) => f.size <= maxSize),
        error: `${oversized.length} file${oversized.length > 1 ? 's' : ''} exceed${oversized.length === 1 ? 's' : ''} the ${limit} limit.`,
      };
    }
    return { valid: files, error: null };
  }

  /* ── Input change (file dialog) ──────────────────────────────────────────── */

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const { valid, error } = validateFiles(e.target.files);
    setErrorMessage(error);
    if (valid.length > 0 && onDrop) {
      onDrop(valid);
    }
    /* Reset so the same file can be re-selected after rejection */
    e.target.value = '';
  }

  /* ── Drag events ─────────────────────────────────────────────────────────── */

  function handleDragEnter(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    const { valid, error } = validateFiles(files);
    setErrorMessage(error);
    if (valid.length > 0 && onDrop) {
      onDrop(valid);
    }
  }

  /* ── Classes ─────────────────────────────────────────────────────────────── */

  const wrapperClasses = ['arch-file-upload', className]
    .filter(Boolean)
    .join(' ');

  const zoneClasses = [
    'arch-file-upload__zone',
    isDragOver ? 'arch-file-upload__zone--dragover' : '',
    errorMessage ? 'arch-file-upload__zone--error' : '',
    disabled ? 'arch-file-upload__zone--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {/*
        The hidden input must come BEFORE the label in DOM order so the
        :focus-visible sibling selector in CSS can reach the label/zone.
      */}
      <input
        ref={ref}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-disabled={disabled ? true : undefined}
        onChange={handleInputChange}
        className="arch-file-upload__input"
        tabIndex={disabled ? -1 : 0}
      />
      <label
        htmlFor={inputId}
        className={zoneClasses}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children}
      </label>
      {errorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="arch-file-upload__error"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
});

export { FileUpload };
export default FileUpload;
