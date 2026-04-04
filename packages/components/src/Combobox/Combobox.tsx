import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Portal } from '../Portal';
import { Tag } from '../Tag';
import './Combobox.css';

/* ─── Types ───────────────────────────────────────────────────────────────────── */

export type ComboboxSize = 'mini' | 'compact' | 'default' | 'large';

export interface ComboboxOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  /** The list of selectable options. */
  options: ComboboxOption[];
  /** The currently selected option id(s). */
  value?: string | string[];
  /** Called when the selection changes. */
  onChange?: (value: string | string[]) => void;
  /** Called when the search input text changes. */
  onInputChange?: (inputValue: string) => void;
  /** Controlled search text value. */
  inputValue?: string;
  /** Enables multi-select mode. Defaults to false. */
  multi?: boolean;
  /** Allows creating new options. Defaults to false. */
  creatable?: boolean;
  /** Called when a new option is created. */
  onCreate?: (value: string) => void;
  /** Shows a clear button. Defaults to true. */
  clearable?: boolean;
  /** Allows typing to filter options. Defaults to true. */
  searchable?: boolean;
  /** Disables the combobox. */
  disabled?: boolean;
  /** Placeholder text. Defaults to 'Select...'. */
  placeholder?: string;
  /** Size variant. Defaults to 'default'. */
  size?: ComboboxSize;
  /** Shows a positive (success) border style. */
  positive?: boolean;
  /** Shows an error border style. */
  error?: boolean;
  /** Additional CSS class names. */
  className?: string;
}

/* ─── Icons ───────────────────────────────────────────────────────────────────── */

function ClearIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 3L11 11M11 3L3 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points="6 9 12 15 18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────────── */

/**
 * Combobox
 *
 * A searchable dropdown select for complex use cases. Supports single and
 * multi-select, creatable options, and full keyboard navigation.
 *
 * @example
 * <Combobox
 *   options={[{ id: 'us', label: 'United States' }, { id: 'ca', label: 'Canada' }]}
 *   value={selected}
 *   onChange={setSelected}
 *   inputValue={search}
 *   onInputChange={setSearch}
 * />
 */
