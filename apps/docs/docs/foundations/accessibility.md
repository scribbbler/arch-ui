---
sidebar_label: Accessibility
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>ACCESSIBILITY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Accessibility</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    WCAG 2.1 AA conformance out of the box — semantic HTML, keyboard support, and screen reader compatibility in every component.
  </p>
</div>

---

## Our commitment

Accessibility is not a feature toggle or an optional enhancement. It is a structural requirement of the design system. Every primitive, token, and component in Arch UI is evaluated against three questions:

1. **Can a keyboard-only user complete the interaction?**
2. **Does a screen reader convey the same meaning as the visual design?**
3. **Does the experience remain usable at 200% browser zoom?**

If the answer to any of these is no, the component is not considered shippable.

---

## WCAG 2.1 AA baseline

Arch UI targets [WCAG 2.1 Level AA](https://www.w3.org/TR/WCAG21/) as its minimum conformance level. This means:

| Principle | What it requires | How Arch UI addresses it |
|---|---|---|
| **Perceivable** | Content must be presentable in ways users can perceive | Color contrast ratios meet 4.5:1 for text, 3:1 for large text. All images require alt text. |
| **Operable** | UI must be operable through keyboard and assistive tech | Every interactive component supports full keyboard navigation and visible focus indicators. |
| **Understandable** | Information and UI operation must be understandable | Form fields include labels, error messages are descriptive, and language is declared on the page. |
| **Robust** | Content must be robust enough for diverse user agents | Components use semantic HTML elements and ARIA attributes only when necessary. |

---

## Key principles

### Semantic HTML first

Use the correct HTML element before reaching for ARIA. A `<button>` is always better than a `<div role="button">`. Semantic elements provide keyboard interaction, focus management, and screen reader announcements for free.

```html
<!-- Do: use semantic elements -->
<button onClick={handleSave}>Save changes</button>

<!-- Don't: recreate native behaviour -->
<div role="button" tabIndex={0} onClick={handleSave} onKeyDown={handleKeyDown}>
  Save changes
</div>
```

### Progressive enhancement

Arch UI components work without JavaScript for their core content. Interactive enhancements layer on top of a baseline that is already accessible. A disclosure component, for example, renders its content in the DOM even before JS hydrates — collapsed state is a visual enhancement, not a content gate.

### No ARIA is better than bad ARIA

Incorrect ARIA attributes are worse than no ARIA at all. A `role="button"` without keyboard event handling creates a lie in the accessibility tree. Arch UI follows the [first rule of ARIA](https://www.w3.org/TR/using-aria/#firstrule): if you can use a native HTML element with the semantics you need, do that instead.

---

## Color and contrast

All Arch UI color tokens are designed to meet minimum contrast ratios:

- **Normal text** (under 18px or 14px bold): 4.5:1 contrast ratio against its background
- **Large text** (18px+ or 14px+ bold): 3:1 contrast ratio against its background
- **UI components and graphics**: 3:1 contrast ratio against adjacent colors

Never rely on color alone to convey meaning. Pair color with text labels, icons, or patterns. For example, error states in Arch UI use a red border, an error icon, and a text message together — not just a red border.

```jsx
// Do: combine color with text and icon
<Alert intent="error" icon={<ErrorIcon />}>
  Upload failed. The file exceeds the 10 MB limit.
</Alert>

// Don't: rely on color alone
<div style={{ borderColor: 'red' }}>
  Upload failed.
</div>
```

---

## Focus management

Every interactive element in Arch UI displays a visible focus indicator using `var(--color-border-focus)`. This applies to:

- Buttons, links, and form controls
- Menu items and list selections
- Modal and drawer focus traps
- Custom interactive widgets

Focus indicators use a 2px outline with a 2px offset, ensuring they remain visible against any background color. The system never removes the `:focus-visible` outline.

### Focus trapping

Modal dialogs, drawers, and popovers trap focus within their boundaries while open. When the overlay closes, focus returns to the element that triggered it. This prevents keyboard users from becoming lost behind an open modal.

### Skip links

Applications should include a "Skip to main content" link as the first focusable element on the page. This lets keyboard users bypass repetitive navigation on every page load.

---

## Keyboard navigation

Arch UI follows the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for keyboard interaction patterns:

| Component type | Expected keyboard behaviour |
|---|---|
| **Button** | `Enter` or `Space` activates |
| **Link** | `Enter` activates |
| **Menu** | Arrow keys navigate, `Enter` selects, `Escape` closes |
| **Tabs** | Arrow keys switch tabs, `Tab` moves out of the tab list |
| **Modal** | `Escape` closes, `Tab` cycles within the modal |
| **Accordion** | `Enter` or `Space` toggles, arrow keys move between headers |
| **Combobox** | Arrow keys navigate options, `Enter` selects, `Escape` closes |

---

## Testing expectations

Accessibility testing is part of the definition of done for every Arch UI component. The testing pipeline includes:

1. **Automated checks** — axe-core runs against every component story in CI. Zero violations are allowed.
2. **Keyboard walkthrough** — manual verification that all interactions work without a mouse.
3. **Screen reader verification** — testing with VoiceOver (macOS) and NVDA (Windows) to confirm announcements are accurate.
4. **Zoom testing** — verifying the layout at 200% browser zoom with no content loss or overlap.

---

## Further reading

The following pages go deeper into specific accessibility topics:

- [Building A11y First](/foundations/a11y-first) — designing with accessibility from the start
- [Alternative Text](/foundations/alt-text) — writing effective alt text for images and icons
- [Screen Readers](/foundations/screen-readers) — ARIA patterns and screen reader testing
- [Text Resizing](/foundations/text-resizing) — supporting browser zoom and relative units
