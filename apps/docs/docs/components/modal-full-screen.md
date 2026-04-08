---
sidebar_label: Modal full screen
---

# Modal Full Screen

A full-viewport modal variant designed for immersive tasks that require the user's complete attention, such as multi-step forms, media viewers, or complex editors. Modal Full Screen occupies the entire screen, removing all surrounding UI distractions.

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

## When to use

- **Multi-step flows** -- wizards or onboarding sequences that benefit from a distraction-free environment.
- **Media viewing** -- image galleries, video players, or document previews where content should fill the viewport.
- **Complex editors** -- rich text editors, code editors, or form builders that need maximum workspace.
- **Mobile contexts** -- on small screens, full-screen modals often provide a better experience than constrained dialogs.

## When not to use

- Simple confirmations or alerts. Use a standard `size="sm"` or `size="md"` Modal instead.
- Inline information that does not require focus takeover. Consider Drawer or Popover.

## Anatomy

Modal Full Screen uses the same sub-components as Modal:

- **ModalHeader** -- a persistent top bar with the title and close button. Stays fixed at the top of the viewport.
- **ModalBody** -- scrollable content area that fills the remaining vertical space.
- **ModalFooter** -- optional action bar pinned to the bottom.

## Navigation pattern

Because the full-screen modal replaces the visible UI, always provide a clear exit path:

1. A close button in ModalHeader (pass `onClose` to ModalHeader).
2. Escape key dismissal (enabled by default on Modal).
3. Optionally, a "Back" or "Cancel" button in the footer.

## Accessibility

- Inherits all Modal accessibility features: `role="dialog"`, `aria-modal="true"`, focus trapping, scroll lock, and Escape key handling.
- Provide a descriptive title in ModalHeader so assistive technology can announce the modal purpose.
- Consider disabling `closeOnOverlayClick` since there is no visible backdrop in a full-screen layout.
