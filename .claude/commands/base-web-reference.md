# Uber Base Reference

When building any Arch component, use both Uber Base sources as reference:

## Source 1 — Uber Base Design System (base.uber.com)
The design documentation. Check this for:
- Visual design decisions and rationale
- Component anatomy and structure
- Do/don't usage guidelines
- Spacing and sizing specifications
- Motion and interaction patterns
- Accessibility guidelines per component

## Source 2 — Base Web React (baseweb.design)
The React implementation. Check this for:
- Prop names and types
- Variant names and values
- State handling (disabled, error, loading, indeterminate etc.)
- Keyboard interactions and shortcuts
- ARIA roles and attributes
- Stateful vs stateless component patterns

## Process for each component
1. Visit base.uber.com/[component] for design intent and anatomy
2. Visit baseweb.design/components/[component] for props and behaviour
3. Reconcile both — design doc sets the intent, code sets the API
4. Implement in Arch using:
   - Arch naming conventions (Alert not Notification, Toggle not Switch)
   - CSS custom properties and tokens only — never Styletron
   - Token + className approach for all styling
   - No overrides prop pattern

## What to take from both sources
- Prop names and defaults (Base Web)
- Variant and state names (Base Web)
- Keyboard navigation (Base Web)
- ARIA attributes and roles (Base Web)
- Component anatomy and structure (Uber Base design)
- Usage rules and do/don't guidance (Uber Base design)
- Spacing and sizing intent (Uber Base design)

## What NOT to copy
- Styletron or any CSS-in-JS
- The overrides prop pattern
- Uber brand colours or visual identity
- StatefulX naming conventions
