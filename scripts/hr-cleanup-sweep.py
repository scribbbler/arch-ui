#!/usr/bin/env python3
"""
Strip any markdown `---` (horizontal rule) whose next non-blank content is
NOT an h2 or h3 heading. Industry-standard rule: dividers mark peer
transitions at the major-section (h2) and subsection (h3) levels only.

Preserves:
  - YAML frontmatter fences (`---` at the top of the file enclosing
    frontmatter metadata)
  - `---` inside fenced code blocks
  - `---` that is immediately followed (skipping blank lines) by an h2 or h3,
    either markdown (`## `, `### `) or HTML (`<h2`, `<h3`)

Removes the `---` line and any surrounding blank lines that would otherwise
leave a double gap.

Idempotent: running it again on cleaned files is a no-op.
"""

from __future__ import annotations

import os
import re
import sys

DOC_ROOT = "apps/docs/docs"

RE_MD_HEADING_23 = re.compile(r"^(#{2,3})\s+")
RE_HTML_HEADING_23 = re.compile(r"<h[23][\s>]", re.IGNORECASE)
RE_FRONTMATTER_FENCE = re.compile(r"^---\s*$")


def is_h2_or_h3(line: str) -> bool:
    stripped = line.lstrip(" ").rstrip("\n")
    if stripped.startswith("    "):  # indented code
        return False
    if RE_MD_HEADING_23.match(stripped):
        return True
    if RE_HTML_HEADING_23.match(stripped):
        return True
    return False


def process_file(path: str) -> int:
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    out: list[str] = []
    in_code = False
    removed = 0

    # Detect and pass through YAML frontmatter verbatim.
    i = 0
    if lines and RE_FRONTMATTER_FENCE.match(lines[0]):
        out.append(lines[0])
        i = 1
        while i < len(lines):
            out.append(lines[i])
            if RE_FRONTMATTER_FENCE.match(lines[i]):
                i += 1
                break
            i += 1

    while i < len(lines):
        line = lines[i]
        stripped_full = line.rstrip("\n").strip()

        # Track code fences
        if line.lstrip(" ").startswith("```"):
            in_code = not in_code
            out.append(line)
            i += 1
            continue

        if in_code:
            out.append(line)
            i += 1
            continue

        if RE_FRONTMATTER_FENCE.match(line):
            # A `---` in the body — check the next non-blank content line
            j = i + 1
            while j < len(lines) and lines[j].strip() == "":
                j += 1
            follows_heading = j < len(lines) and is_h2_or_h3(lines[j])
            if follows_heading:
                # Keep the hr. Normalize to exactly one blank line on each side.
                # Ensure preceding blank line
                if out and out[-1].strip() != "":
                    out.append("\n")
                out.append("---\n")
                # Skip original blank lines between `---` and next content
                # Re-emit a single blank line before the content.
                out.append("\n")
                i = j
                continue
            else:
                # Drop the hr. Also consume the trailing blank line so we don't
                # end up with a double blank. Preceding blank stays.
                removed += 1
                i += 1
                # Consume one trailing blank if present
                if i < len(lines) and lines[i].strip() == "":
                    i += 1
                continue

        out.append(line)
        i += 1

    if removed:
        with open(path, "w", encoding="utf-8") as f:
            f.writelines(out)
    return removed


def main() -> int:
    total_files = 0
    total_removed = 0
    touched: list[tuple[str, int]] = []
    for root, _dirs, files in os.walk(DOC_ROOT):
        for name in sorted(files):
            if not (name.endswith(".md") or name.endswith(".mdx")):
                continue
            path = os.path.join(root, name)
            n = process_file(path)
            total_files += 1
            if n:
                total_removed += n
                touched.append((path, n))
    print(f"Scanned {total_files} files")
    print(f"Removed {total_removed} stray `---` across {len(touched)} files")
    for p, n in touched:
        print(f"  {n:>3}  {p}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
