"use client";

import { github_api } from "@/services/axios";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

// components
import { NoUsersFound } from "@/components/NoUsersFound";
import { RepositoryCard } from "@/components/RepositoryCard";
import { Spinner } from "@/components/Spinner";

// layout
import { SearchLayout } from "@/layout/searchLayout";

// types
import { IRepositoryProps, IUserDataProps } from "@/@types/response";
import { Search } from "@/components/Search";

function UserComponent() {
  const searchParams = useSearchParams();

  const userName = searchParams.get("username");

  const [userData, setUserData] = useState<IUserDataProps>(
    {} as IUserDataProps,
  );
  const [userRepositories, setUserRepositories] = useState<IRepositoryProps[]>(
    [],
  );

  const [requestIsLoading, setRequestIsLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  async function getUserData() {
    setRequestIsLoading(true);
    setUserNotFound(false);

    try {
      const [
        userDataResponse,
        userRepositoriesResponse,
        starredRepositoriesResponse,
      ] = await Promise.all([
        github_api.get(`/users/${userName}`),
        github_api.get(
          `/users/${userName}/repos?timestamp=${new Date().getTime()}`,
        ),
        github_api.get(`/user/starred?timestamp=${new Date().getTime()}`),
      ]);

      setUserData(userDataResponse.data);

      const starredRepositories = starredRepositoriesResponse.data;

      const repositoriesWithStarInfo = userRepositoriesResponse.data.map(
        (repo: IRepositoryProps) => {
          const isStarred = starredRepositories.some(
            (starredRepo: IRepositoryProps) => starredRepo.id === repo.id,
          );
          return {
            ...repo,
            isStarred,
          };
        },
      );

      setUserRepositories(repositoriesWithStarInfo);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 404) {
          setUserNotFound(true);
          setRequestIsLoading(false);
          return;
        }
      }

      toast.error("Erro ao buscar dados do usuário");
    }
    setRequestIsLoading(false);
  }

  useEffect(() => {
    if (userName) {
      getUserData();
    }

    if (!userName) {
      setUserNotFound(true);
    }
  }, [userName]);

  if (requestIsLoading) {
    return (
      <SearchLayout>
        <main className="mt-6 flex items-center justify-center px-5">
          <Spinner />
        </main>
      </SearchLayout>
    );
  }

  if (userNotFound) {
    return (
      <SearchLayout>
        <main className="mt-6 flex flex-col items-center justify-center gap-8 px-5 lg:gap-0">
          <div className="w-full lg:hidden">
            <Search />
          </div>
          <NoUsersFound userName={userName} />
        </main>
      </SearchLayout>
    );
  }

  return (
    <SearchLayout>
      <div className="mt-8 overflow-hidden px-5 lg:mt-0 lg:px-0">
        <div className="w-full lg:hidden">
          <Search />
        </div>

        <main className="bg mt-6 flex h-full flex-col gap-4 overflow-y-scroll pb-10 lg:grid lg:grid-cols-userPage lg:gap-12 lg:px-5 lg:pb-0">
          <div className="flex h-fit flex-col rounded-lg border border-line p-4 lg:items-center lg:rounded lg:px-6 lg:py-10">
            <div className="flex items-center gap-2 border-b border-line pb-2 lg:flex-col lg:gap-6 lg:border-none lg:pb-0">
              {userData.avatar_url && (
                <Image
                  className="size-12 rounded-full lg:size-[200px]"
                  src={userData.avatar_url}
                  alt={`Imagem do usuário ${userData.name}`}
                  width={200}
                  height={200}
                />
              )}

              <div className="flex flex-col lg:items-center">
                <h2
                  className="text-xl font-semibold text-greyNeutral lg:mt-6"
                  data-testid="user-name"
                >
                  {userData.name}
                </h2>

                <span
                  className="text-sm text-greyDark"
                  data-testid="user-login"
                >
                  @{userData.login}
                </span>
              </div>
            </div>

            <p
              className="mt-2 text-sm text-greyDark lg:mt-6 lg:text-center lg:text-greyNeutral"
              data-testid="user-bio"
            >
              {userData.bio}
            </p>
          </div>

          <div className="mr-auto w-full max-w-[980px]">
            <h1 className="text-xl font-semibold text-primary">Repositórios</h1>

            <div className="mt-6 flex flex-col gap-4 pb-10">
              {userRepositories.map((repository) => (
                <RepositoryCard
                  key={repository.id}
                  title={repository.name}
                  description={
                    repository.description ||
                    "Esse repositório não tem descrição"
                  }
                  principalLanguage={repository.language}
                  updatedAt={repository.updated_at}
                  owner={repository.owner.login}
                  isFavorite={repository.isStarred}
                  loadDataAfterUpdate={getUserData}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </SearchLayout>
  );
}

function User() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <UserComponent />
    </Suspense>
  );
}

export default User;
