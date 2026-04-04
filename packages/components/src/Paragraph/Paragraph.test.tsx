import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Paragraph } from "./Paragraph";

describe("Paragraph", () => {
  it("renders without crashing", () => {
    render(<Paragraph>Body text</Paragraph>);
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("renders as p by default", () => {
    render(<Paragraph>text</Paragraph>);
    expect(screen.getByText("text").tagName).toBe("P");
  });

  it("renders as a different element via as prop", () => {
    render(<Paragraph as="span">text</Paragraph>);
    expect(screen.getByText("text").tagName).toBe("SPAN");
  });

  it("applies default weight as regular", () => {
    render(<Paragraph>text</Paragraph>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--paragraph-font-weight")).toBe(
      "var(--typography-weight-regular)",
    );
  });

  it.each(["large", "medium", "small", "xsmall"] as const)("applies size=%s", (size) => {
    render(<Paragraph size={size}>text</Paragraph>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--paragraph-font-size")).toContain(
      `paragraph-${size}`,
    );
  });

  it("applies truncate class", () => {
    render(<Paragraph truncate>long text</Paragraph>);
    expect(screen.getByText("long text")).toHaveClass("arch-paragraph--truncate");
  });

  it("does not apply truncate class by default", () => {
    render(<Paragraph>text</Paragraph>);
    expect(screen.getByText("text")).not.toHaveClass("arch-paragraph--truncate");
  });

  it("applies custom color", () => {
    render(<Paragraph color="color-text-subtle">text</Paragraph>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--paragraph-color")).toBe(
      "var(--color-text-subtle)",
    );
  });

  it("passes axe accessibility check", async () => {
    const { container } = render(<Paragraph>Body text content</Paragraph>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
