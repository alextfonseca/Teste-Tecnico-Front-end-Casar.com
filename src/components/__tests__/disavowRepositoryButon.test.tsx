import { IRepositoryProps } from "@/@types/response";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DisavowRepositoryButton } from "../DisavowRepositoryButton";

// Mock dependencies
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => <img src={src} alt={alt} width={width} height={height} />,
}));

describe("DisavowRepositoryButton Component", () => {
  afterEach(cleanup);

  const mockRepositoryData: IRepositoryProps = {
    id: 1,
    name: "Test Repository",
    description: "This is a test repository",
    language: "JavaScript",
    updated_at: "2023-01-01T00:00:00Z",
    isStarred: true,
    owner: {
      login: "test-owner",
    },
  };

  const mockLoadDataAfterUpdate = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <DisavowRepositoryButton
        repositoryData={mockRepositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    expect(screen.getByTestId("disavow-button")).toBeInTheDocument();
  });

  it("handles removal when there are no starred repositories", () => {
    render(
      <DisavowRepositoryButton
        repositoryData={mockRepositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    fireEvent.click(screen.getByTestId("disavow-button"));

    expect(mockLoadDataAfterUpdate).toHaveBeenCalled();
    expect(localStorage.getItem("starredRepositories")).toBeNull();
  });

  it("handles removal when there are starred repositories", () => {
    localStorage.setItem(
      "starredRepositories",
      JSON.stringify([mockRepositoryData]),
    );

    render(
      <DisavowRepositoryButton
        repositoryData={mockRepositoryData}
        loadDataAfterUpdate={mockLoadDataAfterUpdate}
      />,
    );

    fireEvent.click(screen.getByTestId("disavow-button"));

    expect(mockLoadDataAfterUpdate).toHaveBeenCalled();
    expect(localStorage.getItem("starredRepositories")).toEqual("[]");
    expect(toast.success).toHaveBeenCalledWith(
      "Repositório removido dos favoritos",
    );
  });
});
