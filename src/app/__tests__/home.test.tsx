import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "../page";

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname: vi.fn(),
}));

describe("Home Component", () => {
  afterEach(cleanup);

  it("should render the main elements", () => {
    render(<Home />);

    expect(
      screen.getByText("Procure pelo Nome ou Nome de Usuário"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Encontre os repositórios de algum usuário digitando no campo acima",
      ),
    ).toBeInTheDocument();
  });

  it("should render the Image component with correct alt text", () => {
    render(<Home />);

    expect(
      screen.getByAltText(
        "Ilustração de uma mulher procurando usuários com uma lupa por uma lista",
      ),
    ).toBeInTheDocument();
  });
});
