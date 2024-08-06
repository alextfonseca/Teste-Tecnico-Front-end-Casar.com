// __tests__/user.test.tsx

import { IRepositoryProps } from "@/@types/response";
import { github_api } from "@/services/axios";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { afterEach, describe, expect, it, vi } from "vitest";
import User from "../user/page";

// Mock external dependencies
vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

vi.mock("@/services/axios", () => ({
  github_api: {
    get: vi.fn(),
  },
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("@/components/NoUsersFound", () => ({
  NoUsersFound: ({ userName }: { userName: string }) => (
    <div data-testid="no-users-found">{userName}</div>
  ),
}));

vi.mock("@/components/RepositoryCard", () => ({
  RepositoryCard: ({
    repositoryData,
  }: {
    repositoryData: IRepositoryProps;
  }) => <div data-testid="repository-title">{repositoryData.name}</div>,
}));

describe("UserComponent", () => {
  afterEach(cleanup);

  it("renders loading state", () => {
    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue({
      get: () => "testuser",
    });

    render(<User />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders user data and repositories", async () => {
    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue({
      get: () => "testuser",
    });

    const repositories = [
      {
        id: 1,
        name: "Repo 1",
        description: "Description 1",
        language: "JavaScript",
        updated_at: "2022-01-01",
        owner: { login: "owner1" },
        isStarred: false,
      },
    ];
    localStorage.setItem("starredRepositories", JSON.stringify(repositories));

    (github_api.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        avatar_url: "https://example.com/avatar.jpg",
        name: "Test User",
        login: "testuser",
        bio: "This is a test user",
      },
    });

    (github_api.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "Repo 1",
          description: "Description 1",
          language: "JavaScript",
          updated_at: "2022-01-01",
          owner: { login: "owner1" },
          isStarred: false,
        },
      ],
    });

    render(<User />);

    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toHaveTextContent("Test User");
      expect(screen.getByTestId("user-login")).toHaveTextContent("@testuser");
      expect(screen.getByTestId("user-bio")).toHaveTextContent(
        "This is a test user",
      );
      expect(screen.getByTestId("repository-title")).toHaveTextContent(
        "Repo 1",
      );
    });
  });

  it("handles API error", async () => {
    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue({
      get: () => "testuser",
    });

    (github_api.get as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("API Error"),
    );

    render(<User />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Erro ao buscar dados do usuário",
      );
    });
  });

  it("renders No Users Found component", async () => {
    (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue({
      get: () => "",
    });

    render(<User />);

    await waitFor(() => {
      expect(screen.getByTestId("no-users-found")).toHaveTextContent("");
    });
  });
});
