---
sidebar_label: Progress Steps
---

# Progress Steps

A step indicator for multi-step flows such as checkout, onboarding, or form wizards. Progress Steps renders an ordered list with visual states for completed, current, and upcoming steps, connected by lines that fill as the user advances.

---

## Usage

```jsx
import { ProgressSteps } from '@arch-ui/components';

function Example() {
  return (
    <ProgressSteps
      steps={[
        { label: 'Account' },
        { label: 'Payment' },
        { label: 'Review' },
      ]}
      currentStep={1}
    />
  );
}
```

---

## Props

### ProgressStepsProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `ProgressStep[]` | **required** | Ordered array of step descriptors. |
| `currentStep` | `number` | **required** | Zero-based index of the active step. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction. |
| `className` | `string` | `undefined` | Additional CSS class names applied to the root `<ol>` element. |

All standard `ol` HTML attributes are also supported via rest props.

### ProgressStep

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | Visible label for the step. Keep short for horizontal orientation. |
| `description` | `string` | No | Supporting text shown beneath the label. |

---

## Step states

Each step is automatically assigned one of three visual states based on its index relative to `currentStep`:

- **Completed** (index < currentStep) -- filled circle with a checkmark, connected line uses the primary colour.
- **Current** (index === currentStep) -- outlined circle with the step number in the primary colour, marked with `aria-current="step"`.
- **Upcoming** (index > currentStep) -- outlined circle with the step number in a subtle colour.

```jsx
{/* Step 0 is completed, step 1 is current, step 2 is upcoming */}
<ProgressSteps
  steps={[
    { label: 'Details' },
    { label: 'Address' },
    { label: 'Confirm' },
  ]}
  currentStep={1}
/>
```

---

## Orientation

### Horizontal

The default layout. Steps are arranged in a row with equal flex distribution. Best for flows with a small number of short-labelled steps.

```jsx
<ProgressSteps
  steps={[{ label: 'Cart' }, { label: 'Shipping' }, { label: 'Payment' }]}
  currentStep={0}
  orientation="horizontal"
/>
```

### Vertical

Steps are stacked in a column with a connecting line on the inline-start side. Vertical works well for longer flows or when step labels include descriptions.

```jsx
<ProgressSteps
  steps={[
    { label: 'Account setup', description: 'Create your username and password' },
    { label: 'Personal info', description: 'Tell us about yourself' },
    { label: 'Preferences', description: 'Choose your notification settings' },
  ]}
  currentStep={1}
  orientation="vertical"
/>
```

---

## With descriptions

Add a `description` to any step for additional context. Descriptions appear below the label in a smaller, subtle font.

```jsx
<ProgressSteps
  steps={[
    { label: 'Upload', description: 'Select files from your device' },
    { label: 'Configure', description: 'Set processing options' },
    { label: 'Process', description: 'Files are being converted' },
  ]}
  currentStep={2}
/>
```

---

## Guidelines

- Keep step labels concise, especially in horizontal orientation where space is shared equally.
- Use descriptions sparingly. They work best in vertical orientation where there is more room.
- The `currentStep` index is zero-based. To show the first step as active, pass `0`.
- Do not use Progress Steps for navigation between unrelated pages. It is designed for sequential flows.

---

## Accessibility

- The component renders as an `<ol>` (ordered list), preserving the semantic step order for screen readers.
- The current step is marked with `aria-current="step"`.
- Step circles use `aria-hidden="true"` since they are decorative; the step label is the accessible name.
- Completed steps show a checkmark character inside the circle, but the meaningful state is communicated through the list order and `aria-current`.
