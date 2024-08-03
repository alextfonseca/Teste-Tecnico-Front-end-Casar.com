"use client";

import { github_api } from "@/services/axios";
import Image from "next/image";
import { toast } from "react-toastify";

// icons
import HearthGrayIcon from "../../public/icons/hearth-gray.svg";

interface IFavoriteRepositoryButtonProps {
  owner: string;
  repositoryName: string;
  loadDataAfterUpdate?: () => void;
}

export function FavoriteRepositoryButton({
  owner,
  repositoryName,
  loadDataAfterUpdate,
}: IFavoriteRepositoryButtonProps) {
  async function handleFavoriteRepository() {
    try {
      await github_api.put(`/user/starred/${owner}/${repositoryName}`);

      loadDataAfterUpdate && loadDataAfterUpdate();
      toast.success("Repositório favoritado com sucesso");
    } catch (error) {
      toast.error("Erro ao favoritar repositório");
    }
  }

  return (
    <button
      data-testid="favorite-button"
      className="flex size-10 items-center justify-center rounded-full bg-whiteBackgroundMatte transition-all hover:brightness-90"
      type={"button"}
      onClick={handleFavoriteRepository}
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
