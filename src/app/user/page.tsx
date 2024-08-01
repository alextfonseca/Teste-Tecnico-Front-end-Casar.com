"use client";

import { github_api } from "@/services/axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

// components
import { RepositoryCard } from "@/components/RepositoryCard";

// layout
import { SearchLayout } from "@/layout/searchLayout";

// types
import { IRepositoryProps, IUserDataProps } from "@/@types/response";
import { NoUsersFound } from "@/components/NoUsersFound";
import { Spinner } from "@/components/Spinner";
import axios from "axios";

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
      const [userDataResponse, userRepositoriesResponse] = await Promise.all([
        github_api.get(`/users/${userName}`),
        github_api.get(`/users/${userName}/repos`),
      ]);

      setUserData(userDataResponse.data);
      setUserRepositories(userRepositoriesResponse.data);
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
        <main className="mt-6 flex items-center justify-center px-6">
          <Spinner />
        </main>
      </SearchLayout>
    );
  }

  if (userNotFound) {
    return (
      <SearchLayout>
        <main className="mt-6 flex items-center justify-center px-6">
          <NoUsersFound userName={userName} />
        </main>
      </SearchLayout>
    );
  }

  return (
    <SearchLayout>
      <main className="bg grid-cols-userPage mt-6 grid gap-12 overflow-hidden px-6">
        <div className="flex h-fit flex-col items-center rounded border border-line px-6 py-10">
          <Image
            className="rounded-full"
            src={userData.avatar_url}
            alt={`Imagem do usuário ${userData.name}`}
            width={200}
            height={200}
          />
          <h2 className="mt-6 text-xl font-semibold text-greyNeutral">
            {userData.name}
          </h2>

          <span className="text-sm text-greyDark">@{userData.login}</span>

          <p className="mt-6 text-center text-sm text-greyNeutral">
            {userData.bio}
          </p>
        </div>
        <div className="mr-auto w-full max-w-[980px] overflow-y-scroll">
          <h1 className="text-xl font-semibold text-primary">Repositórios</h1>

          <div className="mt-6 flex flex-col gap-4 pb-10">
            {userRepositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                title={repository.name}
                description={
                  repository.description || "Esse repositório não tem descrição"
                }
                principalLanguage={repository.language}
                updatedAt={repository.updated_at}
                owner={repository.owner.login}
                isFavorite={false}
              />
            ))}
          </div>
        </div>
      </main>
    </SearchLayout>
  );
}

function User() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserComponent />
    </Suspense>
  );
}

export default User;
