# Foundations documentation discrepancies

Tracking list of places where the docs at `apps/docs/docs/foundations/` claim
something that doesn't match the actual tokens in `packages/tokens/src/` or the
Storybook stories. Pick these up when we do the next foundations pass.

---

## Typography

### 1. Fonts section claims three typefaces that don't exist

- **Docs says (`typography.md` Usage → Fonts):**
  > The default font family that Arch UI uses is **Inter**. It comes with three distinct typefaces: **Display**, **Text**, and **Mono**.

  Three preview cards are shown labelled **Inter Display**, **Inter Text**, **Inter Mono**.

- **Reality (`packages/tokens/src/primitive/typography.json`):**
  Only two sans families exist:
  - `--typography-family-sans` → Inter (one family, not split into Display/Text)
  - `--typography-family-mono` → system mono stack
  - `--typography-family-serif` → Georgia (exists but isn't shown on this page)

- **Fix options:**
  - Drop the Display/Text split and show one **Inter** preview + one **Mono** preview (+ optionally Serif).
  - OR introduce real `Inter Display` / `Inter Text` sub-families in tokens if we want that distinction.

### 2. "Inter Mono" label is wrong

- **Docs uses "Inter Mono"** in:
  - Fonts section preview card
  - `#### Inter Mono` subheading
  - Increasing legibility Do description: *"Use Inter Mono for codes…"*
  - Mono Do/Don't descriptions: *"Use Inter Mono only when displaying a number…"*, *"Use the regular Inter font when the value is part of a string"*
  - Mono comparison column label
- **Reality:**
  `--typography-family-mono` = `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`.
  This is the system monospace stack, not "Inter Mono". There is no Inter Mono font in this project.
- **Fix:** Replace "Inter Mono" with "Mono" or "the mono stack" everywhere on the page.

### 3. Line-height "multiply by 1.45" rule is false

- **Docs says (`typography.md` Scale → Line height):**
  > Proper line height is achieved by multiplying the type size by 1.45 and rounding to the nearest interval of 4. This ensures all type aligns with our 4 baseline grid.
- **Reality (`packages/tokens/src/semantic/typography.json`):**
  Actual ratios vary from ~1.17 to ~1.56, decreasing as size grows:

  | Font size | Line height | Ratio |
  |---|---|---|
  | 18 | 28 | 1.56 |
  | 16 | 24 | 1.50 |
  | 14 | 20 | 1.43 |
  | 20 | 28 | 1.40 |
  | 24 | 32 | 1.33 |
  | 40 | 52 | 1.30 |
  | 28 | 36 | 1.29 |
  | 32 | 40 | 1.25 |
  | 52 | 64 | 1.23 |
  | 36 | 44 | 1.22 |
  | 44 | 52 | 1.18 |
  | 96 | 112 | 1.17 |

- **Fix:** Replace the 1.45 sentence with something like:
  > Line-heights use fixed pixel values aligned to a 4-px baseline grid. Larger sizes use tighter ratios (~1.17 on Display Large) and smaller sizes use looser ratios (~1.56 on Paragraph Large) for legibility.

### 4. Modular scale "base 14 × 1.125 at each interval" is approximate, not strict

- **Docs says (`typography.md` Scale → Modular scale):**
  > Arch UI leverages a modular scale to define a set of harmonious and hierarchical type sizes. It starts with a base font size of 14 and scales by multiplying 1.125 at each interval. We've chosen a key set of sizes from this scale that work well across interfaces.
- **Reality (`packages/tokens/src/primitive/typography.json`):**
  The actual size scale is `12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 52, 96`.
  - 14 × 1.125 = 15.75 ≈ 16 ✓
  - 16 × 1.125 = 18 ✓
  - 20, 24, 28, 32, 36, 40, 44, 52, 96 do **not** follow 1.125.
- **Fix:** Soften to:
  > Our base font size is 14. The scale begins with a 1.125 ratio (14 → 16 → 18) and then shifts to a 4-px grid at larger sizes for rhythm with spacing and layout tokens.

### 5. Spacing formula is printed backwards

- **Docs says (`typography.md` Spacing):**
  ```
  Spacing = (Fontsize - lineheight) rounded to nearest 4
  ```
- **Actual math:** it's `line-height − font-size`, not the other way around (otherwise it would produce negative numbers).
- **Fix:** Flip to:
  ```
  Spacing = (line-height − font-size) rounded to nearest 4
  ```

---

## Tracking

- Created: 2026-04-11
- Owner: docs (Saurabh)
- When picked up, fix in `apps/docs/docs/foundations/typography.md` and cross-check against `packages/tokens/src/primitive/typography.json` + `packages/tokens/src/semantic/typography.json`.
- Add any new foundations discrepancies (Color, Spacing, Radius, Border, Elevation, Motion) to this file as they are discovered.
