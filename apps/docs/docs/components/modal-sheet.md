---
sidebar_label: Modal sheet
hide_title: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CONTAINERS AND LAYOUT</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Modal sheet</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    A mobile-first overlay that combined modal dialog behaviour with a bottom sheet presentation.
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

Bottom sheet modal, action sheet

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

:::caution Deprecated
Modal Sheet is deprecated. Use [Sheet](/components/sheet) for bottom or side panel overlays, or [Modal](/components/modal) for centred dialogs. Modal Sheet will be removed in a future major release.
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

</TabItem>
</Tabs>
