---
sidebar_label: Installation
hide_title: true
sidebar_position: 1
---

<div style={{marginBottom: '2rem'}}>
  <span style={{fontSize: '14px', color: '#727272', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Getting started</span>
  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px'}}>
    <h1 style={{margin: 0}}>Installation</h1>
    <span style={{padding: '2px 10px', border: '1px solid #282828', borderRadius: '4px', fontSize: '13px', fontWeight: 500}}>Draft</span>
  </div>
  <p style={{fontSize: '18px', color: '#5E5E5E', marginTop: '12px', maxWidth: '600px'}}>
    Get Arch UI set up in your project in under five minutes.
  </p>
</div>

## 1. Install packages

```bash
pnpm add @arch-ui/components @arch-ui/tokens
```

## 2. Import tokens

```tsx
import '@arch-ui/tokens/css';
```

## 3. Load Inter font

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## 4. Use a component

```tsx
import { Button } from '@arch-ui/components';

function App() {
  return (
    <Button kind="primary" onClick={() => alert('It works!')}>
      Get started
    </Button>
  );
}
```

## 5. Optional: icons

```bash
pnpm add @arch-ui/icons
```

```tsx
import { CheckIcon } from '@arch-ui/icons';

<Button kind="primary" startEnhancer={<CheckIcon />}>Confirm</Button>
```

## Packages

| Package | Contents |
|---------|----------|
| `@arch-ui/tokens` | 400+ CSS custom properties |
| `@arch-ui/components` | 58 React components |
| `@arch-ui/icons` | 43 Material Design Icons |
| `@arch-ui/mcp-server` | MCP server for AI agents |
