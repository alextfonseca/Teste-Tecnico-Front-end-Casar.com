import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Search } from "../Search";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push,
    };
  },
}));

describe("Search component", () => {
  afterEach(cleanup);

  it("renders Search component and checks elements", () => {
    render(<Search />);

    const form = screen.getByTestId("search-form");
    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("search-button");

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("input value changes on user typing", () => {
    render(<Search />);

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "testuser" } });

    expect(input).toHaveValue("testuser");
  });

  it("Search component", () => {
    render(<Search />);

    const input = screen.getByTestId("search-input");
    const form = screen.getByTestId("search-form");

    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.submit(form);

    expect(push).toHaveBeenCalledWith("/user?username=testuser");
  });
});
