import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Spinner } from "../Spinner";

describe("Spinner component", () => {
  afterEach(cleanup);

  it("should render the Spinner component", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should have a div with role status", () => {
    render(<Spinner />);
    const divElement = screen.getByRole("status");
    expect(divElement).toBeInTheDocument();
  });
});
