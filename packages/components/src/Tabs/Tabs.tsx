import React, { forwardRef, useRef, useCallback } from 'react';
import './Tabs.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TabItem {
  /** Visible label shown in the tab button. */
  label: string;
  /** Unique identifier for this tab. Used as the controlled value. */
  value: string;
  /** Content rendered inside the tab panel when this tab is active. */
  content: React.ReactNode;
  /** When true the tab is non-interactive and skipped during keyboard navigation. */
  disabled?: boolean;
  /** Optional icon or artwork rendered before the tab label. */
  artwork?: React.ReactNode;
}

export type TabsVariant = 'line' | 'enclosed';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsFill = 'fixed' | 'intrinsic';

export interface TabsProps {
  /** Array of tab definitions. */
  tabs: TabItem[];
  /** Value of the currently active tab (controlled). */
  activeValue: string;
  /** Called when the user activates a tab. */
  onChange: (value: string) => void;
  /** Visual style of the tab bar. Defaults to 'line'. */
  variant?: TabsVariant;
  /** Layout direction. Defaults to 'horizontal'. */
  orientation?: TabsOrientation;
  /**
   * Tab width behaviour. 'intrinsic' sizes tabs to their content.
   * 'fixed' makes all tabs equal width. Defaults to 'intrinsic'.
   */
  fill?: TabsFill;
  /**
   * When true, all tab panels are rendered in the DOM (hidden ones via CSS)
   * so their content is available for SEO. Defaults to false.
   */
  renderAll?: boolean;
  /** Additional class names applied to the root element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * Tabs
 *
 * A controlled, accessible tab component. Supports horizontal and vertical
 * layouts plus two visual variants. Keyboard navigation follows the ARIA
 * Authoring Practices Guide: arrow keys move between tabs, Home/End jump to
 * the first/last enabled tab, and Tab moves focus into the active panel.
 *
 * @example
 * <Tabs
 *   tabs={[
 *     { label: 'Overview', value: 'overview', content: <p>Overview content</p> },
 *     { label: 'Settings', value: 'settings', content: <p>Settings content</p> },
 *   ]}
 *   activeValue="overview"
 *   onChange={setActiveTab}
 * />
 */
const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    tabs,
    activeValue,
    onChange,
    variant = 'line',
    orientation = 'horizontal',
    fill = 'intrinsic',
    renderAll = false,
    className,
  },
  ref
) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const enabledIndices = tabs
    .map((tab, i) => (tab.disabled ? null : i))
    .filter((i): i is number => i !== null);

  const focusTabAt = useCallback(
    (index: number) => {
      const btn = tabRefs.current[index];
      if (btn) {
        btn.focus();
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const isHorizontal = orientation === 'horizontal';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

      if (event.key === prevKey || event.key === nextKey) {
        event.preventDefault();
        const currentEnabled = enabledIndices.indexOf(currentIndex);
        if (currentEnabled === -1) return;

        let nextEnabled: number;
        if (event.key === prevKey) {
          nextEnabled =
            currentEnabled === 0
              ? enabledIndices[enabledIndices.length - 1]
              : enabledIndices[currentEnabled - 1];
        } else {
          nextEnabled =
            currentEnabled === enabledIndices.length - 1
              ? enabledIndices[0]
              : enabledIndices[currentEnabled + 1];
        }
        focusTabAt(nextEnabled);
        onChange(tabs[nextEnabled].value);
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        if (enabledIndices.length > 0) {
          const first = enabledIndices[0];
          focusTabAt(first);
          onChange(tabs[first].value);
        }
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        if (enabledIndices.length > 0) {
          const last = enabledIndices[enabledIndices.length - 1];
          focusTabAt(last);
          onChange(tabs[last].value);
        }
      }
    },
    [enabledIndices, focusTabAt, onChange, orientation, tabs]
  );

  const rootClasses = [
    'arch-tabs',
    `arch-tabs--${variant}`,
    `arch-tabs--${orientation}`,
    fill === 'fixed' ? 'arch-tabs--fill-fixed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={rootClasses}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className="arch-tabs__tablist"
      >
        {tabs.map((tab, index) => {
          const tabId = `arch-tab-${tab.value}`;
          const panelId = `arch-tabpanel-${tab.value}`;
          const isSelected = tab.value === activeValue;

          return (
            <button
              key={tab.value}
              id={tabId}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              aria-disabled={tab.disabled ? 'true' : undefined}
              tabIndex={isSelected ? 0 : -1}
              className="arch-tabs__tab"
              onClick={() => {
                if (!tab.disabled) {
                  onChange(tab.value);
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              type="button"
            >
              {tab.artwork && (
                <span className="arch-tabs__artwork" aria-hidden="true">
                  {tab.artwork}
                </span>
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const tabId = `arch-tab-${tab.value}`;
        const panelId = `arch-tabpanel-${tab.value}`;
        const isActive = tab.value === activeValue;

        if (!renderAll && !isActive) return null;

        return (
          <div
            key={tab.value}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            className={`arch-tabs__panel${!isActive ? ' arch-tabs__panel--hidden' : ''}`}
            hidden={!isActive && !renderAll ? true : undefined}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
});

export { Tabs };
export default Tabs;
