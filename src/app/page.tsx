import Image from "next/image";

// layout
import { SearchLayout } from "@/layout/searchLayout";

// images
import { Search } from "@/components/Search";
import SearchUserImage from "../../public/images/search-user.svg";

export default function Home() {
  return (
    <SearchLayout>
      <main className="mt-8 flex h-full px-5 md:mt-0 md:items-center md:justify-center">
        <div className="flex flex-col md:items-center">
          <h1 className="text-xl font-semibold text-greyNeutral">
            Procure pelo Nome ou Nome de Usuário
          </h1>
          <p className="text-greyNeutral">
            Encontre os repositórios de algum usuário digitando no campo acima
          </p>

          <div className="mt-6 w-full lg:hidden">
            <Search />
          </div>

          <Image
            className="mt-12 hidden lg:block"
            src={SearchUserImage}
            alt={
              "Ilustração de uma mulher procurando usuários com uma lupa por uma lista"
            }
          />
        </div>
      </main>
    </SearchLayout>
  );
}
