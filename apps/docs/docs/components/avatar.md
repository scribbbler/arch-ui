---
sidebar_label: Avatar
---

# Avatar

Displays a user's profile image with a graceful initials fallback. Always provide `name` -- it powers the alt text and the initials that appear when no image is available or the image fails to load.

**Common alternative names:** Profile picture, User icon, Thumbnail

---

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
