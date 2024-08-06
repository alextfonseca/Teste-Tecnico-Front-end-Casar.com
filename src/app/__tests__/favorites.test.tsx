import { github_api } from "@/services/axios";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { afterEach, describe, expect, it, vi } from "vitest";
import Favorites from "../favorites/page";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

vi.mock("@/components/RepositoryCard", () => ({
  RepositoryCard: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

vi.mock("@/components/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock("@/layout/searchLayout", () => ({
  SearchLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Favorites Page", () => {
  afterEach(cleanup);

  it("should display loading spinner while fetching data", async () => {
    vi.spyOn(github_api, "get").mockResolvedValueOnce({ data: [] });

    render(<Favorites />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() => expect(github_api.get).toHaveBeenCalled());
  });

  it("should display error message when fetching data fails", async () => {
    vi.spyOn(github_api, "get").mockRejectedValueOnce(
      new Error("Network Error"),
    );

    render(<Favorites />);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Erro ao buscar repositórios favoritos",
      ),
    );
  });

  it("should display favorite repositories after fetching data", async () => {
    const mockData = [
      {
        id: 1,
        name: "Repo 1",
        description: "Description 1",
        language: "JavaScript",
        updated_at: "2023-01-01T00:00:00Z",
        owner: { login: "owner1" },
      },
      {
        id: 2,
        name: "Repo 2",
        description: "Description 2",
        language: "TypeScript",
        updated_at: "2023-01-02T00:00:00Z",
        owner: { login: "owner2" },
      },
    ];

    vi.spyOn(github_api, "get").mockResolvedValueOnce({ data: mockData });

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText("Repo 1")).toBeInTheDocument();
      expect(screen.getByText("Repo 2")).toBeInTheDocument();
    });
  });

  it("should display 'Esse repositório não tem descrição' when repository description is missing", async () => {
    const mockData = [
      {
        id: 1,
        name: "Repo 1",
        description: null,
        language: "JavaScript",
        updated_at: "2023-01-01T00:00:00Z",
        owner: { login: "owner1" },
      },
    ];

    vi.spyOn(github_api, "get").mockResolvedValueOnce({ data: mockData });

    render(<Favorites />);

    await waitFor(() => {
      expect(
        screen.getByText("Esse repositório não tem descrição"),
      ).toBeInTheDocument();
    });
  });
});
