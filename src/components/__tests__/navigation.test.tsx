// Navigation.test.tsx
import { cleanup, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Navigation } from "../Navigation";

// Mock the usePathname hook
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Navigation Component", () => {
  afterEach(cleanup);

  it("should render correctly with initial path", () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/");
    render(<Navigation />);

    const userButton = screen.getByTestId("user-button");
    expect(userButton).toBeInTheDocument();
    expect(userButton).toHaveClass("bg-primary");

    const userIcon = screen.getByAltText("User Icon White");
    expect(userIcon).toBeInTheDocument();
  });

  it("should render correctly with /favorites path", () => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue("/favorites");
    render(<Navigation />);

    const userButton = screen.getByTestId("user-button");
    expect(userButton).toBeInTheDocument();
    expect(userButton).toHaveClass("bg-white");

    const favoritesButton = screen.getByTestId("favorites-button");
    expect(favoritesButton).toBeInTheDocument();
    expect(favoritesButton).toHaveClass("bg-primary");
  });
});
