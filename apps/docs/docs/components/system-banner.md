---
sidebar_label: System banner
---

# System Banner

A persistent, full-width banner anchored to the very top of the viewport for system-level announcements such as maintenance windows, outages, or mandatory updates. Unlike a regular Banner, System Banner sits above all other content including navigation and cannot be scrolled away.

**Common alternative names:** Global banner, Critical alert bar, Site-wide notice

---

## Usage

```jsx
import { SystemBanner } from '@arch-ui/components';

<SystemBanner variant="warning">
  Scheduled maintenance tonight from 10 pm to 2 am UTC.
</SystemBanner>
```

### Variants

```jsx
<SystemBanner variant="info">A new version is available.</SystemBanner>
<SystemBanner variant="warning">Service degradation detected in EU region.</SystemBanner>
<SystemBanner variant="danger">Critical outage in progress. Our team is investigating.</SystemBanner>
```

### With action

```jsx
<SystemBanner
  variant="danger"
  actionText="View status page"
  onAction={() => window.open('/status', '_blank')}
>
  Multiple services are experiencing issues.
</SystemBanner>
```

### Dismissible

System banners are non-dismissible by default. Only allow dismissal for informational messages, never for active incidents.

```jsx
<SystemBanner variant="info" onClose={() => setVisible(false)}>
  We have updated our privacy policy.
</SystemBanner>
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'warning' \| 'danger'` | `'info'` | Severity level controlling colour. |
| `children` | `ReactNode` | **required** | Banner message. Keep to one sentence. |
| `actionText` | `string` | -- | Label for an optional action link or button. |
| `onAction` | `() => void` | -- | Callback when the action is clicked. |
| `onClose` | `() => void` | -- | When provided, renders a dismiss button. |
| `className` | `string` | -- | Additional CSS class names. |

---

## System Banner vs Banner

| | System Banner | Banner |
|---|---|---|
| Scope | System-wide, above all content | Page or section level |
| Position | Fixed to viewport top | Inline in document flow |
| Dismissibility | Non-dismissible by default | Dismissible by default |
| Variants | info, warning, danger (no success) | info, success, warning, danger |

---

## Accessibility

- Uses `role="alert"` for `danger` and `warning` variants to trigger an assertive screen reader announcement.
- The banner must remain visible and not be obscured by other fixed or sticky elements.
- If an action link is present, it must be keyboard focusable and clearly describe its destination.
- Colour alone should not convey severity -- the text content must make the severity clear.
