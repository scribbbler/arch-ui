---
sidebar_label: Alert
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>MESSAGING</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Alert</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    An inline feedback message for communicating status or important context within a page.
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

Notification, Inline message, Callout

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

</TabItem>
</Tabs>
