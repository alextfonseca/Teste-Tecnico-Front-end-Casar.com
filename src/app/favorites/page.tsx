"use client";

import { useEffect, useState } from "react";

// components
import { RepositoryCard } from "@/components/RepositoryCard";

// layout
import { SearchLayout } from "@/layout/searchLayout";

// types
import { IRepositoryProps } from "@/@types/response";

function Favorites() {
  const [starredRepositories, setStarredRepositories] = useState<
    IRepositoryProps[]
  >([]);

  async function getStarredGithubRepositoryOnLocalStorage() {
    const starredRepositories = localStorage.getItem("starredRepositories");

    if (!starredRepositories) {
      return;
    }

    const repositories = JSON.parse(starredRepositories);

    setStarredRepositories(repositories);
  }

  useEffect(() => {
    getStarredGithubRepositoryOnLocalStorage();
  }, []);

  if (starredRepositories.length === 0) {
    return (
      <SearchLayout>
        <main className="bg mt-6 overflow-y-scroll px-5">
          <h1 className="text-xl font-semibold text-greyNeutral lg:text-center lg:text-primary">
            Meus favoritos
          </h1>

          <div className="mx-auto mt-6 flex max-w-[980px] flex-col items-center gap-4 pb-10">
            <h1 className="text-lg text-greyNeutral lg:text-center">
              Você ainda não tem repositórios favoritos
            </h1>
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
              repositoryData={repository}
              loadDataAfterUpdate={getStarredGithubRepositoryOnLocalStorage}
            />
          ))}
        </div>
      </main>
    </SearchLayout>
  );
}

export default Favorites;
