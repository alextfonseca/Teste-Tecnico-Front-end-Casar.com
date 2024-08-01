import { RepositoryCard } from "@/components/RepositoryCard";
import { SearchLayout } from "@/layout/searchLayout";
import Image from "next/image";

function User() {
  return (
    <SearchLayout>
      <main className="bg grid-cols-userPage mt-6 grid gap-12 overflow-hidden px-6">
        <div className="flex h-fit flex-col items-center rounded border border-line px-6 py-10">
          <Image
            className="rounded-full"
            src={"https://github.com/alextfonseca.png"}
            alt={"Imagem do usuário"}
            width={200}
            height={200}
          />
          <h2 className="mt-6 text-xl font-semibold text-greyNeutral">
            Alex Teixeira da Fonseca
          </h2>

          <span className="text-sm text-greyDark">@alextfonseca</span>

          <p className="mt-6 text-center text-sm text-greyNeutral">
            Técnologo em Sistemas para Internet | Desenvolvedor full stack |
            React | Next.js | Typescript | Node.js | Nest.js
          </p>
        </div>
        <div className="mr-auto w-full max-w-[980px] overflow-y-scroll">
          <h1 className="text-xl font-semibold text-primary">Repositórios</h1>

          <div className="mt-6 flex flex-col gap-4 pb-10">
            <RepositoryCard
              title={"Pokepicker"}
              description={
                "Aplicativo de visualização de Pokémon utilizando o PokeAPI.co - Construído em React Native (Expo)"
              }
              principalLanguage={"Typescript"}
              updatedAt={"17 Apr 2021"}
              isFavorite={true}
            />

            <RepositoryCard
              title={"Pokepicker"}
              description={
                "Aplicativo de visualização de Pokémon utilizando o PokeAPI.co - Construído em React Native (Expo)"
              }
              principalLanguage={"Typescript"}
              updatedAt={"17 Apr 2021"}
              isFavorite={true}
            />

            <RepositoryCard
              title={"Pokepicker"}
              description={
                "Aplicativo de visualização de Pokémon utilizando o PokeAPI.co - Construído em React Native (Expo)"
              }
              principalLanguage={"Typescript"}
              updatedAt={"17 Apr 2021"}
              isFavorite={true}
            />

            <RepositoryCard
              title={"Pokepicker"}
              description={
                "Aplicativo de visualização de Pokémon utilizando o PokeAPI.co - Construído em React Native (Expo)"
              }
              principalLanguage={"Typescript"}
              updatedAt={"17 Apr 2021"}
              isFavorite={true}
            />

            <RepositoryCard
              title={"Pokepicker"}
              description={
                "Aplicativo de visualização de Pokémon utilizando o PokeAPI.co - Construído em React Native (Expo)"
              }
              principalLanguage={"Typescript"}
              updatedAt={"17 Apr 2021"}
              isFavorite={true}
            />

            <RepositoryCard
              title={"Pokepicker"}
              description={
                "Aplicativo de visualização de Pokémon utilizando o PokeAPI.co - Construído em React Native (Expo)"
              }
              principalLanguage={"Typescript"}
              updatedAt={"17 Apr 2021"}
              isFavorite={true}
            />
          </div>
        </div>
      </main>
    </SearchLayout>
  );
}

export default User;
