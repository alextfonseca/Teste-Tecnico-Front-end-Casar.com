import Image from "next/image";
import Link from "next/link";

// icons
import HearthIcon from "../../public/icons/hearth.svg";
import { Search } from "./Search";

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="flex items-center justify-between pl-6">
        <Search />

        <Link
          href={"/favorites"}
          className="flex items-center gap-2 bg-primary px-6 py-7 text-sm text-white transition-all hover:brightness-90"
        >
          <Image
            src={HearthIcon}
            alt={"Ícone de coração"}
            width={24}
            height={20}
          />
          Favoritos
        </Link>
      </div>
    </header>
  );
}
