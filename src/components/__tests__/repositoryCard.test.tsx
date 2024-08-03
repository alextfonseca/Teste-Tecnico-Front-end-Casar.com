import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RepositoryCard } from "../RepositoryCard";

// Mocking dependencies
vi.mock("date-fns", () => ({
  format: vi.fn(() => "01 Jan 2023"),
}));

vi.mock("@/utils/returnHexadecimalFromLanguages", () => ({
  returnHexadecimalFromLanguages: vi.fn(() => "#000000"),
}));

vi.mock("./DisavowRepositoryButton", () => ({
  DisavowRepositoryButton: ({
    repositoryName,
    owner,
    loadDataAfterUpdate,
  }: {
    repositoryName: string;
    owner: string;
    loadDataAfterUpdate: () => void;
  }) => <button onClick={loadDataAfterUpdate}>Disavow {repositoryName}</button>,
}));

vi.mock("./FavoriteRepositoryButton", () => ({
  FavoriteRepositoryButton: ({
    repositoryName,
    owner,
    loadDataAfterUpdate,
  }: {
    repositoryName: string;
    owner: string;
    loadDataAfterUpdate: () => void;
  }) => (
    <button onClick={loadDataAfterUpdate}>Favorite {repositoryName}</button>
  ),
}));

describe("RepositoryCard", () => {
  afterEach(cleanup);

  const defaultProps = {
    title: "Test Repository",
    description: "This is a test repository",
    principalLanguage: "JavaScript",
    updatedAt: "2023-01-01T00:00:00Z",
    isFavorite: false,
    owner: "test-owner",
    loadDataAfterUpdate: vi.fn(),
  };

  it("should render the repository card with given props", () => {
    render(<RepositoryCard {...defaultProps} />);

    expect(screen.getByText("Test Repository")).toBeInTheDocument();
    expect(screen.getByText("This is a test repository")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Updated on 01 Jan 2023")).toBeInTheDocument();
  });

  it("should render the favorite button when isFavorite is false", () => {
    render(<RepositoryCard {...defaultProps} />);

    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });

  it("should render the disavow button when isFavorite is true", () => {
    render(<RepositoryCard {...defaultProps} isFavorite={true} />);

    expect(screen.getByTestId("disavow-button")).toBeInTheDocument();
  });
});
