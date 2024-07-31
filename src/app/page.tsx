import Image from "next/image";

// layout
import { SearchLayout } from "@/layout/searchLayout";

// images
import SearchUserImage from "../../public/images/search-user.svg";

export default function Home() {
  return (
    <SearchLayout>
      <main className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold text-greyNeutral">
            Procure pelo Nome ou Nome de Usuário
          </h1>
          <p className="text-greyNeutral">
            Encontre os repositórios de algum usuário digitando no campo acima
          </p>

          <Image
            className="mt-12"
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
