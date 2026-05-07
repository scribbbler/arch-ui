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
import { Button } from '../Button';
import './Snackbar.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export type SnackbarVariant = 'default' | 'success' | 'warning' | 'error';

export interface SnackbarOptions {
  /** The notification message text. */
  message: string;
  /** Text for an optional action button. */
  actionLabel?: string;
  /** Callback fired when the action button is clicked. */
  onAction?: () => void;
  /** Visual and semantic variant. Defaults to 'default'. */
  variant?: SnackbarVariant;
  /** Auto-dismiss delay in milliseconds. Defaults to 5000. */
  autoHideDuration?: number;
}

export interface SnackbarItem extends SnackbarOptions {
  id: string;
}

export interface SnackbarProps extends SnackbarOptions {
  /** Called when the snackbar is dismissed. */
  onClose: () => void;
  /** Additional CSS class names. */
  className?: string;
}

export interface SnackbarProviderProps {
  /** App content to wrap. */
  children: React.ReactNode;
}

/* ─── Context ────────────────────────────────────────────────────────────────── */

interface SnackbarContextValue {
  snackbar: (options: SnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

/* ─── Snackbar item component ───────────────────────────────────────────────── */

/**
 * Snackbar
 *
 * A brief auto-dismissing notification bar at the bottom of the screen.
 * Typically created imperatively via the useSnackbar hook.
 */
const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function Snackbar(
  {
    message,
    actionLabel,
    onAction,
    variant = 'default',
    autoHideDuration = 5000,
    onClose,
    className,
  },
  ref
) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitDuration = 200;

  const dismiss = useCallback(() => {
    setExiting(true);
    timerRef.current = setTimeout(() => {
      onClose();
    }, exitDuration);
  }, [onClose]);

  useEffect(() => {
    if (autoHideDuration === 0) return;
    const id = setTimeout(dismiss, autoHideDuration);
    timerRef.current = id;
    return () => {
      clearTimeout(id);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoHideDuration, dismiss]);

  const ariaLive = variant === 'error' ? 'assertive' : 'polite';

  const classes = [
    'arch-snackbar',
    variant !== 'default' && `arch-snackbar--${variant}`,
    exiting && 'arch-snackbar--exiting',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      <span className="arch-snackbar__message">{message}</span>
      {actionLabel && onAction && (
        <Button
          kind="tertiary"
          size="compact"
          className="arch-snackbar__action"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
});

/* ─── SnackbarProvider ──────────────────────────────────────────────────────── */

/**
 * SnackbarProvider
 *
 * Place once at the root of your application. Provides the useSnackbar hook
 * and renders a portal-mounted snackbar region at the bottom of the screen.
 *
 * @example
 * <SnackbarProvider>
 *   <App />
 * </SnackbarProvider>
 */
function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const uid = useId();
  const counterRef = useRef(0);

  const addSnackbar = useCallback(
    (options: SnackbarOptions) => {
      counterRef.current += 1;
      const id = `${uid}-snackbar-${counterRef.current}`;
      setSnackbars((prev) => [...prev, { ...options, id }]);
    },
    [uid]
  );

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <SnackbarContext.Provider value={{ snackbar: addSnackbar }}>
      {children}
      {mounted &&
        createPortal(
          <div className="arch-snackbar-container" aria-label="Notifications">
            {snackbars.map((item) => (
              <Snackbar
                key={item.id}
                message={item.message}
                actionLabel={item.actionLabel}
                onAction={item.onAction}
                variant={item.variant}
                autoHideDuration={item.autoHideDuration}
                onClose={() => removeSnackbar(item.id)}
              />
            ))}
          </div>,
          document.body
        )}
    </SnackbarContext.Provider>
  );
}

/* ─── useSnackbar ───────────────────────────────────────────────────────────── */

/**
 * useSnackbar
 *
 * Returns { snackbar } for imperatively adding snackbar notifications. Must be
 * used inside a SnackbarProvider.
 *
 * @example
 * const { snackbar } = useSnackbar();
 * snackbar({ message: 'Item deleted', actionLabel: 'Undo', onAction: handleUndo });
 */
function useSnackbar(): SnackbarContextValue {
  const ctx = useContext(SnackbarContext);
  if (ctx === null) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return ctx;
}

export { Snackbar, SnackbarProvider, useSnackbar };
export default Snackbar;
