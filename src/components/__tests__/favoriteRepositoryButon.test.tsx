// FavoriteRepositoryButton.test.tsx
import { IRepositoryProps } from "@/@types/response";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FavoriteRepositoryButton } from "../FavoriteRepositoryButton";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockLoadDataAfterUpdate = vi.fn();

const repositoryData: IRepositoryProps = {
  id: 1,
  name: "Test Repository",
  description: "This is a test repository",
  isStarred: false,
  language: "JavaScript",
  owner: {
    login: "test-owner",
  },
  updated_at: "2023-01-01T00:00:00Z",
};

describe("FavoriteRepositoryButton", () => {
  afterEach(cleanup);

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders the button correctly", () => {
    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    expect(button).toBeInTheDocument();
  });

  it("adds repository to localStorage and shows success toast on click", () => {
    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    const storedRepositories = JSON.parse(
      localStorage.getItem("starredRepositories") || "[]",
    );
    expect(storedRepositories).toHaveLength(1);
    expect(storedRepositories[0].id).toBe(repositoryData.id);
    expect(storedRepositories[0].isStarred).toBe(true);

    expect(toast.success).toHaveBeenCalledWith(
      "Repositório adicionado aos favoritos",
    );
    expect(mockLoadDataAfterUpdate).toHaveBeenCalled();
  });

  it("shows error toast if repository already exists in localStorage", () => {
    localStorage.setItem(
      "starredRepositories",
      JSON.stringify([repositoryData]),
    );

    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith(
      "Repositório já adicionado aos favoritos",
    );
    expect(mockLoadDataAfterUpdate).not.toHaveBeenCalled();
  });

  it("calls loadDataAfterUpdate after adding repository to localStorage", () => {
    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    expect(mockLoadDataAfterUpdate).toHaveBeenCalled();
  });

  it("does not add duplicate repository to localStorage", () => {
    localStorage.setItem(
      "starredRepositories",
      JSON.stringify([repositoryData]),
    );

    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    const storedRepositories = JSON.parse(
      localStorage.getItem("starredRepositories") || "[]",
    );
    expect(storedRepositories).toHaveLength(1);
    expect(storedRepositories[0].id).toBe(repositoryData.id);
  });

  it("adds repository to localStorage, shows success toast, and calls loadDataAfterUpdate when no starred repositories exist", () => {
    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    const expectedRepositories = [{ ...repositoryData, isStarred: true }];
    expect(localStorage.getItem("starredRepositories")).toBe(
      JSON.stringify(expectedRepositories),
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Repositório adicionado aos favoritos",
    );
    expect(mockLoadDataAfterUpdate).toHaveBeenCalled();
  });

  it("shows error toast if repository already exists in localStorage", () => {
    const existingRepositories = [{ ...repositoryData, isStarred: true }];
    localStorage.setItem(
      "starredRepositories",
      JSON.stringify(existingRepositories),
    );

    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    expect(toast.error).toHaveBeenCalledWith(
      "Repositório já adicionado aos favoritos",
    );
    expect(mockLoadDataAfterUpdate).not.toHaveBeenCalled();
  });

  it("adds repository to localStorage, shows success toast, and calls loadDataAfterUpdate when starred repositories exist", () => {
    const existingRepositories = [
      { id: 2, name: "Another Repository", isStarred: true },
    ];
    localStorage.setItem(
      "starredRepositories",
      JSON.stringify(existingRepositories),
    );

    render(
      <FavoriteRepositoryButton
        repositoryData={repositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    const expectedRepositories = [
      ...existingRepositories,
      { ...repositoryData, isStarred: true },
    ];
    expect(localStorage.getItem("starredRepositories")).toBe(
      JSON.stringify(expectedRepositories),
    );
    expect(toast.success).toHaveBeenCalledWith(
      "Repositório adicionado aos favoritos",
    );
    expect(mockLoadDataAfterUpdate).toHaveBeenCalled();
  });
});
