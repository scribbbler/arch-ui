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
      "var(--typography-scale-text-md-font-size)",
    );
  });

  it("applies default weight as medium", () => {
    render(<Label>text</Label>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--label-font-weight")).toBe(
      "var(--typography-weight-medium)",
    );
  });

  it.each(["lg", "md", "sm", "xs"] as const)("applies size=%s", (size) => {
    render(<Label size={size}>text</Label>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--label-font-size")).toContain(
      `text-${size}`,
    );
  });

  it.each(["medium", "semibold", "bold"] as const)(
    "applies weight=%s",
    (weight) => {
      render(<Label weight={weight}>text</Label>);
      const el = screen.getByText("text");
      expect(el.style.getPropertyValue("--label-font-weight")).toContain(weight);
    },
  );

  it("applies uppercase class", () => {
    render(<Label uppercase>OVERLINE</Label>);
    expect(screen.getByText("OVERLINE")).toHaveClass("arch-label--uppercase");
  });

  it("does not apply uppercase class by default", () => {
    render(<Label>text</Label>);
    expect(screen.getByText("text")).not.toHaveClass("arch-label--uppercase");
  });

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
