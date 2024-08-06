import { IRepositoryProps } from "@/@types/response";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Favorites from "../favorites/page";

// Mock components
vi.mock("@/components/RepositoryCard", () => ({
  RepositoryCard: ({
    repositoryData,
  }: {
    repositoryData: IRepositoryProps;
  }) => <div data-testid="repository-card">{repositoryData.name}</div>,
}));

vi.mock("@/layout/searchLayout", () => ({
  SearchLayout: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Favorites Page", () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
  });

  it("displays message when there are no starred repositories", async () => {
    localStorage.setItem("starredRepositories", JSON.stringify([]));
    render(<Favorites />);

    await waitFor(() => {
      expect(
        screen.getByText("Você ainda não tem repositórios favoritos"),
      ).toBeInTheDocument();
    });
  });

  it("displays list of repositories when there are starred repositories", async () => {
    const repositories = [
      { id: 1, name: "Repo 1" },
      { id: 2, name: "Repo 2" },
    ];
    localStorage.setItem("starredRepositories", JSON.stringify(repositories));
    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText("Repo 1")).toBeInTheDocument();
      expect(screen.getByText("Repo 2")).toBeInTheDocument();
    });
  });

  it("returns early if starredRepositories is not in local storage", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation((key) => {
      if (key === "starredRepositories") {
        return null;
      }
      return null;
    });

    render(<Favorites />);

    // Check if the message about no favorite repositories is displayed
    expect(
      screen.getByText("Você ainda não tem repositórios favoritos"),
    ).toBeInTheDocument();
  });
});
