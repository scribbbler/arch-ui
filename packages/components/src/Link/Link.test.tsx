import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Link } from "./Link";

describe("Link", () => {
  it("renders without crashing", () => {
    render(<Link href="https://example.com">Visit example</Link>);
    expect(screen.getByText("Visit example")).toBeInTheDocument();
  });

  it("renders an anchor element", () => {
    render(<Link href="https://example.com">Visit example</Link>);
    expect(screen.getByRole("link", { name: "Visit example" })).toBeInTheDocument();
  });

  it("sets the href attribute", () => {
    render(<Link href="https://example.com">Visit example</Link>);
    expect(screen.getByRole("link", { name: "Visit example" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  it("applies arch-link class", () => {
    render(<Link href="#">Link</Link>);
    expect(screen.getByRole("link", { name: "Link" })).toHaveClass("arch-link");
  });

  it("applies arch-link--default class by default", () => {
    render(<Link href="#">Link</Link>);
    expect(screen.getByRole("link", { name: "Link" })).toHaveClass(
      "arch-link--default",
    );
  });

  it("applies arch-link--subtle class for subtle variant", () => {
    render(
      <Link href="#" variant="subtle">
        Link
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Link" })).toHaveClass(
      "arch-link--subtle",
    );
  });

  it("applies arch-link--inverse class for inverse variant", () => {
    render(
      <Link href="#" variant="inverse">
        Link
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Link" })).toHaveClass(
      "arch-link--inverse",
    );
  });

  it("applies additional className", () => {
    render(
      <Link href="#" className="custom">
        Link
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass("arch-link", "custom");
  });

  it("does not render external icon when external is false", () => {
    render(<Link href="#">Link</Link>);
    expect(document.querySelector(".arch-link__external-icon")).toBeNull();
  });

  it("renders external icon when external is true", () => {
    render(
      <Link href="#" external>
        Visit docs
      </Link>,
    );
    expect(document.querySelector(".arch-link__external-icon")).not.toBeNull();
  });

  it("external icon is aria-hidden", () => {
    render(
      <Link href="#" external>
        Visit docs
      </Link>,
    );
    const icon = document.querySelector(".arch-link__external-icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("appends (opens in new tab) to aria-label when external and aria-label is provided", () => {
    render(
      <Link href="#" external aria-label="Visit documentation">
        Docs
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      "Visit documentation (opens in new tab)",
    );
  });

  it("sets aria-label with (opens in new tab) when external and children is a string", () => {
    render(
      <Link href="#" external>
        Visit documentation
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      "Visit documentation (opens in new tab)",
    );
  });

  it("sets aria-description for external links without a string aria-label", () => {
    render(
      <Link href="#" external>
        <span>Complex children</span>
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-description", "(opens in new tab)");
  });

  it("does not set aria-description for non-external links", () => {
    render(<Link href="#">Normal link</Link>);
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-description");
  });

  it("passes through standard anchor props", () => {
    render(
      <Link href="https://example.com" target="_blank" rel="noopener noreferrer">
        External
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does NOT auto-set target='_blank' when external is true", () => {
    render(
      <Link href="#" external>
        Visit docs
      </Link>,
    );
    expect(screen.getByRole("link")).not.toHaveAttribute("target");
  });

  it("forwards ref to the anchor element", () => {
    let capturedRef: HTMLAnchorElement | null = null;
    render(
      <Link href="#" ref={(el) => { capturedRef = el; }}>
        Link
      </Link>,
    );
    expect(capturedRef).not.toBeNull();
    expect((capturedRef as HTMLAnchorElement | null)?.tagName).toBe("A");
  });

  it("passes axe accessibility check for default link", async () => {
    const { container } = render(
      <Link href="https://example.com">Visit example</Link>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe accessibility check for external link", async () => {
    const { container } = render(
      <Link href="https://example.com" external>
        Visit documentation
      </Link>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe accessibility check for external link with explicit aria-label", async () => {
    const { container } = render(
      <Link
        href="https://example.com"
        external
        aria-label="Open external documentation"
      >
        Docs
      </Link>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe accessibility check for subtle variant", async () => {
    const { container } = render(
      <Link href="#" variant="subtle">
        Subtle link
      </Link>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("passes axe accessibility check for inverse variant", async () => {
    const { container } = render(
      <div style={{ background: "#000" }}>
        <Link href="#" variant="inverse">
          Inverse link
        </Link>
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
