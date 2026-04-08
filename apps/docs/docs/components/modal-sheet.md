---
sidebar_label: Modal sheet
---

# Modal Sheet [Deprecated]

:::caution Deprecated
Modal Sheet is deprecated. Use [Sheet](/docs/components/sheet) for bottom or side panel overlays, or [Modal](/docs/components/modal) for centred dialogs. Modal Sheet will be removed in a future major release.
:::

Modal Sheet was a mobile-first overlay pattern that combined the behaviour of a modal dialog with a bottom sheet presentation -- sliding up from the bottom edge of the screen. It was primarily used on touch devices to present actions, confirmations, or short forms in a thumb-friendly position.

## Migration guide

### Replace with Sheet

If your Modal Sheet was used as a bottom panel for filters, actions, or selections, replace it with Sheet:

```jsx
// Before (deprecated)
<ModalSheet isOpen={isOpen} onClose={onClose}>
  <p>Select an option</p>
</ModalSheet>

// After
<Drawer isOpen={isOpen} onClose={onClose} position="bottom" size="auto">
  <p>Select an option</p>
</Drawer>
```

### Replace with Modal

If your Modal Sheet was used as a centred confirmation or form dialog, replace it with Modal using an appropriate size:

```jsx
// Before (deprecated)
<ModalSheet isOpen={isOpen} onClose={onClose}>
  <p>Are you sure?</p>
</ModalSheet>

// After
<Modal isOpen={isOpen} onClose={onClose} size="sm">
  <ModalHeader onClose={onClose}>Confirm</ModalHeader>
  <ModalBody><p>Are you sure?</p></ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>Cancel</Button>
    <Button kind="primary" onClick={handleConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

## Original behaviour

For reference, Modal Sheet provided:

- A bottom-anchored panel that slid up from the viewport edge.
- A backdrop overlay that dismissed the sheet on tap.
- Scroll lock and focus trapping while open.
- A drag handle at the top for swipe-to-dismiss gestures on touch devices.
- Snap points that controlled how far the sheet could expand.

All of these capabilities are now available through Sheet (for panel overlays) or Modal (for dialog semantics).
