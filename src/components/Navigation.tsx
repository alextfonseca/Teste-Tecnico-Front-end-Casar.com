"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// icons
import Image from "next/image";
import UserFillGrayIcon from "../../public/icons/user-fill-gray.svg";
import UserFillWhiteIcon from "../../public/icons/user-fill-white.svg";

import HearthFillGrayIcon from "../../public/icons/hearth-fill-gray.svg";
import HearthFillWhiteIcon from "../../public/icons/hearth-fill-white.svg";

export function Navigation() {
  const pathName = usePathname();

  return (
    <div data-testid="navigation" className="grid grid-cols-2 items-center">
      <Link
        data-testid="user-button"
        href="/"
        className={`flex h-[70px] items-center justify-center ${pathName !== "/favorites" ? "bg-primary" : "bg-white"} transition-all hover:brightness-90`}
      >
        {pathName === "/favorites" ? (
          <Image
            src={UserFillGrayIcon}
            alt="User Icon Gray"
            width={24}
            height={20}
          />
        ) : (
          <Image
            src={UserFillWhiteIcon}
            alt="User Icon White"
            width={24}
            height={20}
          />
        )}
      </Link>

      <Link
        data-testid="favorites-button"
        href="/favorites"
        className={`flex h-[70px] items-center justify-center ${pathName === "/favorites" ? "bg-primary" : "bg-white"} transition-all hover:brightness-90`}
      >
        {pathName === "/favorites" ? (
          <Image
            src={HearthFillWhiteIcon}
            alt="User Icon"
            width={20}
            height={24}
          />
        ) : (
          <Image
            src={HearthFillGrayIcon}
            alt="User Icon"
            width={20}
            height={24}
          />
        )}
      </Link>
    </div>
  );
}
