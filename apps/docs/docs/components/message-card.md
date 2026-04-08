---
sidebar_label: Message card
---

# Message Card

A compact card that displays a message preview, typically used in messaging or notification list interfaces. Message cards show a sender, a snippet of content, and metadata like timestamps or read status.

**Common alternative names:** Chat preview, Conversation card, Inbox item

---

## Usage

```jsx
import { MessageCard } from '@arch-ui/components';

<MessageCard
  sender="Jane Doe"
  avatar={<Avatar name="Jane Doe" size="small" />}
  message="Hey, are you available for a quick sync this afternoon?"
  timestamp="2m ago"
  onClick={() => navigate('/messages/123')}
/>
```

### Unread state

```jsx
<MessageCard
  sender="Alex Kim"
  message="The design review is scheduled for tomorrow."
  timestamp="1h ago"
  unread
/>
```

### With action menu

```jsx
<MessageCard
  sender="Sam Lee"
  message="Uploaded the final assets to the shared folder."
  timestamp="Yesterday"
  endEnhancer={<IconButton icon={<MoreIcon />} aria-label="Message options" />}
/>
```

---

## Expected props

| Prop | Type | Default | Description |
|---|---|---|---|
| `sender` | `string` | **required** | Name of the message sender. |
| `avatar` | `ReactNode` | -- | Avatar or icon for the sender. |
| `message` | `string` | **required** | Message preview text. Typically truncated to one or two lines. |
| `timestamp` | `string` | -- | Relative or absolute time label. |
| `unread` | `boolean` | `false` | Whether the message is unread. Applies bold styling and an unread indicator. |
| `onClick` | `() => void` | -- | Click handler. Makes the card interactive. |
| `endEnhancer` | `ReactNode` | -- | Content rendered at the trailing edge (e.g. action menu). |
| `className` | `string` | -- | Additional CSS class names. |

---

## Accessibility

- Interactive cards should use `role="button"` or be wrapped in an anchor for navigation.
- The unread state should be conveyed to screen readers, e.g. via `aria-label` that includes "unread" or a visually hidden status text.
- The timestamp should use a `<time>` element with a `datetime` attribute for machine-readable dates.
- Ensure sufficient colour contrast between read and unread states.
