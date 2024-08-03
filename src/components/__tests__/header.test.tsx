import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "../Header";

// Mock para o componente Image do next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

// Mock para o componente Link do next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Header component", () => {
  afterEach(cleanup);

  it("should render the Header component", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the link to favorites with correct text", () => {
    render(<Header />);
    const linkElement = screen.getByRole("link", { name: /Favoritos/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/favorites");
  });

  it("should render the heart icon image with correct attributes", () => {
    render(<Header />);
    const imgElement = screen.getByAltText("Ícone de coração");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("width", "24");
    expect(imgElement).toHaveAttribute("height", "20");
  });
});
