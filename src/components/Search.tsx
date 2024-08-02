"use client";

import Image from "next/image";

// icons
import { useRouter } from "next/navigation";
import SearchIcon from "../../public/icons/search.svg";

export function Search() {
  const route = useRouter();

  function handleSearchUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userNameEntered = event.currentTarget.search.value;

    route.push(`/user?username=${userNameEntered}`);
  }

  return (
    <form
      className="flex w-full items-center justify-between rounded border border-line px-4 py-2 transition-all hover:border-primary lg:w-[668px]"
      onSubmit={handleSearchUser}
    >
      <input
        name="search"
        type="text"
        placeholder="Buscar usuário"
        className="flex-1 border-none text-sm text-greyDark outline-none"
      />
      <button className="transition-all hover:brightness-90">
        <Image src={SearchIcon} alt={"Ícone de pesquisa"} />
      </button>
    </form>
  );
}
