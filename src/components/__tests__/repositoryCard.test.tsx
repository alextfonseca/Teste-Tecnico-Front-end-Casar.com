import { IRepositoryProps } from "@/@types/response";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RepositoryCard } from "../RepositoryCard";

vi.mock("../DisavowRepositoryButton", () => ({
  DisavowRepositoryButton: ({
    repositoryData,
    loadDataAfterUpdate,
  }: {
    repositoryData: IRepositoryProps;
    loadDataAfterUpdate: () => void;
  }) => <button data-testid="disavow-button">Disavow</button>,
}));

vi.mock("../FavoriteRepositoryButton", () => ({
  FavoriteRepositoryButton: ({
    repositoryData,
    loadDataAfterUpdate,
  }: {
    repositoryData: IRepositoryProps;
    loadDataAfterUpdate: () => void;
  }) => <button data-testid="favorite-button">Favorite</button>,
}));

vi.mock("date-fns", () => ({
  format: vi.fn(() => "01 Jan 2023"),
}));

describe("RepositoryCard Component", () => {
  afterEach(cleanup);

  const mockRepositoryData: IRepositoryProps = {
    id: 1,
    name: "Test Repository",
    description: "This is a test repository",
    language: "JavaScript",
    updated_at: "2023-01-01T00:00:00Z",
    isStarred: false,
    owner: { login: "test-owner" },
  };

  const mockLoadDataAfterUpdate = vi.fn();

  it("renders repository details correctly", () => {
    render(
      <RepositoryCard
        repositoryData={mockRepositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    expect(screen.getByTestId("repository-title")).toHaveTextContent(
      "Test Repository",
    );
    expect(screen.getByTestId("repository-description")).toHaveTextContent(
      "This is a test repository",
    );
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Updated on 01 Jan 2023")).toBeInTheDocument();
  });

  it("renders FavoriteRepositoryButton when isStarred is false", () => {
    render(
      <RepositoryCard
        repositoryData={{ ...mockRepositoryData, isStarred: false }}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
    expect(screen.queryByTestId("disavow-button")).not.toBeInTheDocument();
  });

  it("renders DisavowRepositoryButton when isStarred is true", () => {
    render(
      <RepositoryCard
        repositoryData={{ ...mockRepositoryData, isStarred: true }}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    expect(screen.getByTestId("disavow-button")).toBeInTheDocument();
    expect(screen.queryByTestId("favorite-button")).not.toBeInTheDocument();
  });

  it('render "Não informado" when language is not provided', () => {
    render(
      <RepositoryCard
        repositoryData={{ ...mockRepositoryData, language: "" }}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    expect(screen.getByText("Não informado")).toBeInTheDocument();
  });
});
