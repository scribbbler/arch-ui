---
sidebar_label: File upload
---

# File Upload

A drop zone for selecting files via drag-and-drop or the native file dialog. Validates file size, displays error and progress states, and announces status changes to assistive technology.

**Status:** Stable

**Common alternative names:** Dropzone, file picker, upload area

---

## Usage

FileUpload renders a styled label wrapping a hidden file input. Clicking the zone opens the native file dialog. Files can also be dragged onto the zone.

```jsx
import { FileUpload } from '@arch-ui/components';

<FileUpload
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}
  onDrop={(files) => handleUpload(files)}
>
  <p>Drag and drop images here or <strong>browse</strong></p>
  <p>PNG, JPG up to 5 MB</p>
</FileUpload>
```

### Single file

```jsx
<FileUpload
  accept=".pdf"
  onDrop={(files) => handleUpload(files[0])}
>
  <p>Drop a PDF here</p>
</FileUpload>
```

### With progress message

Display upload progress inside the drop zone using the `progressMessage` prop.

```jsx
<FileUpload
  onDrop={handleUpload}
  progressMessage="Uploading 3 of 5 files..."
>
  <p>Drop files here</p>
</FileUpload>
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `accept` | `string` | `undefined` | Comma-separated MIME types or extensions passed to the hidden input's `accept` attribute. |
| `multiple` | `boolean` | `false` | Allows selecting multiple files at once. |
| `maxSize` | `number` | `undefined` | Maximum file size in bytes. Files exceeding this trigger the error state. |
| `disabled` | `boolean` | `false` | Disables the drop zone and prevents file selection. |
| `onDrop` | `(files: File[]) => void` | `undefined` | Called when files are selected and pass validation. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root wrapper. |
| `labels` | `Partial<FileUploadLabels>` | `undefined` | Override default labels for internationalisation. |
| `progressMessage` | `string` | `undefined` | Text displayed for upload progress, announced via `role="status"`. |
| `children` | `ReactNode` | `undefined` | Content rendered inside the drop zone (instructions, icon, etc.). |

---

## States

| State | Trigger | Visual change |
|---|---|---|
| Default | No interaction | Dashed border, subtle background |
| Hover | Mouse over zone | Stronger border, muted background |
| Drag over | File dragged onto zone | Solid border with focus colour, muted background |
| Error | File exceeds `maxSize` | Danger border and background, error text announced via `role="alert"` |
| Disabled | `disabled` prop | Muted colours, `cursor: not-allowed`, reduced opacity |

---

## Accessibility

- The hidden file input receives focus via keyboard and announces to screen readers.
- Focus-visible is relayed from the hidden input to the visual drop zone.
- Error messages use `role="alert"` with `aria-live="polite"` for screen reader announcement.
- Progress messages use `role="status"` with `aria-live="polite"`.
- The component is `forwardRef` compatible for imperative access to the file input.

---

## Best practices

**Do:**
- Always specify `accept` to guide users toward valid file types.
- Set `maxSize` and provide clear guidance on file limits within the `children` content.
- Use `multiple` when batch uploads are supported.

**Don't:**
- Do not rely solely on the error state for validation feedback -- also show inline messages.
- Do not use FileUpload for single-click file attachments -- use a button with a hidden input instead.

---

## Design tokens

| Token | Role |
|---|---|
| `color-background-subtle` | Default zone background |
| `color-border-default` | Default dashed border |
| `color-border-focus` | Drag-over border and focus outline |
| `color-border-danger` | Error state border |
| `color-feedback-danger-bg` | Error state background |
| `color-text-danger` | Error message text |
| `color-text-subtle` | Default zone text colour |
| `spacing-component-sm` | Gap inside the drop zone |
| `radius-component-md` | Zone corner radius |
