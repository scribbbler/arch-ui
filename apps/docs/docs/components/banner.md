---
sidebar_label: Banner
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>MESSAGING</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Banner</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A full-width announcement bar for site-wide or page-level status messages.
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

Notice, Announcement bar, Info bar

---

Usage guidelines coming soon.

</TabItem>
<TabItem value="specs" label="Specs">

Specs coming soon.

</TabItem>
<TabItem value="content" label="Content">

Content guidelines coming soon.

</TabItem>
<TabItem value="changelog" label="Status & Changelog">

Status & changelog coming soon.

</TabItem>
<TabItem value="code" label="Code">

## Usage

```jsx
import { Banner } from '@arch-ui/components';

<Banner variant="info">
  New feature available -- check out the updated dashboard.
</Banner>
```

### Variants

```jsx
<Banner variant="info">Informational message.</Banner>
<Banner variant="success">Operation completed successfully.</Banner>
<Banner variant="warning">Scheduled maintenance on Saturday 10 pm - 2 am UTC.</Banner>
<Banner variant="danger">Service disruption in progress. We are investigating.</Banner>
```

### With action button

Add an inline action alongside the message.

```jsx
<Banner
  variant="info"
  actionText="Learn more"
  onAction={() => navigate('/changelog')}
>
  Version 2.0 is now available.
</Banner>
```

### Dismissible banner

```jsx
const [visible, setVisible] = useState(true);

{visible && (
  <Banner variant="warning" onClose={() => setVisible(false)}>
    Your session will expire in 5 minutes.
  </Banner>
)}
```

### Action and dismiss together

```jsx
<Banner
  variant="info"
  actionText="Update now"
  onAction={handleUpdate}
  onClose={() => setVisible(false)}
>
  A new version is available.
</Banner>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Semantic variant controlling colour. |
| `children` | `ReactNode` | -- | Banner content. Keep brief -- one or two sentences. |
| `actionText` | `string` | -- | Text for an inline action button. |
| `onAction` | `() => void` | -- | Callback fired when the action button is clicked. |
| `onClose` | `() => void` | -- | When provided, a dismiss button is rendered. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Accessibility

- Uses `role="alert"` for `danger` and `warning` variants and `role="status"` for `info` and `success`.
- The dismiss button carries `aria-label="Dismiss banner"`.
- Both the action and dismiss buttons have `:focus-visible` outlines for keyboard navigation.
- Banner content is centered with the close button absolutely positioned at the inline end, so content flow is not disrupted.

</TabItem>
</Tabs>