const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    onChange,
    onInputChange,
    inputValue = '',
    multi = false,
    creatable = false,
    onCreate,
    clearable = true,
    searchable = true,
    disabled = false,
    placeholder = 'Select...',
    size = 'default',
    positive = false,
    error = false,
    className,
  },
  ref
) {
  const listboxId = useId();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  /* ── Derived values ──────────────────────────────────────────────────── */

  const selectedIds: string[] = Array.isArray(value)
    ? value
    : value != null && value !== ''
      ? [value]
      : [];

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showCreateOption =
    creatable &&
    inputValue.trim() !== '' &&
    !options.some(
      (opt) => opt.label.toLowerCase() === inputValue.trim().toLowerCase()
    );

  const totalItems = filteredOptions.length + (showCreateOption ? 1 : 0);

  /* ── Positioning ─────────────────────────────────────────────────────── */

  const updateDropdownPosition = useCallback(() => {
    if (!controlRef.current) return;
    const rect = controlRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: 'absolute',
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);
      return () => {
        window.removeEventListener('scroll', updateDropdownPosition, true);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
    return undefined;
  }, [isOpen, updateDropdownPosition]);

  /* ── Open / close ────────────────────────────────────────────────────── */

  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setFocusedIndex(-1);
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  /* Click outside to close */
  useEffect(() => {
    if (!isOpen) return undefined;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        controlRef.current?.contains(target) ||
        listboxRef.current?.contains(target)
      ) {
        return;
      }
      close();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, close]);

  /* ── Selection handlers ──────────────────────────────────────────────── */

  const selectOption = useCallback(
    (optionId: string) => {
      if (multi) {
        const current = selectedIds;
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        onChange?.(next);
      } else {
        onChange?.(optionId);
        close();
      }
      onInputChange?.('');
      inputRef.current?.focus();
    },
    [multi, selectedIds, onChange, onInputChange, close]
  );

  const handleCreate = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed && onCreate) {
      onCreate(trimmed);
      onInputChange?.('');
      if (!multi) close();
      inputRef.current?.focus();
    }
  }, [inputValue, onCreate, onInputChange, multi, close]);

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multi ? [] : '');
      onInputChange?.('');
      inputRef.current?.focus();
    },
    [onChange, onInputChange, multi]
  );

  const handleRemoveTag = useCallback(
    (optionId: string) => {
      const next = selectedIds.filter((id) => id !== optionId);
      onChange?.(multi ? next : next[0] ?? '');
    },
    [selectedIds, onChange, multi]
  );

  /* ── Keyboard navigation ─────────────────────────────────────────────── */

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) {
            open();
            return;
          }
          setFocusedIndex((prev) => {
            let next = prev + 1;
            /* Skip disabled options */
            while (
              next < filteredOptions.length &&
              filteredOptions[next]?.disabled
            ) {
              next++;
            }
            return next < totalItems ? next : prev;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) return;
          setFocusedIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && filteredOptions[next]?.disabled) {
              next--;
            }
            return next >= 0 ? next : prev;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (!isOpen) {
            open();
            return;
          }
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            const opt = filteredOptions[focusedIndex];
            if (!opt.disabled) {
              selectOption(opt.id);
            }
          } else if (
            showCreateOption &&
            focusedIndex === filteredOptions.length
          ) {
            handleCreate();
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          close();
          break;
        }
        case 'Backspace': {
          if (multi && inputValue === '' && selectedIds.length > 0) {
            handleRemoveTag(selectedIds[selectedIds.length - 1]);
          }
          break;
        }
        default:
          break;
      }
    },
    [
      disabled,
      isOpen,
      open,
      close,
      focusedIndex,
      filteredOptions,
      totalItems,
      selectOption,
      showCreateOption,
      handleCreate,
      multi,
      inputValue,
      selectedIds,
      handleRemoveTag,
    ]
  );

  /* ── Scroll focused option into view ─────────────────────────────────── */

  useEffect(() => {
    if (focusedIndex < 0 || !listboxRef.current) return;
    const el = listboxRef.current.children[focusedIndex] as HTMLElement | undefined;
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [focusedIndex]);

  /* ── Input change ────────────────────────────────────────────────────── */

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onInputChange?.(e.target.value);
      if (!isOpen) open();
      setFocusedIndex(-1);
    },
    [onInputChange, isOpen, open]
  );

  /* ── Focus management ────────────────────────────────────────────────── */

  const [isFocused, setIsFocused] = useState(false);

  const handleControlClick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.focus();
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [disabled, isOpen, open, close]);

  /* ── Build class names ───────────────────────────────────────────────── */

  const rootClasses = [
    'arch-combobox',
    `arch-combobox--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const controlClasses = [
    'arch-combobox__control',
    isFocused && 'arch-combobox__control--focused',
    error && 'arch-combobox__control--error',
    positive && !error && 'arch-combobox__control--positive',
    disabled && 'arch-combobox__control--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  /* ── Focused option id for aria-activedescendant ─────────────────────── */

  const focusedOptionId =
    focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined;

  const hasValue = selectedIds.length > 0;

  return (
    <div ref={ref} className={rootClasses}>
      {/* Control area */}
      <div
        ref={controlRef}
        className={controlClasses}
        onClick={handleControlClick}
      >
        {/* Multi-select tags */}
        {multi &&
          selectedIds.map((id) => {
            const opt = options.find((o) => o.id === id);
            return opt ? (
              <Tag
                key={id}
                variant="neutral"
                onRemove={
                  disabled ? undefined : () => handleRemoveTag(id)
                }
              >
                {opt.label}
              </Tag>
            ) : null;
          })}

        {/* Input */}
        <input
          ref={inputRef}
          id={inputId}
          className="arch-combobox__input"
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={isOpen ? focusedOptionId : undefined}
          placeholder={hasValue && !multi ? undefined : placeholder}
          value={
            !multi && hasValue && !isFocused && inputValue === ''
              ? options.find((o) => o.id === selectedIds[0])?.label ?? ''
              : inputValue
          }
          disabled={disabled}
          readOnly={!searchable}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            if (!multi && hasValue && inputValue === '') {
              onInputChange?.('');
            }
          }}
          onBlur={() => setIsFocused(false)}
        />

        {/* Icons */}
        <span className="arch-combobox__icons">
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              className="arch-combobox__clear-btn"
              aria-label="Clear selection"
              tabIndex={-1}
              onClick={handleClear}
            >
              <ClearIcon />
            </button>
          )}
          <span className="arch-combobox__chevron">
            <ChevronIcon />
          </span>
        </span>
      </div>

      {/* Dropdown listbox via Portal */}
      {isOpen && (
        <Portal>
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable={multi || undefined}
            className="arch-combobox__listbox"
            style={dropdownStyle}
          >
            {filteredOptions.map((opt, index) => {
              const isSelected = selectedIds.includes(opt.id);
              const isFocusedOpt = index === focusedIndex;
              const optClasses = [
                'arch-combobox__option',
                isFocusedOpt && 'arch-combobox__option--focused',
                isSelected && 'arch-combobox__option--selected',
                opt.disabled && 'arch-combobox__option--disabled',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <li
                  key={opt.id}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled || undefined}
                  className={optClasses}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    if (!opt.disabled) selectOption(opt.id);
                  }}
                  onMouseEnter={() => {
                    if (!opt.disabled) setFocusedIndex(index);
                  }}
                >
                  {opt.label}
                </li>
              );
            })}

            {showCreateOption && (
              <li
                id={`${listboxId}-option-${filteredOptions.length}`}
                role="option"
                aria-selected={false}
                className={[
                  'arch-combobox__option',
                  'arch-combobox__option--create',
                  focusedIndex === filteredOptions.length &&
                    'arch-combobox__option--focused',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleCreate();
                }}
                onMouseEnter={() =>
                  setFocusedIndex(filteredOptions.length)
                }
              >
                Create &ldquo;{inputValue.trim()}&rdquo;
              </li>
            )}

            {filteredOptions.length === 0 && !showCreateOption && (
              <li className="arch-combobox__empty" aria-live="polite">
                No options
              </li>
            )}
          </ul>
        </Portal>
      )}
    </div>
  );
});

export { Combobox };
export default Combobox;
