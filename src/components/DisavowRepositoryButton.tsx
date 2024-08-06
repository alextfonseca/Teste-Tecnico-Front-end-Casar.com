"use client";

import Image from "next/image";

// icons
import { IRepositoryProps } from "@/@types/response";
import { toast } from "react-toastify";
import HearthFillIcon from "../../public/icons/hearth-fill.svg";

interface IDisavowRepositoryButtonProps {
  repositoryData: IRepositoryProps;
  loadDataAfterUpdate: () => void;
}

export function DisavowRepositoryButton({
  repositoryData,
  loadDataAfterUpdate,
}: IDisavowRepositoryButtonProps) {
  async function handleRemoveRepositoryToLocalStorage() {
    const starredRepositories = localStorage.getItem("starredRepositories");

    if (!starredRepositories) {
      loadDataAfterUpdate();
      return;
    }

    const repositories = JSON.parse(starredRepositories);

    const newRepositories = repositories.filter(
      (repository: IRepositoryProps) => repository.id !== repositoryData.id,
    );

    localStorage.setItem(
      "starredRepositories",
      JSON.stringify(newRepositories),
    );

    toast.success("Repositório removido dos favoritos");

    loadDataAfterUpdate();
  }

  return (
    <button
      data-testid="disavow-button"
      className="flex size-10 items-center justify-center rounded-full border border-primary transition-all hover:brightness-90"
      type={"button"}
      onClick={handleRemoveRepositoryToLocalStorage}
    >
      <Image
        src={HearthFillIcon}
        alt={"Ícone de um coração preenchido na cor ver de água"}
        width={18}
        height={16}
      />
    </button>
  );
}
