---
sidebar_label: Avatar
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTENT DISPLAY</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Avatar</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Displays a user's profile image with a graceful initials fallback when no image is available.
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

Profile image, User icon, Thumbnail

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
import { Avatar } from '@arch-ui/components';

// With an image
<Avatar src="/images/jane.jpg" name="Jane Doe" />

// Initials fallback (no src)
<Avatar name="John Smith" />
```

### Sizes

Six sizes are available, from compact UI elements to large profile displays.

```jsx
<Avatar name="AB" size="xsmall" />   {/* 24px */}
<Avatar name="AB" size="small" />    {/* 36px */}
<Avatar name="AB" size="medium" />   {/* 48px -- default */}
<Avatar name="AB" size="large" />    {/* 64px */}
<Avatar name="AB" size="xlarge" />   {/* 80px */}
<Avatar name="AB" size="xxlarge" />  {/* 112px */}
```

### Shapes

```jsx
<Avatar name="Jane Doe" shape="circle" />  {/* default */}
<Avatar name="Jane Doe" shape="square" />
```

### Image error fallback

When the `src` image fails to load, the component automatically falls back to displaying the user's initials. No extra handling is needed.

```jsx
<Avatar src="/broken-link.jpg" name="Jane Doe" />
{/* Renders "JD" initials */}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | -- | URL of the avatar image. Falls back to initials when absent or on error. |
| `name` | `string` | **required** | Full name. Drives alt text and initials. |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge' \| 'xxlarge'` | `'medium'` | Rendered size. |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape of the avatar. |
| `className` | `string` | -- | Additional CSS class names. |

---

## Accessibility

- When an image is displayed, the `<img>` element carries `alt={name}`.
- When initials are shown instead, the root `<span>` gets `role="img"` and `aria-label={name}` so screen readers announce the person's name.
- The initials text is marked `aria-hidden="true"` since the label already conveys the information.

</TabItem>
</Tabs>
