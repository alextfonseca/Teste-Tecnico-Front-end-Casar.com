"use client";

import Image from "next/image";
import { toast } from "react-toastify";

// icons
import { IRepositoryProps } from "@/@types/response";
import HearthGrayIcon from "../../public/icons/hearth-gray.svg";

interface IFavoriteRepositoryButtonProps {
  repositoryData: IRepositoryProps;
  loadDataAfterUpdate: () => void;
}

export function FavoriteRepositoryButton({
  repositoryData,
  loadDataAfterUpdate,
}: IFavoriteRepositoryButtonProps) {
  async function handleFavoriteRepositoryToLocalStorage() {
    const repositoryDataWithIsStarred = {
      ...repositoryData,
      isStarred: true,
    };

    const starredRepositories = localStorage.getItem("starredRepositories");

    if (!starredRepositories) {
      localStorage.setItem(
        "starredRepositories",
        JSON.stringify([repositoryDataWithIsStarred]),
      );
      toast.success("Repositório adicionado aos favoritos");
      loadDataAfterUpdate();
      return;
    }

    const repositories = JSON.parse(starredRepositories);

    const repositoryAlreadyExists = repositories.some(
      (repository: IRepositoryProps) => repository.id === repositoryData.id,
    );

    if (repositoryAlreadyExists) {
      toast.error("Repositório já adicionado aos favoritos");
      return;
    }

    const newRepositories = [...repositories, repositoryDataWithIsStarred];

    localStorage.setItem(
      "starredRepositories",
      JSON.stringify(newRepositories),
    );

    toast.success("Repositório adicionado aos favoritos");

    loadDataAfterUpdate();
  }

  return (
    <button
      data-testid="favorite-button"
      className="flex size-10 items-center justify-center rounded-full bg-whiteBackgroundMatte transition-all hover:brightness-90"
      type={"button"}
      onClick={handleFavoriteRepositoryToLocalStorage}
    >
      <Image
        src={HearthGrayIcon}
        alt={"Ícone de um coração na cor cinza"}
        width={18}
        height={16}
      />
    </button>
  );
}
