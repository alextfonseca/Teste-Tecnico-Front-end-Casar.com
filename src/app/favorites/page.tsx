import { RepositoryCard } from "@/components/RepositoryCard";
import { SearchLayout } from "@/layout/searchLayout";

function Favorites() {
  return (
    <SearchLayout>
      <main className="bg mt-6">
        <h1 className="text-center text-xl font-semibold text-primary">
          Meus favoritos
        </h1>

        <div className="mx-auto mt-6 flex max-w-[980px] flex-col gap-4">
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
      </main>
    </SearchLayout>
  );
}

export default Favorites;
