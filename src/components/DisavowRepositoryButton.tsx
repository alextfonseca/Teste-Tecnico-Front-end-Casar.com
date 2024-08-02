"use client";

import { github_api } from "@/services/axios";
import Image from "next/image";
import { toast } from "react-toastify";

// icons
import HearthFillIcon from "../../public/icons/hearth-fill.svg";

interface IDisavowRepositoryButtonProps {
  owner: string;
  repositoryName: string;
  loadDataAfterUpdate: () => void;
}

export function DisavowRepositoryButton({
  owner,
  repositoryName,
  loadDataAfterUpdate,
}: IDisavowRepositoryButtonProps) {
  async function handleDisavowRepository() {
    try {
      await github_api.delete(`/user/starred/${owner}/${repositoryName}`);

      toast.success("Repositório desfavoritado com sucesso");
      loadDataAfterUpdate();
    } catch (error) {
      toast.error("Erro ao desfavoritar repositório");
    }
  }

  return (
    <button
      className="flex size-10 items-center justify-center rounded-full border border-primary transition-all hover:brightness-90"
      type={"button"}
      onClick={handleDisavowRepository}
    >
      <Image
        src={HearthFillIcon}
        alt={"Ícone de um coração preenchido na cor ver de água"}
      />
    </button>
  );
}
