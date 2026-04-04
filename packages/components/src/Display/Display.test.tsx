import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Display } from "./Display";

describe("Display", () => {
  it("renders without crashing", () => {
    render(<Display>Hero text</Display>);
    expect(screen.getByText("Hero text")).toBeInTheDocument();
  });

  it("renders as p by default", () => {
    render(<Display>text</Display>);
    expect(screen.getByText("text").tagName).toBe("P");
  });

  it("renders as a different element via as prop", () => {
    render(<Display as="span">text</Display>);
    expect(screen.getByText("text").tagName).toBe("SPAN");
  });

  it("applies default size CSS variables", () => {
    render(<Display>text</Display>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--display-font-size")).toBe(
      "var(--typography-scale-display-large-font-size)",
    );
  });

  it.each(["large", "medium", "small", "xsmall"] as const)(
    "applies size=%s",
    (size) => {
      render(<Display size={size}>text</Display>);
      const el = screen.getByText("text");
      expect(el.style.getPropertyValue("--display-font-size")).toContain(size);
    },
  );

  it.each(["semibold", "bold", "extrabold"] as const)(
    "applies weight=%s",
    (weight) => {
      render(<Display weight={weight}>text</Display>);
      const el = screen.getByText("text");
      expect(el.style.getPropertyValue("--display-font-weight")).toContain(weight);
    },
  );

  it("applies custom color", () => {
    render(<Display color="color-text-inverse">text</Display>);
    const el = screen.getByText("text");
    expect(el.style.getPropertyValue("--display-color")).toBe("var(--color-text-inverse)");
  });

  it("passes axe accessibility check", async () => {
    const { container } = render(<Display>Display text</Display>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
