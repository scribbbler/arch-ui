import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import './TabsMotion.css';

/* ─── Types ──────────────────────────────────────────────────────────────────── */

export interface TabMotionItem {
  /** Unique identifier for this tab. */
  key: string;
  /** Visible label rendered inside the tab button. */
  label: React.ReactNode;
}

export type TabsMotionFill = 'fixed' | 'intrinsic';

export interface TabsMotionProps {
  /** Array of tab definitions. */
  tabs: TabMotionItem[];
  /** The key of the currently active tab (controlled). */
  activeKey: string;
  /** Called when the user activates a different tab. */
  onChange: (key: string) => void;
  /** Tab width behaviour. Defaults to 'intrinsic'. */
  fill?: TabsMotionFill;
  /** Additional CSS class names applied to the root element. */
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

/**
 * TabsMotion
 *
 * Animated tabs with a sliding underline indicator. The indicator smoothly
 * transitions between tabs using CSS transforms calculated from the active
 * tab button's position and dimensions.
 *
 * @example
 * <TabsMotion
 *   tabs={[
 *     { key: 'overview', label: 'Overview' },
 *     { key: 'settings', label: 'Settings' },
 *   ]}
 *   activeKey="overview"
 *   onChange={setActiveTab}
 * />
 */
const TabsMotion = forwardRef<HTMLDivElement, TabsMotionProps>(function TabsMotion(
  { tabs, activeKey, onChange, fill = 'intrinsic', className },
  ref
) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  /* Update indicator position when activeKey or tabs change */
  const updateIndicator = useCallback(() => {
    const activeIndex = tabs.findIndex((t) => t.key === activeKey);
    if (activeIndex === -1) return;

    const activeTab = tabRefs.current[activeIndex];
    const container = activeTab?.parentElement;
    if (!activeTab || !container) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    setIndicatorStyle({
      width: `${tabRect.width}px`,
      transform: `translateX(${tabRect.left - containerRect.left}px)`,
    });
  }, [activeKey, tabs]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  /* Recalculate on window resize */
  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const focusTab = useCallback((index: number) => {
    const btn = tabRefs.current[index];
    if (btn) btn.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextIndex = index < tabs.length - 1 ? index + 1 : 0;
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        nextIndex = index > 0 ? index - 1 : tabs.length - 1;
      } else if (event.key === 'Home') {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === 'End') {
        event.preventDefault();
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        focusTab(nextIndex);
        onChange(tabs[nextIndex].key);
      }
    },
    [tabs, onChange, focusTab]
  );

  const rootClasses = [
    'arch-tabs-motion',
    fill === 'fixed' && 'arch-tabs-motion--fill-fixed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={rootClasses}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="arch-tabs-motion__tablist"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              type="button"
              className={`arch-tabs-motion__tab${isActive ? ' arch-tabs-motion__tab--active' : ''}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onChange(tab.key)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {tab.label}
            </button>
          );
        })}
        <div
          ref={indicatorRef}
          className="arch-tabs-motion__indicator"
          aria-hidden="true"
          style={indicatorStyle}
        />
      </div>
    </div>
  );
});

export { TabsMotion };
export default TabsMotion;
