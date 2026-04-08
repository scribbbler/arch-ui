---
sidebar_label: Sheet
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTAINERS AND LAYOUT</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Sheet</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A panel overlay that slides in from the bottom or side of the viewport with drag-to-dismiss and snap points.
  </p>
</div>

## Usage

Sheet is built on top of the Drawer component with additional bottom-sheet affordances. Use Drawer with `position="bottom"` for the foundational behaviour.

```jsx
import { Drawer } from '@arch-ui/components';

function FilterSheet({ isOpen, onClose }) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      size="24rem"
      aria-label="Filters"
    >
      <div style={{ padding: 'var(--spacing-16)' }}>
        <h2>Filters</h2>
        <p>Filter controls go here.</p>
        <button onClick={onClose}>Apply</button>
      </div>
    </Drawer>
  );
}
```

## When to use

- **Mobile filters** -- present a list of filter controls that the user can dismiss by tapping the overlay or swiping down.
- **Detail previews** -- show a summary of a selected item without navigating away from a list view.
- **Action menus** -- on touch devices, a bottom sheet is more thumb-friendly than a dropdown or context menu.
- **Side panels** -- on larger screens, a sheet sliding from the side can serve as a persistent inspector or properties panel.

## When not to use

- Dialogs that require an explicit response. Use Modal instead.
- Navigation drawers that persist across pages. Use Drawer with `position="start"`.
- Tooltips or small contextual panels. Use Popover.

## Anatomy

A typical Sheet contains:

1. **Handle** (optional) -- a small drag indicator bar at the top that signals the panel can be swiped to dismiss.
2. **Header** -- a title and optional close button.
3. **Content area** -- scrollable body for the sheet's primary content.
4. **Footer** (optional) -- action buttons pinned to the bottom.

## Bottom sheet pattern

The most common pattern. The sheet slides up from the bottom edge with rounded top corners.

```jsx
<Drawer isOpen={isOpen} onClose={onClose} position="bottom" size="50vh">
  <div className="sheet-handle" />
  <h3>Select an option</h3>
  <ul>
    <li><button>Option A</button></li>
    <li><button>Option B</button></li>
    <li><button>Option C</button></li>
  </ul>
</Drawer>
```

## Side sheet pattern

On tablet and desktop viewports, a side sheet provides an inspector or detail panel that coexists with the main content.

```jsx
<Drawer isOpen={isOpen} onClose={onClose} position="end" size="24rem">
  <h3>Item details</h3>
  <p>Properties and metadata for the selected item.</p>
</Drawer>
```

## Accessibility

- Inherits all Drawer accessibility features: `role="dialog"`, `aria-modal="true"`, focus trapping, scroll lock, and Escape key dismissal.
- If a drag handle is present, ensure it has an accessible label (e.g., `aria-label="Drag to resize"`) and is keyboard operable.
- Provide a clear close affordance (button or overlay tap) in addition to any gesture-based dismissal.
