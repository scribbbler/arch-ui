import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import {
  DEFAULT_TOAST_LABELS,
  DEFAULT_PROVIDER_LABELS,
  type ToastLabels,
  type ToastProviderLabels,
} from './Toast.labels';
import './Toast.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type ToastVariant = 'default' | 'success' | 'warning' | 'danger';
export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-center';

export interface ToastOptions {
  /** Bold notification heading. */
  title: string;
  /** Optional supporting text. */
  description?: string;
  /** Visual/semantic variant. Defaults to 'default'. */
  variant?: ToastVariant;
  /**
   * Auto-dismiss delay in milliseconds. Pass 0 for persistent toast.
   * Defaults to 5000.
   */
  duration?: number;
}

export interface ToastItem extends ToastOptions {
  id: string;
}

export interface ToastProps extends ToastOptions {
  /** Called when the toast is dismissed. */
  onClose: () => void;
  /** Override default labels for internationalisation. */
  labels?: Partial<ToastLabels>;
  /** Additional CSS class names. */
  className?: string;
}

export interface ToastProviderProps {
  /** Stack position on screen. Defaults to 'top-right'. */
  position?: ToastPosition;
  /** Override default labels for internationalisation. */
  labels?: Partial<ToastProviderLabels>;
  /** App content to wrap. */
  children: React.ReactNode;
}

/* ─── Context ────────────────────────────────────────────────────────────────── */

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/* ─── Close icon ─────────────────────────────────────────────────────────────── */

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 3L3 11M3 3l8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── ToastItem component ────────────────────────────────────────────────────── */

/**
 * Toast
 *
 * An individual toast notification. Typically created imperatively via the
 * useToast hook rather than rendered directly.
 */
const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    variant = 'default',
    title,
    description,
    duration = 5000,
    onClose,
    labels,
    className,
  },
  ref
) {
  const mergedLabels = { ...DEFAULT_TOAST_LABELS, ...labels };
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitDuration = 200; // ms — matches motion-duration-fast approximately

  const dismiss = useCallback(() => {
    setExiting(true);
    timerRef.current = setTimeout(() => {
      onClose();
    }, exitDuration);
  }, [onClose]);

  useEffect(() => {
    if (duration === 0) return;
    const id = setTimeout(dismiss, duration);
    return () => {
      clearTimeout(id);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, dismiss]);

  const ariaLive = variant === 'danger' ? 'assertive' : 'polite';

  const classes = [
    'arch-toast',
    variant !== 'default' && `arch-toast--${variant}`,
    exiting && 'arch-toast--exiting',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      role={variant === 'danger' ? 'alert' : 'status'}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      <span className="arch-toast__body">
        <strong className="arch-toast__title">{title}</strong>
        {description && (
          <span className="arch-toast__description">{description}</span>
        )}
      </span>
      <button
        type="button"
        className="arch-toast__close"
        aria-label={mergedLabels.dismiss}
        onClick={dismiss}
      >
        <CloseIcon />
      </button>
    </div>
  );
});

/* ─── ToastProvider ──────────────────────────────────────────────────────────── */

/**
 * ToastProvider
 *
 * Place once at the root of your application. Provides the useToast hook and
 * renders a portal-mounted toast stack.
 *
 * @example
 * <ToastProvider position="top-right">
 *   <App />
 * </ToastProvider>
 */
function ToastProvider({ position = 'top-right', labels, children }: ToastProviderProps) {
  const mergedProviderLabels = { ...DEFAULT_PROVIDER_LABELS, ...labels };
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const uid = useId();
  const counterRef = useRef(0);

  const addToast = useCallback((options: ToastOptions) => {
    counterRef.current += 1;
    const id = `${uid}-toast-${counterRef.current}`;
    setToasts((prev) => [...prev, { ...options, id }]);
  }, [uid]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const containerClasses = [
    'arch-toast-container',
    `arch-toast-container--${position}`,
  ].join(' ');

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {mounted &&
        createPortal(
          <div className={containerClasses} aria-label={mergedProviderLabels.notifications}>
            {toasts.map((item) => (
              <Toast
                key={item.id}
                variant={item.variant}
                title={item.title}
                description={item.description}
                duration={item.duration}
                onClose={() => removeToast(item.id)}
              />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

/* ─── useToast ───────────────────────────────────────────────────────────────── */

/**
 * useToast
 *
 * Returns { toast } for imperatively adding toast notifications. Must be used
 * inside a ToastProvider.
 *
 * @example
 * const { toast } = useToast();
 * toast({ title: 'Saved', variant: 'success' });
 */
function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (ctx === null) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

export { Toast, ToastProvider, useToast };
export type { ToastLabels, ToastProviderLabels } from './Toast.labels';
export { DEFAULT_TOAST_LABELS, DEFAULT_PROVIDER_LABELS } from './Toast.labels';
export default Toast;
