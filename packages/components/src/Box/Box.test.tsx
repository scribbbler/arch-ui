import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Box } from "./Box";

describe("Box", () => {
  it("renders without crashing", () => {
    render(<Box>content</Box>);
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders as a different element via as prop", () => {
    render(<Box as="section">content</Box>);
    expect(screen.getByText("content").tagName).toBe("SECTION");
  });

  it("applies token CSS variables for padding", () => {
    render(<Box padding="spacing-component-md">content</Box>);
    const el = screen.getByText("content");
    expect(el.style.getPropertyValue("--box-padding")).toBe(
      "var(--spacing-component-md)",
    );
  });

  it("applies token CSS variables for background", () => {
    render(<Box background="color-surface-raised">content</Box>);
    const el = screen.getByText("content");
    expect(el.style.getPropertyValue("--box-background")).toBe(
      "var(--color-surface-raised)",
    );
  });

  it("sets border width when border prop is provided", () => {
    render(<Box border="color-border-default">content</Box>);
    const el = screen.getByText("content");
    expect(el.style.getPropertyValue("--box-border")).toBe(
      "var(--color-border-default)",
    );
    expect(el.style.getPropertyValue("--box-border-width")).toBe(
      "var(--border-width-default)",
    );
  });

  it("applies className", () => {
    render(<Box className="custom">content</Box>);
    expect(screen.getByText("content")).toHaveClass("arch-box", "custom");
  });

  it("passes axe accessibility check", async () => {
    const { container } = render(<Box>content</Box>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
