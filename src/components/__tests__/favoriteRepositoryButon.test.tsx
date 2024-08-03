// favoriteRepositoryButon.test.tsx
import { github_api } from "@/services/axios";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FavoriteRepositoryButton } from "../FavoriteRepositoryButton";

// Mockar dependências
vi.mock("@/services/axios", () => ({
  github_api: {
    put: vi.fn(),
  },
}));
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("FavoriteRepositoryButton Component", () => {
  afterEach(cleanup);

  const owner = "test-owner";
  const repositoryName = "test-repo";
  const loadDataAfterUpdate = vi.fn();

  it("should render correctly", () => {
    render(
      <FavoriteRepositoryButton
        owner={owner}
        repositoryName={repositoryName}
        loadDataAfterUpdate={loadDataAfterUpdate}
      />,
    );

    const buttonElement = screen.getByTestId("favorite-button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call handleFavoriteRepository on button click", async () => {
    render(
      <FavoriteRepositoryButton
        owner={owner}
        repositoryName={repositoryName}
        loadDataAfterUpdate={loadDataAfterUpdate}
      />,
    );

    const buttonElement = screen.getByTestId("favorite-button");
    fireEvent.click(buttonElement);

    expect(github_api.put).toHaveBeenCalledWith(
      `/user/starred/${owner}/${repositoryName}`,
    );
  });

  it("should show error toast on API failure", async () => {
    (github_api.put as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("API Error"),
    );

    render(
      <FavoriteRepositoryButton
        owner={owner}
        repositoryName={repositoryName}
        loadDataAfterUpdate={loadDataAfterUpdate}
      />,
    );

    const buttonElement = screen.getByTestId("favorite-button");
    fireEvent.click(buttonElement);

    expect(github_api.put).toHaveBeenCalledWith(
      `/user/starred/${owner}/${repositoryName}`,
    );
  });
});
