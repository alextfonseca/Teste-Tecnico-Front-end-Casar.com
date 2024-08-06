"use client";

import { github_api } from "@/services/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// components
import { RepositoryCard } from "@/components/RepositoryCard";
import { Spinner } from "@/components/Spinner";

// layout
import { SearchLayout } from "@/layout/searchLayout";

// types
import { IRepositoryProps } from "@/@types/response";

function Favorites() {
  const [starredRepositories, setStarredRepositories] = useState<
    IRepositoryProps[]
  >([]);

  const [requestIsLoading, setRequestIsLoading] = useState(false);

  async function getStarredGithubRepository() {
    setRequestIsLoading(true);

    try {
      const { data } = await github_api.get(
        `/user/starred?timestamp=${new Date().getTime()}`,
      );

      setStarredRepositories(data);
    } catch (error) {
      toast.error("Erro ao buscar repositórios favoritos");
    }
    setRequestIsLoading(false);
  }

  useEffect(() => {
    getStarredGithubRepository();
  }, []);

  if (requestIsLoading) {
    return (
      <SearchLayout>
        <main className="bg mt-6 overflow-y-scroll px-5">
          <h1 className="text-xl font-semibold text-greyNeutral lg:text-center lg:text-primary">
            Meus favoritos
          </h1>

          <div className="mx-auto mt-6 flex max-w-[980px] flex-col items-center gap-4 pb-10">
            <Spinner />
          </div>
        </main>
      </SearchLayout>
    );
  }

  return (
    <SearchLayout>
      <main className="bg mt-6 overflow-y-scroll px-5">
        <h1 className="text-xl font-semibold text-greyNeutral lg:text-center lg:text-primary">
          Meus favoritos
        </h1>

        <div className="mx-auto mt-6 flex max-w-[980px] flex-col gap-4 pb-10">
          {starredRepositories.map((repository) => (
            <RepositoryCard
              key={repository.id}
              title={repository.name}
              description={
                repository.description || "Esse repositório não tem descrição"
              }
              principalLanguage={repository.language}
              updatedAt={repository.updated_at}
              isFavorite={true}
              owner={repository.owner.login}
              loadDataAfterUpdate={getStarredGithubRepository}
            />
          ))}
        </div>
      </main>
    </SearchLayout>
  );
}

export default Favorites;
