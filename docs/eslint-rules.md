# ESLint Rules for the Design System

Standard ESLint handles general code quality. The design system needs additional rules that enforce its specific constraints. These are not style preferences — they protect the integrity of the token system.

---

## Rules to Implement

Create a local ESLint plugin at `packages/eslint-plugin-arch/` with these rules. The plugin is added to the root ESLint config and applies to all packages.

---

### Rule 1: `ds/no-hardcoded-values`

**What it catches:** Any CSS property value in a `.css` file that is a hardcoded colour, pixel dimension, or opacity — instead of a `var(--token-name)`.

**Applies to:** All `.css` files in `packages/components/`

**Errors on:**
```css
/* Wrong */
background-color: #0052cc;
padding: 16px;
border-radius: 4px;
color: rgb(255, 255, 255);
opacity: 0.5;
font-size: 14px;
```

**Passes on:**
```css
/* Correct */
background-color: var(--color-action-primary);
padding: var(--spacing-component-padding-md);
border-radius: var(--radius-button);
```

**Exception:** `0` (zero) and `100%` are allowed without a token. Transitions and transforms that use `translate`, `scale`, or `rotate` with geometric values are allowed.

---

### Rule 2: `ds/no-unknown-token`

**What it catches:** A `var(--token-name)` reference in a `.css` file where `token-name` does not exist in `packages/tokens/build/json/tokens.json`.

**Applies to:** All `.css` files in `packages/components/`

**Why this matters:** Without this rule, a typo in a token name silently produces no visual output. The component renders but looks wrong, and it is very hard to trace.

**Implementation note:** The rule reads the token JSON at lint time. The token build must run before linting. Add `pnpm tokens:build` as a prerequisite to the lint script.

---

### Rule 3: `ds/manifest-required`

**What it catches:** A component folder in `packages/components/src/` that does not have a matching `[ComponentName].manifest.json` file.

**Applies to:** `packages/components/src/*/index.ts`

**Error message:** "Component [Name] is missing a manifest file. Create [Name].manifest.json before exporting."

---

### Rule 4: `ds/no-direct-component-import`

**What it catches:** Any import from inside another component's folder — bypassing the barrel export.

**Applies to:** All files in `packages/components/src/`

**Errors on:**
```typescript
// Wrong — importing directly from folder
import { buttonStyles } from '../Button/Button.css'
import { ButtonProps } from '../Button/Button'
```

**Passes on:**
```typescript
// Correct — importing from barrel
import { Button } from '../index'
```

---

### Rule 5: `ds/no-inline-style`

**What it catches:** The `style` prop used on any JSX element in component files.

**Applies to:** All `.tsx` files in `packages/components/src/`

**Errors on:**
```tsx
<button style={{ backgroundColor: '#0052cc' }}>...</button>
<div style={{ padding: 16 }}>...</div>
```

**Exception:** The `style` prop is allowed when it is passed through as a prop from the component's own interface (i.e. the component accepts and forwards a `style` prop from the consumer). The rule should allow `style={style}` where `style` is a prop variable, not an object literal.

---

## ESLint Config Integration

Root `.eslintrc.js`:

```js
module.exports = {
  plugins: ['@ds'],
  overrides: [
    {
      files: ['packages/components/src/**/*.css'],
      rules: {
        '@arch/no-hardcoded-values': 'error',
        '@arch/no-unknown-token': 'error',
      },
    },
    {
      files: ['packages/components/src/**/*.tsx'],
      rules: {
        '@arch/no-inline-style': 'error',
        '@arch/no-direct-component-import': 'error',
      },
    },
    {
      files: ['packages/components/src/*/index.ts'],
      rules: {
        '@arch/manifest-required': 'error',
      },
    },
  ],
}
```

---

## CI Enforcement

Lint runs in CI before tests. A lint failure blocks the PR. There are no warnings — everything is an error. Warnings accumulate and get ignored.

Claude Code: if a lint rule fires, fix the root cause. Do not add `eslint-disable` comments unless there is a documented exception in this file. Adding an undocumented disable comment is a policy violation.
