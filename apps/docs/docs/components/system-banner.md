---
sidebar_label: System banner
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>MESSAGING</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>System banner</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A persistent, full-width banner anchored to the top of the viewport for system-level announcements.
  </p>
</div>

<Tabs>
<TabItem value="usage" label="Usage" default>

<div style={{background: '#F3F3F3', borderRadius: '12px', padding: '32px', margin: '24px 0', display: 'flex', justifyContent: 'center'}}>
  <div style={{background: '#282828', borderRadius: '12px', padding: '40px', maxWidth: '600px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px', color: '#fff', fontSize: '14px', opacity: 0.5}}>
    Preview coming soon
  </div>
</div>

**Common alternative names**

Global banner, App-wide notice, Maintenance banner

---

Usage guidelines coming soon.

</TabItem>
<TabItem value="specs" label="Specs">

Specs coming soon.

</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

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

---

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

---

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

</TabItem>
</Tabs>
