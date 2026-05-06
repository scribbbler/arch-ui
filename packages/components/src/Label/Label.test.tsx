import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Label } from "./Label";

describe("Label", () => {
  it("renders without crashing", () => {
    render(<Label>Submit</Label>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("renders as span by default", () => {
    render(<Label>text</Label>);
    expect(screen.getByText("text").tagName).toBe("SPAN");
  });

  it("renders as a different element via as prop", () => {
    render(<Label as="div">text</Label>);
    expect(screen.getByText("text").tagName).toBe("DIV");
  });

  it("applies default size CSS variables", () => {
    render(<Label>text</Label>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--label-font-size")).toBe(
      "var(--typography-scale-label-medium-font-size)",
    );
  });

  it("applies default weight from scale token", () => {
    render(<Label>text</Label>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--label-font-weight")).toBe(
      "var(--typography-scale-label-medium-font-weight)",
    );
  });

  it.each(["large", "medium", "small", "xsmall"] as const)("applies size=%s", (size) => {
    render(<Label size={size}>text</Label>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--label-font-size")).toContain(
      `label-${size}`,
    );
  });

  it.each(["large", "medium", "small", "xsmall"] as const)(
    "applies font-weight from scale token for size=%s",
    (size) => {
      render(<Label size={size}>text</Label>);
      const el = screen.getByText("text");
      expect(el.style.getPropertyValue("--label-font-weight")).toBe(
        `var(--typography-scale-label-${size}-font-weight)`,
      );
    },
  );

  it("applies custom color", () => {
    render(<Label color="color-text-subtle">text</Label>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--label-color")).toBe(
      "var(--color-text-subtle)",
    );
  });

  it("passes axe accessibility check", async () => {
    const { container } = render(<Label>Label text</Label>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
