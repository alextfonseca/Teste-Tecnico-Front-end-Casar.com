// searchLayout.test.tsx
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchLayout } from "../searchLayout";

// Mockar os componentes Header e Navigation
vi.mock("@/components/Header", () => ({
  Header: () => <div data-testid="header">Header</div>,
}));
vi.mock("@/components/Navigation", () => ({
  Navigation: () => <div data-testid="navigation">Navigation</div>,
}));

describe("SearchLayout Component", () => {
  afterEach(cleanup);

  it("should render children correctly", () => {
    render(
      <SearchLayout>
        <div data-testid="child">Child Component</div>
      </SearchLayout>,
    );

    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
  });

  it("should render Header component on large screens", () => {
    render(
      <SearchLayout>
        <div data-testid="child">Child Component</div>
      </SearchLayout>,
    );

    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  it("should render Navigation component on small screens", () => {
    render(
      <SearchLayout>
        <div data-testid="child">Child Component</div>
      </SearchLayout>,
    );

    const navigationElement = screen.getByTestId("navigation");
    expect(navigationElement).toBeInTheDocument();
  });
});
