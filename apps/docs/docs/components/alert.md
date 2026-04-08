---
sidebar_label: Alert
---

# Alert

An inline feedback message for communicating status or important context within a page. Alerts persist until the user dismisses them or the triggering condition resolves. Use them for form validation summaries, action confirmations, or contextual warnings.

**Common alternative names:** Notification, Inline message, Callout

---

## Usage

```jsx
import { Alert } from '@arch-ui/components';

<Alert
  variant="success"
  title="Saved"
  description="Your changes have been saved."
/>
```

### Variants

Four semantic variants control the colour and default icon.

```jsx
<Alert variant="info" title="Info" description="Your trial ends in 7 days." />
<Alert variant="success" title="Success" description="Payment received." />
<Alert variant="warning" title="Warning" description="Storage is almost full." />
<Alert variant="danger" title="Error" description="Unable to save changes." />
```

### Dismissible alert

Provide `onClose` to render a close button.

```jsx
const [visible, setVisible] = useState(true);

{visible && (
  <Alert
    variant="info"
    title="Tip"
    description="You can customise your dashboard."
    onClose={() => setVisible(false)}
  />
)}
```

### Custom icon

Override the default variant icon, or pass `null` to remove it entirely.

```jsx
<Alert variant="info" icon={<CustomIcon />} title="Custom" description="With a custom icon." />
<Alert variant="info" icon={null} title="No icon" description="Icon suppressed." />
```

### Internationalisation

Override the dismiss button label for non-English locales.

```jsx
<Alert
  variant="info"
  title="Info"
  description="Localised alert."
  onClose={handleClose}
  labels={{ dismiss: 'Fermer' }}
/>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Semantic variant controlling colour and default icon. |
| `title` | `string` | -- | Bold heading text. |
| `description` | `ReactNode` | -- | Body content. |
| `onClose` | `() => void` | -- | Callback to dismiss. Renders a close button when provided. |
| `closeable` | `boolean` | `true` | Set to `false` to hide the close button even when `onClose` is provided. |
| `icon` | `ReactNode` | variant default | Override the default icon. Pass `null` to suppress it. |
| `labels` | `Partial<AlertLabels>` | -- | Override default labels (e.g. `{ dismiss: 'Close' }`). |
| `className` | `string` | -- | Additional CSS class names. |

---

## Accessibility

- Uses `role="alert"` for `danger` and `warning` variants (assertive announcement) and `role="status"` for `info` and `success` (polite announcement).
- The close button carries an `aria-label` (default: "Dismiss") so screen readers announce its purpose.
- Icons are marked `aria-hidden="true"` since the variant role already communicates severity.
- Focus-visible styling is applied to the close button for keyboard users.
