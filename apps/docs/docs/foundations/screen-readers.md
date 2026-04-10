---
sidebar_label: Screen readers
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>ACCESSIBILITY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Screen readers</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Ensure your interface is accurately represented in the accessibility tree so screen readers convey the same meaning as the visual design.
  </p>
</div>

---

## How screen readers work

A screen reader does not "read the screen." It reads the **accessibility tree** — a parallel structure the browser builds from the DOM. The accessibility tree contains:

- **Role** — what the element is (button, link, heading, checkbox)
- **Name** — what the element is called (the button label, the heading text)
- **State** — the element's current condition (checked, expanded, disabled, selected)
- **Value** — the element's current value (slider position, text input content)

If your HTML produces the correct accessibility tree, screen readers will present it accurately. If it does not, no amount of ARIA will fully compensate.

---

## ARIA roles, states, and properties

### When to use ARIA

Use ARIA when native HTML semantics are insufficient for the widget you are building. Common cases:

| Widget | Native HTML available? | ARIA needed? |
|---|---|---|
| Button | Yes (`<button>`) | No |
| Link | Yes (`<a href>`) | No |
| Checkbox | Yes (`<input type="checkbox">`) | No |
| Tabs | No | Yes — `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| Combobox | Partially (`<datalist>`) | Yes — `role="combobox"`, `aria-expanded`, `aria-activedescendant` |
| Tree view | No | Yes — `role="tree"`, `role="treeitem"`, `aria-expanded` |
| Alert | Partially (`role="alert"`) | Yes — for dynamic alerts not present on page load |

### Essential ARIA attributes

**`aria-label`** — Provides an accessible name when no visible text is present.

```jsx
<button aria-label="Close">
  <XIcon aria-hidden="true" />
</button>
```

**`aria-labelledby`** — Points to an element whose text content serves as the label. Preferred over `aria-label` when a visible label exists elsewhere.

```jsx
<h2 id="settings-heading">Account settings</h2>
<div role="region" aria-labelledby="settings-heading">
  {/* settings content */}
</div>
```

**`aria-describedby`** — Points to an element that provides supplemental description, such as help text or error messages.

```jsx
<label htmlFor="password">Password</label>
<input id="password" type="password" aria-describedby="password-help password-error" />
<p id="password-help">Must be at least 8 characters.</p>
<p id="password-error" role="alert">Password is too short.</p>
```

**`aria-expanded`** — Communicates whether a collapsible section is open or closed.

```jsx
<button aria-expanded={isOpen} aria-controls="menu-list">
  Options
</button>
<ul id="menu-list" role="menu" hidden={!isOpen}>
  <li role="menuitem">Edit</li>
  <li role="menuitem">Delete</li>
</ul>
```

**`aria-hidden="true"`** — Removes an element from the accessibility tree entirely. Use for decorative content that adds noise for screen reader users.

```jsx
// Decorative icon next to text label — hide the icon
<button>
  <StarIcon aria-hidden="true" />
  Add to favorites
</button>
```

---

## Live regions

Dynamic content changes — toast notifications, form validation errors, loading states — are not automatically announced by screen readers. Live regions solve this by telling the screen reader to announce content when it changes.

### `aria-live="polite"`

Announces changes at the next convenient pause. Use for non-urgent updates like success messages or status changes.

```jsx
<div aria-live="polite">
  {saveStatus === 'saved' && <p>Changes saved successfully.</p>}
</div>
```

### `aria-live="assertive"`

Interrupts the current announcement to deliver the update immediately. Use sparingly — only for urgent messages like errors or time-sensitive alerts.

```jsx
<div aria-live="assertive" role="alert">
  {error && <p>{error.message}</p>}
</div>
```

### `role="status"`

A shorthand for `aria-live="polite"` with `aria-atomic="true"`. Use for status indicators that update frequently.

```jsx
<div role="status">
  {isLoading ? 'Loading results...' : `${count} results found`}
