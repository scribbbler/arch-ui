---
sidebar_label: Modal full screen
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTAINERS AND LAYOUT</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Modal full screen</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A full-viewport modal variant designed for immersive tasks that require the user's complete attention.
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

Full-screen dialog, takeover

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

Use the standard Modal component with `size="full"` to achieve full-screen behaviour.

```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@arch-ui/components';
import { Button } from '@arch-ui/components';

function MediaViewer({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalHeader onClose={onClose}>Photo gallery</ModalHeader>
      <ModalBody>
        <img src="/photo.jpg" alt="Landscape photograph" />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
```

---

## When to use

- **Multi-step flows** -- wizards or onboarding sequences that benefit from a distraction-free environment.
- **Media viewing** -- image galleries, video players, or document previews where content should fill the viewport.
- **Complex editors** -- rich text editors, code editors, or form builders that need maximum workspace.
- **Mobile contexts** -- on small screens, full-screen modals often provide a better experience than constrained dialogs.

---

## When not to use

- Simple confirmations or alerts. Use a standard `size="sm"` or `size="md"` Modal instead.
- Inline information that does not require focus takeover. Consider Drawer or Popover.

---

## Anatomy

Modal Full Screen uses the same sub-components as Modal:

- **ModalHeader** -- a persistent top bar with the title and close button. Stays fixed at the top of the viewport.
- **ModalBody** -- scrollable content area that fills the remaining vertical space.
- **ModalFooter** -- optional action bar pinned to the bottom.

---

## Navigation pattern

Because the full-screen modal replaces the visible UI, always provide a clear exit path:

1. A close button in ModalHeader (pass `onClose` to ModalHeader).
2. Escape key dismissal (enabled by default on Modal).
3. Optionally, a "Back" or "Cancel" button in the footer.

---

## Accessibility

- Inherits all Modal accessibility features: `role="dialog"`, `aria-modal="true"`, focus trapping, scroll lock, and Escape key handling.
- Provide a descriptive title in ModalHeader so assistive technology can announce the modal purpose.
- Consider disabling `closeOnOverlayClick` since there is no visible backdrop in a full-screen layout.

</TabItem>
</Tabs>
