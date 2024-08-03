// favoriteRepositoryButon.test.tsx
import { github_api } from "@/services/axios";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DisavowRepositoryButton } from "../DisavowRepositoryButton";

// Mockar dependências
vi.mock("@/services/axios", () => ({
  github_api: {
    delete: vi.fn(),
  },
}));
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("DisavowRepositoryButton Component", () => {
  afterEach(cleanup);

  const owner = "test-owner";
  const repositoryName = "test-repo";
  const loadDataAfterUpdate = vi.fn();

  it("should render correctly", () => {
    render(
      <DisavowRepositoryButton
        owner={owner}
        repositoryName={repositoryName}
        loadDataAfterUpdate={loadDataAfterUpdate}
      />,
    );

    const buttonElement = screen.getByTestId("disavow-button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call handleDisavowRepository on button click", async () => {
    render(
      <DisavowRepositoryButton
        owner={owner}
        repositoryName={repositoryName}
        loadDataAfterUpdate={loadDataAfterUpdate}
      />,
    );

    const buttonElement = screen.getByTestId("disavow-button");
    fireEvent.click(buttonElement);

    expect(github_api.delete).toHaveBeenCalledWith(
      `/user/starred/${owner}/${repositoryName}`,
    );
  });

  it("should show error toast on API failure", async () => {
    (github_api.delete as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error("API Error"),
    );

    render(
      <DisavowRepositoryButton
        owner={owner}
        repositoryName={repositoryName}
        loadDataAfterUpdate={loadDataAfterUpdate}
      />,
    );

    const buttonElement = screen.getByTestId("disavow-button");
    fireEvent.click(buttonElement);

    expect(github_api.delete).toHaveBeenCalledWith(
      `/user/starred/${owner}/${repositoryName}`,
    );
  });
});