</div>
```

### Live region rules

1. **The container must exist in the DOM before content changes.** If you dynamically add both the `aria-live` container and its content at the same time, screen readers may miss the announcement.
2. **Keep announcements concise.** Long paragraphs injected into a live region create a poor experience.
3. **Avoid live regions that update too frequently.** Debounce rapid changes (e.g., search-as-you-type result counts) to avoid overwhelming users.

---

## Testing with VoiceOver (macOS)

### Setup

1. Open **System Settings > Accessibility > VoiceOver** or press `Cmd + F5`
2. Use `Ctrl + Option` (VO keys) as the modifier for all VoiceOver commands

### Essential commands

| Action | Shortcut |
|---|---|
| Start / stop VoiceOver | `Cmd + F5` |
| Move to next element | `VO + Right Arrow` |
| Move to previous element | `VO + Left Arrow` |
| Activate an element (click) | `VO + Space` |
| Read current element | `VO + A` |
| Open rotor (navigation menu) | `VO + U` |
| Move by headings | `VO + Cmd + H` |
| Move by form controls | `VO + Cmd + J` |

### What to check

- Navigate the page from top to bottom. Is every piece of meaningful content announced?
- Activate every interactive element. Are buttons and links announced with their correct role and name?
- Open and close overlays (modals, menus, drawers). Does focus move correctly? Is the overlay announced?
- Trigger dynamic changes (form submission, loading states). Are live region announcements present and accurate?
- Use the rotor (`VO + U`) to browse headings, links, and form controls. Does the list accurately represent the page structure?

---

## Testing with NVDA (Windows)

### Setup

1. Download NVDA from [nvaccess.org](https://www.nvaccess.org/download/)
2. The Insert key is the NVDA modifier key

### Essential commands

| Action | Shortcut |
|---|---|
| Start NVDA | `Ctrl + Alt + N` |
| Stop speech | `Ctrl` |
| Move to next element | `Down Arrow` (browse mode) |
| Move to previous element | `Up Arrow` (browse mode) |
| Activate an element | `Enter` |
| Toggle forms mode | `NVDA + Space` |
| Move by headings | `H` / `Shift + H` |
| Move by form controls | `F` / `Shift + F` |
| List all headings | `NVDA + F7` |

### Browse mode vs. focus mode

NVDA has two modes that behave differently:

- **Browse mode** — arrow keys navigate through the page content. Letter shortcuts (`H` for headings, `B` for buttons) jump to specific element types.
- **Focus mode** — arrow keys send keystrokes to the focused control (e.g., typing in a text field, navigating a select menu). NVDA enters focus mode automatically when you focus a form control.

Understanding this distinction is important when testing: if arrow keys are not navigating the page, NVDA may be in focus mode.

---

## Common ARIA patterns in Arch UI

### Modal dialog

```jsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Confirm deletion</h2>
  <p>This action cannot be undone. Are you sure?</p>
  <button onClick={onConfirm}>Delete</button>
  <button onClick={onCancel}>Cancel</button>
</div>
```

Key requirements:
- `role="dialog"` and `aria-modal="true"` tell screen readers this is a modal
- `aria-labelledby` points to the dialog's heading
- Focus is trapped inside the dialog while it is open
- `Escape` closes the dialog and returns focus to the trigger

### Disclosure (accordion)

```jsx
<div>
  <button
    aria-expanded={isOpen}
    aria-controls="section-content"
  >
    Shipping details
  </button>
  <div id="section-content" hidden={!isOpen}>
    <p>Standard shipping takes 5-7 business days.</p>
  </div>
</div>
```

### Tooltip

```jsx
<button aria-describedby="tooltip-save">
  <SaveIcon aria-hidden="true" />
  Save
</button>
<div id="tooltip-save" role="tooltip" hidden={!showTooltip}>
  Save your changes (Ctrl+S)
</div>
```

Tooltips use `aria-describedby` (not `aria-labelledby`) because they provide supplemental information, not the primary label.

---

## Debugging the accessibility tree

### Chrome DevTools

1. Open DevTools (`F12`)
2. Go to the **Elements** panel
3. Select an element and open the **Accessibility** pane in the sidebar
4. Review the computed **Role**, **Name**, **State**, and **Description**

### Firefox Accessibility Inspector

1. Open DevTools (`F12`)
2. Go to the **Accessibility** tab
3. Browse the full accessibility tree or inspect individual elements
4. Use the **Check for issues** dropdown to run automated checks

If the accessibility tree shows the correct role, name, and state for every element, screen readers will announce your component correctly regardless of platform.
