"use client";

import Image from "next/image";

// icons
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchIcon from "../../public/icons/search.svg";

export function Search() {
  const route = useRouter();

  const [userSearchName, setUserSearchName] = useState("");

  function handleSearchUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    route.push(`/user?username=${userSearchName}`);
  }

  return (
    <form
      data-testid="search-form"
      className="flex w-full items-center justify-between rounded border border-line px-4 py-2 transition-all hover:border-primary lg:w-[668px]"
      onSubmit={handleSearchUser}
    >
      <input
        data-testid="search-input"
        name="search"
        type="text"
        placeholder="Buscar usuário"
        className="flex-1 border-none text-sm text-greyDark outline-none"
        onChange={(event) => setUserSearchName(event.target.value)}
      />
      <button
        data-testid="search-button"
        className="transition-all hover:brightness-90"
      >
        <Image
          src={SearchIcon}
          alt={"Ícone de pesquisa"}
          width={24}
          height={24}
        />
      </button>
    </form>
  );
}
