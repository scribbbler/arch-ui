import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Heading } from "./Heading";

describe("Heading", () => {
  it("renders without crashing", () => {
    render(<Heading>Hello world</Heading>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders as h1 by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByText("Title").tagName).toBe("H1");
  });

  it("renders as h2 when level is 2", () => {
    render(<Heading level={2}>Title</Heading>);
    expect(screen.getByText("Title").tagName).toBe("H2");
  });

  it("renders as h3 when level is 3", () => {
    render(<Heading level={3}>Title</Heading>);
    expect(screen.getByText("Title").tagName).toBe("H3");
  });

  it("renders as h4 when level is 4", () => {
    render(<Heading level={4}>Title</Heading>);
    expect(screen.getByText("Title").tagName).toBe("H4");
  });

  it("renders as h5 when level is 5", () => {
    render(<Heading level={5}>Title</Heading>);
    expect(screen.getByText("Title").tagName).toBe("H5");
  });

  it("renders as h6 when level is 6", () => {
    render(<Heading level={6}>Title</Heading>);
    expect(screen.getByText("Title").tagName).toBe("H6");
  });

  it("applies arch-heading class", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByText("Title")).toHaveClass("arch-heading");
  });

  it("applies additional className", () => {
    render(<Heading className="custom">Title</Heading>);
    expect(screen.getByText("Title")).toHaveClass("arch-heading", "custom");
  });

  it("applies default size xxlarge for level 1", () => {
    render(<Heading level={1}>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-xxlarge-font-size)",
    );
  });

  it("applies default size xlarge for level 2", () => {
    render(<Heading level={2}>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-xlarge-font-size)",
    );
  });

  it("applies default size large for level 3", () => {
    render(<Heading level={3}>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-large-font-size)",
    );
  });

  it("applies default size medium for level 4", () => {
    render(<Heading level={4}>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-medium-font-size)",
    );
  });

  it("applies default size small for level 5", () => {
    render(<Heading level={5}>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-small-font-size)",
    );
  });

  it("applies default size xsmall for level 6", () => {
    render(<Heading level={6}>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-xsmall-font-size)",
    );
  });

  it("overrides size independently of level", () => {
    render(<Heading level={2} size="small">Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-small-font-size)",
    );
    expect(el.tagName).toBe("H2");
  });

  it("applies xxlarge size tokens", () => {
    render(<Heading size="xxlarge">Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-size")).toBe(
      "var(--typography-scale-heading-xxlarge-font-size)",
    );
    expect(el.style.getPropertyValue("--heading-line-height")).toBe(
      "var(--typography-scale-heading-xxlarge-line-height)",
    );
    expect(el.style.getPropertyValue("--heading-letter-spacing")).toBe(
      "var(--typography-scale-heading-xxlarge-letter-spacing)",
    );
  });

  it("applies default weight from scale token", () => {
    render(<Heading>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-weight")).toBe(
      "var(--typography-scale-heading-xxlarge-font-weight)",
    );
  });

  it("applies weight from scale token for size small", () => {
    render(<Heading size="small">Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-weight")).toBe(
      "var(--typography-scale-heading-small-font-weight)",
    );
  });

  it("applies weight from scale token for size medium", () => {
    render(<Heading size="medium">Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-font-weight")).toBe(
      "var(--typography-scale-heading-medium-font-weight)",
    );
  });

  it("applies default color token", () => {
    render(<Heading>Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-color")).toBe(
      "var(--color-text-default)",
    );
  });

  it("applies custom color token", () => {
    render(<Heading color="color-text-inverse">Title</Heading>);
    const el = screen.getByText("Title");
    expect(el.style.getPropertyValue("--heading-color")).toBe(
      "var(--color-text-inverse)",
    );
  });

  it("forwards ref to the underlying heading element", () => {
    let capturedRef: HTMLHeadingElement | null = null;
    render(
      <Heading ref={(el) => { capturedRef = el; }}>Title</Heading>,
    );
    expect(capturedRef).not.toBeNull();
    expect((capturedRef as HTMLHeadingElement | null)?.tagName).toBe("H1");
  });

  it("passes axe accessibility check", async () => {
    const { container } = render(
      <main>
        <Heading>Page Title</Heading>
      </main>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe accessibility check for all levels in hierarchy", async () => {
    const { container } = render(
      <main>
        <Heading level={1}>H1</Heading>
        <Heading level={2}>H2</Heading>
        <Heading level={3}>H3</Heading>
      </main>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
