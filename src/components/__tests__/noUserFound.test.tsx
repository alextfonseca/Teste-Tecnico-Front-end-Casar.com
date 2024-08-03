// NoUsersFound.test.tsx
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { NoUsersFound } from "../NoUsersFound";

describe("NoUsersFound Component", () => {
  afterEach(cleanup);

  it("should render correctly with a userName", () => {
    render(<NoUsersFound userName="John Doe" />);

    const userNameElement = screen.getByText(/“John Doe”/);
    expect(userNameElement).toBeInTheDocument();
    expect(userNameElement).toHaveClass("text-xl font-semibold text-primary");

    const headingElement = screen.getByText(/Nenhum usuário encontrado/);
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass(
      "text-xl font-semibold text-greyNeutral",
    );

    const paragraphElement = screen.getByText(
      /Verifique se a escrita está correta ou tente novamente/,
    );
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass(
      "text-center text-greyNeutral lg:text-left",
    );

    const imageElement = screen.getByAltText(
      "Ilustração de um ovni abduzindo um alien",
    );
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveClass("mt-8 hidden lg:block");
  });

  it("should render correctly with a null userName", () => {
    render(<NoUsersFound userName={null} />);

    const userNameElement = screen.getByText(/“”/);
    expect(userNameElement).toBeInTheDocument();
    expect(userNameElement).toHaveClass("text-xl font-semibold text-primary");

    const headingElement = screen.getByText(/Nenhum usuário encontrado/);
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass(
      "text-xl font-semibold text-greyNeutral",
    );

    const paragraphElement = screen.getByText(
      /Verifique se a escrita está correta ou tente novamente/,
    );
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass(
      "text-center text-greyNeutral lg:text-left",
    );

    const imageElement = screen.getByAltText(
      "Ilustração de um ovni abduzindo um alien",
    );
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveClass("mt-8 hidden lg:block");
  });
});
