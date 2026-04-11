#!/usr/bin/env python3
"""
Insert `---\\n\\n` before every markdown/HTML h3 that follows another h3 at
peer level (i.e. the previous heading in the same scope was also h3). The
first h3 after an h2 (or the start of a tab/page) gets NO divider.

Scope reset triggers:
  - <TabItem ...>      (start of a new tab's content)
  - </TabItem>         (end of a tab)
  - Start of file      (reset state)
  - Any h1 or h2       (reset h3 tracking — next h3 is "first")

Skip contexts:
  - Fenced code blocks (``` ... ```)
  - Lines where a `---` already precedes (idempotent)

Handles both:
  - Markdown `### Heading`
  - HTML `<h3>...</h3>` or `<h3 ...>...</h3>`

Markdown headings inside a line starting with leading whitespace > 3 are
indented code and skipped.
"""

from __future__ import annotations

import os
import re
import sys

DOC_ROOT = "apps/docs/docs"

RE_MD_HEADING = re.compile(r"^(#{1,6})\s+")
RE_HTML_HEADING = re.compile(r"<h([1-6])[\s>]", re.IGNORECASE)
RE_TAB_ITEM_OPEN = re.compile(r"<TabItem\b", re.IGNORECASE)
RE_TAB_ITEM_CLOSE = re.compile(r"</TabItem>", re.IGNORECASE)


def heading_level(line: str, in_code: bool) -> int | None:
    """Return heading level 1-6 if the line starts a heading, else None."""
    if in_code:
        return None
    # markdown heading (must not be indented 4+ spaces — that's a code block)
    if line.startswith("    "):
        return None
    m = RE_MD_HEADING.match(line.lstrip(" ").rstrip("\n"))
    if m:
        return len(m.group(1))
    # HTML heading tag on its own line (allowing indent)
    stripped = line.lstrip(" ").rstrip("\n")
    m2 = RE_HTML_HEADING.match(stripped)
    if m2:
        return int(m2.group(1))
    return None


def prev_non_blank(out: list[str]) -> str | None:
    j = len(out) - 1
    while j >= 0 and out[j].strip() == "":
        j -= 1
    return out[j] if j >= 0 else None


def process_file(path: str) -> int:
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    out: list[str] = []
    last_heading_level: int | None = None
    in_code = False
    inserted = 0

    for line in lines:
        stripped = line.lstrip(" ").rstrip("\n")

        # toggle code fence
        if stripped.startswith("```"):
            in_code = not in_code
            out.append(line)
            continue

        # TabItem boundaries reset the heading-tracking scope
        if RE_TAB_ITEM_OPEN.search(line) or RE_TAB_ITEM_CLOSE.search(line):
            last_heading_level = None
            out.append(line)
            continue

        level = heading_level(line, in_code)
        if level == 3 and last_heading_level == 3:
            # Sibling h3 → insert divider unless one already sits above
            prev = prev_non_blank(out)
            if prev is None or prev.strip() != "---":
                # ensure a blank line precedes the new `---`
                if out and out[-1].strip() != "":
                    out.append("\n")
                out.append("---\n")
                out.append("\n")
                inserted += 1

        if level is not None:
            # Track only h2 and h3 scope transitions; h4+ don't reset h3 tracking
            if level <= 2:
                last_heading_level = level  # h1 or h2 → next h3 is "first"
            elif level == 3:
                last_heading_level = 3
            # h4/h5/h6 → leave last_heading_level alone

        out.append(line)

    if inserted:
        with open(path, "w", encoding="utf-8") as f:
            f.writelines(out)
    return inserted


def main() -> int:
    total_files = 0
    total_inserted = 0
    files_touched: list[tuple[str, int]] = []
    for root, _dirs, files in os.walk(DOC_ROOT):
        for name in sorted(files):
            if not (name.endswith(".md") or name.endswith(".mdx")):
                continue
            path = os.path.join(root, name)
            n = process_file(path)
            total_files += 1
            if n:
                total_inserted += n
                files_touched.append((path, n))
    print(f"Scanned {total_files} files")
    print(f"Inserted {total_inserted} h3 dividers across {len(files_touched)} files")
    for p, n in files_touched:
        print(f"  {n:>3}  {p}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
