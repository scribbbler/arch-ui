---
sidebar_label: Version 8
hide_title: true
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>COMPONENTS</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Version 8</h1>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Breaking changes, new additions, and migration steps from Version 7 to Version 8.
  </p>
</div>

---

## Breaking Changes

### Token namespace update

All design tokens have moved from the `--au-` prefix to `--arch-`. Any custom styles referencing the old prefix must be updated.

```diff
- color: var(--au-color-primary);
+ color: var(--arch-color-primary);
```

### Prop renames for consistency

Several components had props renamed to align with the semantic token naming convention:

| Component | Old Prop | New Prop |
|---|---|---|
| Alert | `type` | `intent` |
| Button | `variant` | `intent` |
| Badge | `color` | `intent` |
| Banner | `kind` | `intent` |

### Modal Sheet removed

The `ModalSheet` component has been removed. Use `Drawer` with `position="bottom"` as a direct replacement.

```diff
- import { ModalSheet } from '@arch-ui/components';
+ import { Drawer } from '@arch-ui/components';

- <ModalSheet isOpen={open} onClose={handleClose}>
+ <Drawer isOpen={open} onClose={handleClose} position="bottom">
    {content}
- </ModalSheet>
+ </Drawer>
```

### Minimum React version

Version 8 requires React 18.0 or later. React 17 is no longer supported.

---

## New Components

The following components were introduced in Version 8:

- **FormControl** — unified wrapper for form fields with label, helper text, and validation.
- **FocusTrap** — utility for constraining keyboard focus within a container.
- **VisuallyHidden** — accessible hidden text utility.
- **SkipNav** — skip navigation link for keyboard accessibility.
- **ProgressSteps** — multi-step progress indicator for wizard flows.

---

## Migration Steps

Follow these steps to upgrade from Version 7 to Version 8:

1. **Update dependencies.** Install the latest Version 8 packages:
   ```bash
   pnpm add @arch-ui/tokens@latest @arch-ui/components@latest
   ```

2. **Find and replace token prefixes.** Search your codebase for `--au-` and replace with `--arch-`. This applies to CSS files, styled-components, and any inline token references.

3. **Update renamed props.** Search for the old prop names listed above and update them. Your TypeScript compiler will flag most of these as type errors after the upgrade.

4. **Replace Modal Sheet.** If you use `ModalSheet`, switch to `Drawer` with `position="bottom"`. The API is otherwise identical.

5. **Verify React version.** Confirm your project uses React 18.0 or later. If you are on React 17, upgrade React first.

6. **Run your test suite.** After making the above changes, run your full test suite to catch any remaining issues:
   ```bash
   pnpm test
   ```

7. **Visual regression check.** The token prefix change should not affect rendered output, but run a visual diff if your project has visual regression tests configured.

---

## Need Help?

If you encounter issues during migration that are not covered here, check the [Changelog](./changelog.md) for a detailed list of all changes in each release, or open an issue in the repository.
