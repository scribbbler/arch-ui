---
sidebar_label: Dialog
---

# Dialog

A modal overlay that asks the user to confirm or cancel a focused action. Dialogs interrupt the workflow intentionally and should be used sparingly -- only when the action is destructive, irreversible, or requires explicit acknowledgement.

**Common alternative names:** Confirmation dialog, Alert dialog, Confirm modal

---

## Usage

```jsx
import { Dialog } from '@arch-ui/components';

<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete account?"
  description="This action is permanent and cannot be undone."
  confirmLabel="Delete"
  onConfirm={handleDelete}
/>
```

### Danger confirmation

For destructive actions, use the `danger` variant to visually reinforce the severity.

```jsx
<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  variant="danger"
  title="Remove team member?"
  description="They will lose access to all shared projects immediately."
  confirmLabel="Remove"
  cancelLabel="Keep"
  onConfirm={handleRemove}
/>
```

### Information dialog

For non-destructive confirmations or acknowledgements.

```jsx
<Dialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Terms updated"
  description="We have updated our terms of service. Please review the changes."
  confirmLabel="I understand"
  onConfirm={() => setIsOpen(false)}
/>
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | `false` | Whether the dialog is visible. |
| `onClose` | `() => void` | **required** | Called when the dialog is dismissed (overlay click, Escape key, or cancel). |
| `title` | `string` | **required** | Dialog heading. |
| `description` | `ReactNode` | -- | Supporting body text. |
| `variant` | `'default' \| 'danger'` | `'default'` | Visual treatment. `'danger'` highlights the confirm button as destructive. |
| `confirmLabel` | `string` | `'Confirm'` | Label for the primary action button. |
| `cancelLabel` | `string` | `'Cancel'` | Label for the secondary (cancel) button. |
| `onConfirm` | `() => void` | -- | Called when the user clicks the confirm button. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Keyboard interaction

| Key | Behaviour |
|---|---|
| Escape | Closes the dialog (triggers `onClose`). |
| Tab | Cycles focus within the dialog. Focus is trapped while open. |

---

## Accessibility

- Uses the native `<dialog>` element or `role="alertdialog"` with `aria-modal="true"`.
- Focus is moved into the dialog on open and trapped until closed.
- On close, focus returns to the element that triggered the dialog.
- The title is linked via `aria-labelledby` and the description via `aria-describedby`.
- For destructive actions, the cancel button should receive initial focus rather than the confirm button, reducing accidental confirmations.
