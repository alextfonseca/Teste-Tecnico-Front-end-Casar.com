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
    <div className="grid grid-cols-2 items-center">
      <Link
        href="/"
        className={`flex h-[70px] items-center justify-center ${pathName !== "/favorites" ? "bg-primary" : "bg-white"} transition-all hover:brightness-90`}
      >
        {pathName === "/favorites" ? (
          <Image src={UserFillGrayIcon} alt="User Icon" />
        ) : (
          <Image src={UserFillWhiteIcon} alt="User Icon" />
        )}
      </Link>

      <Link
        href="/favorites"
        className={`flex h-[70px] items-center justify-center ${pathName === "/favorites" ? "bg-primary" : "bg-white"} transition-all hover:brightness-90`}
      >
        {pathName === "/favorites" ? (
          <Image src={HearthFillWhiteIcon} alt="User Icon" />
        ) : (
          <Image src={HearthFillGrayIcon} alt="User Icon" />
        )}
      </Link>
    </div>
  );
}
