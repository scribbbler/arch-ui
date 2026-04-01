# Accessibility Guidelines

Claude Code must read this document before writing any component. These rules are non-negotiable. Every component in the Arch Design System must meet WCAG 2.1 AA.

---

## Required for Every Component

- Does not rely on colour alone to communicate state — always combine with icon, text, or pattern
- Supports `prefers-reduced-motion` — no animation when set
- Text meets WCAG AA contrast: 4.5:1 for body text, 3:1 for large text (18px+ or 14px+ bold)
- Non-text contrast meets 3:1 (borders, icons, UI components)

---

## Required for Every Interactive Component

- Correct ARIA role
- All interactive states communicated via aria attributes (not just visually)
- Keyboard interaction pattern defined and implemented (tab, enter, space, escape, arrow keys where applicable)
- Focus visible style using `var(--color-border-focus)` token, minimum 3:1 contrast ratio against adjacent colours
- Touch target minimum size: 44×44px for any interactive element

---

## Required for Form Elements

- Visible label (not just placeholder)
- Error message is announced via `aria-live` or `aria-describedby`
- Required fields marked with `aria-required="true"` and visually (not colour alone)
- Invalid fields marked with `aria-invalid="true"`
- Disabled fields use `aria-disabled="true"` or the native `disabled` attribute

---

## Keyboard Patterns Reference

| Pattern | Keyboard behaviour |
|---|---|
| Button | Enter or Space activates |
| Link | Enter activates |
| Dialog / Modal | Tab cycles within, Escape closes, focus returns to trigger |
| Tooltip | Appears on focus, Escape dismisses |
| Tabs | Arrow keys navigate tabs, Tab moves into panel |
| Accordion | Enter/Space toggle section, arrow keys move between headers |
| Combobox | Arrow keys navigate list, Enter selects, Escape closes |
| Menu | Arrow keys navigate items, Escape closes, Tab moves out |
| Checkbox | Space toggles |
| Radio | Arrow keys move selection within group |
| Switch / Toggle | Space toggles |
| Slider | Arrow keys adjust value |

---

## Focus Management

- Focus must never be lost. When a UI element is removed (e.g. a modal closes), focus returns to the element that triggered it.
- Use `FocusTrap` for modal dialogs and drawers.
- Skip navigation (`SkipNav`) must be the first focusable element on the page.
- Focus order must match visual order — do not use `tabindex` values greater than 0.

---

## Testing Requirements

Every component must pass:

1. **axe-core** — zero violations via `vitest-axe`
2. **Keyboard test** — all functionality reachable without a mouse
3. **Screen reader** — state changes announced correctly (manual verification)

---

## Checklist Per Component

Before marking a component complete, verify:

- [ ] Correct ARIA role assigned
- [ ] All states have aria attributes (not just CSS classes)
- [ ] `:focus-visible` style uses `var(--color-border-focus)`
- [ ] Interactive elements meet 44×44px touch target
- [ ] Does not rely on colour alone
- [ ] `prefers-reduced-motion` respected (animations stop)
- [ ] axe-core passes with zero violations
- [ ] Keyboard interaction matches the pattern table above
