import Image from "next/image";
import Link from "next/link";

// icons
import HearthIcon from "../../public/icons/hearth.svg";
import SearchIcon from "../../public/icons/search.svg";

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="flex items-center justify-between pl-6">
        <form className="flex w-[668px] items-center justify-between rounded border border-line px-4 py-2 transition-all hover:border-primary">
          <input
            type="text"
            placeholder="Buscar usuário"
            className="flex-1 border-none outline-none"
          />
          <button className="transition-all hover:brightness-90">
            <Image src={SearchIcon} alt={"Ícone de pesquisa"} />
          </button>
        </form>

        <Link
          href={""}
          className="flex items-center gap-2 bg-primary px-6 py-7 text-sm text-white transition-all hover:brightness-90"
        >
          <Image src={HearthIcon} alt={"Ícone de coração"} />
          Favoritos
        </Link>
      </div>
    </header>
  );
}
