import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Code } from "./Code";

describe("Code", () => {
  it("renders without crashing", () => {
    render(<Code>const x = 1;</Code>);
    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
  });

  it("renders as inline code by default", () => {
    render(<Code>snippet</Code>);
    expect(screen.getByText("snippet").tagName).toBe("CODE");
  });

  it("renders as pre wrapping code when block is true", () => {
    render(<Code block>const x = 1;</Code>);
    const codeEl = screen.getByText("const x = 1;");
    expect(codeEl.tagName).toBe("CODE");
    expect(codeEl.parentElement?.tagName).toBe("PRE");
  });

  it("applies arch-code class to inline code", () => {
    render(<Code>snippet</Code>);
    expect(screen.getByText("snippet")).toHaveClass("arch-code");
  });

  it("applies arch-code--inline class to inline code", () => {
    render(<Code>snippet</Code>);
    expect(screen.getByText("snippet")).toHaveClass("arch-code--inline");
  });

  it("applies arch-code-block class to pre element in block mode", () => {
    render(<Code block>snippet</Code>);
    const codeEl = screen.getByText("snippet");
    expect(codeEl.parentElement).toHaveClass("arch-code-block");
  });

  it("applies arch-code class to inner code element in block mode", () => {
    render(<Code block>snippet</Code>);
    expect(screen.getByText("snippet")).toHaveClass("arch-code");
  });

  it("does not apply arch-code--inline class in block mode", () => {
    render(<Code block>snippet</Code>);
    expect(screen.getByText("snippet")).not.toHaveClass("arch-code--inline");
  });

  it("applies additional className to inline code", () => {
    render(<Code className="custom">snippet</Code>);
    expect(screen.getByText("snippet")).toHaveClass("arch-code", "custom");
  });

  it("applies additional className to pre element in block mode", () => {
    render(<Code block className="custom">snippet</Code>);
    const codeEl = screen.getByText("snippet");
    expect(codeEl.parentElement).toHaveClass("arch-code-block", "custom");
  });

  it("applies correct CSS variables for default size code-md", () => {
    render(<Code>snippet</Code>);
    const el = screen.getByText("snippet");
    expect(el.style.getPropertyValue("--code-font-size")).toBe(
      "var(--typography-scale-code-md-font-size)",
    );
    expect(el.style.getPropertyValue("--code-line-height")).toBe(
      "var(--typography-scale-code-md-line-height)",
    );
    expect(el.style.getPropertyValue("--code-letter-spacing")).toBe(
      "var(--typography-scale-code-md-letter-spacing)",
    );
  });

  it("applies correct CSS variables for size code-sm", () => {
    render(<Code size="code-sm">snippet</Code>);
    const el = screen.getByText("snippet");
    expect(el.style.getPropertyValue("--code-font-size")).toBe(
      "var(--typography-scale-code-sm-font-size)",
    );
  });

  it("applies correct CSS variables on the pre element in block mode", () => {
    render(<Code block>snippet</Code>);
    const preEl = screen.getByText("snippet").parentElement;
    expect(preEl?.style.getPropertyValue("--code-font-size")).toBe(
      "var(--typography-scale-code-md-font-size)",
    );
  });

  it("sets data-language attribute when language is provided", () => {
    render(<Code language="typescript">snippet</Code>);
    expect(screen.getByText("snippet")).toHaveAttribute(
      "data-language",
      "typescript",
    );
  });

  it("sets data-language on pre element in block mode", () => {
    render(<Code block language="css">snippet</Code>);
    const preEl = screen.getByText("snippet").parentElement;
    expect(preEl).toHaveAttribute("data-language", "css");
  });

  it("does not set data-language when language is not provided", () => {
    render(<Code>snippet</Code>);
    expect(screen.getByText("snippet")).not.toHaveAttribute("data-language");
  });

  it("passes axe accessibility check for inline code", async () => {
    const { container } = render(
      <p>
        Use <Code>const</Code> to declare a constant.
      </p>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe accessibility check for block code", async () => {
    const { container } = render(
      <Code block language="javascript">
        {`function greet(name) {\n  return 'Hello, ' + name;\n}`}
      </Code>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
