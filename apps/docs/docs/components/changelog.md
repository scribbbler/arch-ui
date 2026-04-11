---
sidebar_label: Changelog
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>COMPONENTS</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Changelog</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    All notable changes to Arch UI components, grouped by release and change type.
  </p>
</div>

---

## v0.10.0 — 2026-04-01

Adds three new utility components and expands Button's variant set. All components remain in Beta until the public 1.0.0 release.

### Added

- **FormControl** — new component for wrapping inputs with labels, helper text, and validation messages.
- **FocusTrap** — utility component for managing keyboard focus within modals and drawers.
- **VisuallyHidden** — utility for providing accessible text that is hidden from sighted users.
- Token tier documentation generated from `@arch-ui/tokens` build output.

---

### Changed

- **Button** — the `variant` prop now accepts `"danger"` in addition to existing values.
- **Modal** — improved focus restoration behaviour when the modal closes. Focus now returns to the element that triggered the open action.
- **Tooltip** — default delay increased from 200ms to 300ms to reduce accidental activations.

---

### Fixed

- **Select** — resolved an issue where the dropdown would not close on outside click in Safari.
- **Tabs** — arrow key navigation now wraps correctly when reaching the last tab.
- **Tag** — dismiss button now announces removal to screen readers.

---

### Deprecated

- **Modal Sheet** — this component is deprecated and will be removed in a future release. Use **Drawer** with `position="bottom"` instead.

---

## v0.9.0 — 2026-03-01

### Added

- **Drawer** — slide-in panel component with support for left, right, and bottom positions.
- **Skeleton** — placeholder loading component with pulse and wave animation variants.
- **ProgressSteps** — multi-step progress indicator for wizard-style flows.
- **SkipNav** — skip navigation link for keyboard users to bypass repetitive content.

---

### Changed

- **Card** — added `as` prop to allow rendering as different HTML elements.
- **Input** — error state now uses `aria-invalid` and `aria-describedby` for better screen reader support.
- **Badge** — reduced minimum width to accommodate single-character content.

---

### Fixed

- **Popover** — positioning now accounts for scroll offset in nested scrollable containers.
- **Accordion** — fixed animation stutter when rapidly toggling multiple panels.
- **Slider** — thumb element now receives focus on click in Firefox.

---

## v0.8.0 — 2026-02-01

### Added

- **Toast** — notification component with auto-dismiss, stacking, and action support.
- **Breadcrumbs** — navigation component with overflow handling for deep hierarchies.
- **Stepper** — vertical and horizontal step indicator for multi-page forms.
- **Pagination** — page navigation with configurable visible page range.

---

### Changed

- **Alert** — renamed `type` prop to `intent` to align with the design token naming convention.
- **Divider** — now supports `vertical` orientation via the `orientation` prop.
- **Spinner** — size values updated to use spacing tokens instead of fixed pixel values.

---

### Fixed

- **Checkbox** — indeterminate state now renders correctly when controlled.
- **RadioGroup** — fixed missing `name` attribute propagation to child Radio components.
- **Table** — header row now uses `th` elements with correct `scope` attributes.
